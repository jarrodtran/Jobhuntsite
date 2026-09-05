/**
 * Render-ready views over `src/content.ts`.
 *
 * Components import from here, never from `@/content` directly. Every view is
 * already filtered (blank optional fields dropped), ordered (primary role
 * first), and resolved (public paths → basePath URLs). Components stay dumb:
 * map, render, done.
 *
 * Module load also validates the content. A bad `experienceIds` reference or a
 * missing primary role throws here, which fails `next build` during static
 * generation instead of shipping a broken page.
 */

import { existsSync } from "node:fs";
import path from "node:path";

import {
  TODO_COPY,
  contact,
  experience,
  hero,
  proofBand,
  roles,
  sections,
  site,
  siteIndexable,
  ui,
} from "@/content";
import type {
  ExperienceEntry,
  ProofChip,
  Role,
  SectionMeta,
} from "@/lib/schema";
import { hasText, joinMeta, visible } from "@/lib/text";
import { absoluteAsset, asset, mailto, siteUrl } from "@/lib/url";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function fail(message: string): never {
  throw new Error(`[content] ${message}`);
}

function validateContent(): void {
  if (!hasText(hero.name)) fail("hero.name is required.");
  if (!hasText(hero.seat)) fail("hero.seat is required.");
  if (!hasText(contact.email)) fail("contact.email is required.");
  if (!hasText(contact.linkedin)) fail("contact.linkedin is required.");
  if (!hasText(contact.resumePdf)) fail("contact.resumePdf is required.");

  const primaries = roles.filter((role) => role.primary && !role.hidden);
  if (primaries.length !== 1) {
    fail(
      `Exactly one non-hidden role must have primary: true (found ${primaries.length}).`,
    );
  }

  const roleIds = new Set<string>();
  for (const role of roles) {
    if (roleIds.has(role.id)) fail(`Duplicate role id "${role.id}".`);
    roleIds.add(role.id);
  }

  const experienceIds = new Set<string>();
  for (const entry of experience) {
    if (!hasText(entry.id)) {
      fail(`Experience entry "${entry.company}" needs an id.`);
    }
    if (experienceIds.has(entry.id)) {
      fail(`Duplicate experience id "${entry.id}".`);
    }
    experienceIds.add(entry.id);
  }

  for (const role of roles) {
    for (const id of role.experienceIds ?? []) {
      if (!experienceIds.has(id)) {
        fail(`Role "${role.id}" references unknown experience id "${id}".`);
      }
    }
  }

  // Ship hygiene: resume + OG files must exist in /public at build time.
  const publicRoot = path.join(process.cwd(), "public");
  for (const rel of [contact.resumePdf, site.ogImage.path]) {
    const normalized = rel.startsWith("/") ? rel.slice(1) : rel;
    if (!existsSync(path.join(publicRoot, normalized))) {
      fail(`Missing public asset: ${rel}`);
    }
  }
}

validateContent();

// ---------------------------------------------------------------------------
// Shared shapes
// ---------------------------------------------------------------------------

export type CtaKind = "resume" | "linkedin" | "email";

export type Cta = {
  kind: CtaKind;
  label: string;
  href: string;
  /** Opens off-site; components add rel="noopener noreferrer". */
  external: boolean;
  /**
   * When true, the browser saves the file. Resume prefers open-in-tab for
   * recruiter preview, so this stays false.
   */
  download: boolean;
};

export type Anchor = {
  href: `#${string}`;
  label: string;
};

const resumeCta: Cta = {
  kind: "resume",
  label: ui.cta.resume,
  href: asset(contact.resumePdf),
  external: false,
  download: false,
};

const linkedinCta: Cta = {
  kind: "linkedin",
  label: ui.cta.linkedin,
  href: contact.linkedin,
  external: true,
  download: false,
};

/** Email address as its own label so the footer reads as a real address line. */
const emailCta: Cta = {
  kind: "email",
  label: contact.email,
  href: mailto(contact.email),
  external: false,
  download: false,
};

// ---------------------------------------------------------------------------
// Sections + navigation
// ---------------------------------------------------------------------------

/**
 * Scan-path order (FE Designer IA, CoS reposition): Hero → Fit → Experience →
 * Footer. Drives both render order in page.tsx and the header nav.
 */
export const sectionOrder: SectionMeta[] = [
  sections.hero,
  sections.roles,
  sections.experience,
  sections.contact,
];

export const navView = {
  wordmark: hero.name,
  homeHref: "#top" as const,
  links: sectionOrder
    .filter((section) => hasText(section.navLabel))
    .map<Anchor>((section) => ({
      href: `#${section.id}`,
      label: section.navLabel as string,
    })),
};

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

/** Drop chips with no label and blank metrics so a chip never renders empty. */
function visibleChips(chips: ReadonlyArray<ProofChip>): ProofChip[] {
  return chips
    .filter((chip) => hasText(chip.label))
    .map<ProofChip>((chip) => ({
      label: chip.label,
      ...(hasText(chip.metric) ? { metric: chip.metric } : {}),
    }));
}

export const heroView = {
  section: sections.hero,
  name: hero.name,
  /** Market seat (not the current employer job title). */
  seat: hero.seat,
  /** @deprecated Alias kept so older JSX using `title` still typechecks during the rename. */
  title: hero.seat,
  edge: hasText(hero.edge) ? hero.edge : null,
  voiceLine: hasText(hero.voiceLine) ? hero.voiceLine : null,
  proofChips: visibleChips(hero.proofChips),
  proofChipsLabel: ui.hero.proofChipsLabel,
  employers: visible(hero.employers),
  employersLabel: ui.hero.employersLabel,
  /** Primary first (solid), then secondary (ghost). */
  primaryCta: resumeCta,
  secondaryCta: linkedinCta,
};

// ---------------------------------------------------------------------------
// Proof band — secondary metrics strip between hero and Experience
// ---------------------------------------------------------------------------

export const proofBandView = {
  label: ui.proofBand.label,
  chips: visibleChips(proofBand),
};

// ---------------------------------------------------------------------------
// Roles ("Where I fit") — primary with proof; secondaries muted
// ---------------------------------------------------------------------------

export type RoleChip = {
  id: Role["id"];
  label: string;
  primary: boolean;
  summary: string | null;
  evidence: string | null;
  /** Anchor of the first backing experience entry, or null when none is listed. */
  href: Anchor["href"] | null;
};

const visibleRoles = roles.filter((role) => !role.hidden);
const primaryRole = visibleRoles.find((role) => role.primary) ?? visibleRoles[0];

function toRoleChip(role: Role): RoleChip {
  const target = visible(role.experienceIds ?? [])[0];
  const evidenceLine =
    visible(role.evidence).find((line) => !line.includes(TODO_COPY)) ?? null;
  return {
    id: role.id,
    label: role.label,
    primary: role.primary,
    summary: hasText(role.summary) ? role.summary : null,
    evidence: evidenceLine,
    href: target ? `#${target}` : null,
  };
}

export const rolesView = {
  section: sections.roles,
  primary: primaryRole ? toRoleChip(primaryRole) : null,
  also: visibleRoles
    .filter((role) => role.id !== primaryRole?.id)
    .filter((role) => hasText(role.label))
    .map(toRoleChip),
  /** Flat list kept for simple consumers; primary first. */
  chips: primaryRole
    ? [
        toRoleChip(primaryRole),
        ...visibleRoles
          .filter((role) => role.id !== primaryRole.id)
          .filter((role) => hasText(role.label))
          .map(toRoleChip),
      ]
    : [],
  primaryBadge: ui.roles.primaryBadge,
  alsoLabel: ui.roles.alsoLabel,
};

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

/** A date as Copy wrote it, plus a machine-readable form for <time> when derivable. */
export type DateLabel = {
  label: string;
  /** ISO-ish (YYYY, YYYY-MM, YYYY-MM-DD) or null for words like "Present". */
  dateTime: string | null;
};

const ISO_DATE = /^\d{4}(-\d{2}(-\d{2})?)?$/;

function toDateLabel(value: string): DateLabel | null {
  if (!hasText(value)) return null;
  const trimmed = value.trim();
  return { label: trimmed, dateTime: ISO_DATE.test(trimmed) ? trimmed : null };
}

function dateRange(entry: ExperienceEntry): string {
  return joinMeta([entry.start, entry.end], ui.experience.dateRangeSeparator);
}

/** "Current" = the end date is a word (e.g. "Present"), not a date. */
function isCurrent(entry: ExperienceEntry): boolean {
  return hasText(entry.end) && !ISO_DATE.test(entry.end.trim());
}

/** Drop TODO_COPY lines from recruiter-facing bullet previews. */
function visibleBullets(bullets: ReadonlyArray<string>): string[] {
  return visible(bullets).filter((bullet) => !bullet.includes(TODO_COPY));
}

export type ExperienceRow = {
  id: string;
  company: string;
  title: string;
  start: DateLabel | null;
  end: DateLabel | null;
  /** Plain-text range for aria labels, e.g. "2018–2021". */
  dateRange: string;
  location: string | null;
  scopeLine: string | null;
  bullets: string[];
  /** First outcome bullet shown on closed rows so impact scans without a click. */
  previewBullet: string | null;
  /** Pedigree-only row; not expandable. */
  compact: boolean;
  /** Expanded on first paint. Exactly one non-compact row (current role, else first). */
  defaultOpen: boolean;
};

const expandable = experience.filter((entry) => !entry.compact);
const defaultOpenId: string | null =
  expandable.find(isCurrent)?.id ?? expandable[0]?.id ?? null;

export const experienceView = {
  section: sections.experience,
  dateRangeSeparator: ui.experience.dateRangeSeparator,
  rows: experience.map<ExperienceRow>((entry) => {
    const bullets = visibleBullets(entry.bullets);
    return {
      id: entry.id,
      company: entry.company,
      title: entry.title,
      start: toDateLabel(entry.start),
      end: toDateLabel(entry.end),
      dateRange: dateRange(entry),
      location: hasText(entry.location) ? entry.location : null,
      scopeLine: hasText(entry.scopeLine) ? entry.scopeLine : null,
      bullets,
      previewBullet: bullets[0] ?? null,
      compact: Boolean(entry.compact),
      defaultOpen: !entry.compact && entry.id === defaultOpenId,
    };
  }),
};

// ---------------------------------------------------------------------------
// Footer — email + LinkedIn only
// ---------------------------------------------------------------------------

export const footerView = {
  section: sections.contact,
  links: [emailCta, linkedinCta] satisfies Cta[],
};

// ---------------------------------------------------------------------------
// SEO / metadata
// ---------------------------------------------------------------------------

export const contentHasPlaceholders: boolean = JSON.stringify({
  hero,
  proofBand,
  roles,
  experience,
  contact,
  ui,
}).includes(TODO_COPY);

const seoTitle = `${hero.name} — ${hero.seat}`;

export const seoView = {
  lang: site.lang,
  siteUrl,
  title: seoTitle,
  description: hero.voiceLine,
  siteName: hero.name,
  /** Indexable only when the ship gate is open AND no TODO_COPY remains. */
  indexable: siteIndexable && !contentHasPlaceholders,
  ogImage: {
    url: absoluteAsset(site.ogImage.path),
    width: site.ogImage.width,
    height: site.ogImage.height,
    alt: seoTitle,
  },
  icons: {
    ico: absoluteAsset("/favicon.ico"),
    svg: absoluteAsset("/favicon.svg"),
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: hero.name,
    jobTitle: hero.seat,
    email: mailto(contact.email),
    url: siteUrl.href,
    sameAs: visible([contact.linkedin, contact.github]),
  },
  skipToContent: ui.skipToContent,
};
