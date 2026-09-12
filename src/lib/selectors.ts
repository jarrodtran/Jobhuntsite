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
  if (!hasText(hero.title)) fail("hero.title is required.");
  if (!hasText(contact.email)) fail("contact.email is required.");
  if (!hasText(contact.linkedin)) fail("contact.linkedin is required.");
  if (!hasText(contact.resumePdf)) fail("contact.resumePdf is required.");

  const primaries = roles.filter((role) => role.primary);
  if (primaries.length !== 1) {
    fail(
      `Exactly one role must have primary: true (found ${primaries.length}).`,
    );
  }

  const roleIds = new Set<string>();
  for (const role of roles) {
    if (roleIds.has(role.id)) fail(`Duplicate role id "${role.id}".`);
    roleIds.add(role.id);
  }

  const experienceIds = new Set<string>();
  for (const entry of experience) {
    if (!hasText(entry.id)) fail(`Experience entry "${entry.company}" needs an id.`);
    if (experienceIds.has(entry.id)) fail(`Duplicate experience id "${entry.id}".`);
    experienceIds.add(entry.id);
  }

  for (const role of roles) {
    for (const id of role.experienceIds ?? []) {
      if (!experienceIds.has(id)) {
        fail(`Role "${role.id}" references unknown experience id "${id}".`);
      }
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
  /** Opens off-site; components add rel="noopener". */
  external: boolean;
  /** When true, the browser saves the file instead of navigating. */
  download: boolean;
  /** Open in a new browsing context. Resume uses this so the PDF is skimmable. */
  newTab: boolean;
};

/** Shared <a> attributes so Resume, the bar, and the rail open the same way. */
export function ctaAnchorProps(cta: Cta) {
  return {
    href: cta.href,
    ...(cta.external || cta.newTab ? { rel: "noopener" as const } : {}),
    ...(cta.newTab ? { target: "_blank" as const } : {}),
    ...(cta.download
      ? { download: true as const, type: "application/pdf" as const }
      : {}),
  };
}

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
  newTab: true,
};

const linkedinCta: Cta = {
  kind: "linkedin",
  label: ui.cta.linkedin,
  href: contact.linkedin,
  external: true,
  download: false,
  newTab: false,
};

/** Email address as its own label so the footer reads as a real address line. */
const emailCta: Cta = {
  kind: "email",
  label: contact.email,
  href: mailto(contact.email),
  external: false,
  download: false,
  newTab: false,
};

// ---------------------------------------------------------------------------
// Sections + navigation
// ---------------------------------------------------------------------------

/**
 * Scan-path order (FE Designer IA): Hero → Experience → Fit → Footer.
 * Drives both render order in page.tsx and the header nav.
 */
export const sectionOrder: SectionMeta[] = [
  sections.hero,
  sections.experience,
  sections.roles,
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
  title: hero.title,
  mappingLine: hasText(hero.mappingLine) ? hero.mappingLine : null,
  voiceLine: hasText(hero.voiceLine) ? hero.voiceLine : null,
  location: hasText(contact.location) ? contact.location : null,
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
// Roles ("Where I fit") — primary thesis, one adjacent lane, experience links
// ---------------------------------------------------------------------------

export type FitLink = {
  href: Anchor["href"];
  label: string;
};

export type FitLane = {
  id: Role["id"];
  label: string;
  summary: string;
  links: FitLink[];
};

function experienceLinks(ids: ReadonlyArray<string> | undefined): FitLink[] {
  const byId = new Map(experience.map((entry) => [entry.id, entry]));
  return visible(ids ?? []).flatMap((id) => {
    const entry = byId.get(id);
    if (!entry) return [];
    return [{ href: `#${id}` as const, label: entry.company }];
  });
}

function toFitLane(role: Role): FitLane | null {
  if (!hasText(role.summary)) return null;
  return {
    id: role.id,
    label: role.label,
    summary: role.summary,
    links: experienceLinks(role.experienceIds),
  };
}

const primaryRole = roles.find((role) => role.primary) ?? roles[0];
const adjacentRole = roles.find((role) => role.id !== primaryRole.id);

export const rolesView = {
  section: sections.roles,
  thesis: toFitLane(primaryRole),
  adjacent: adjacentRole ? toFitLane(adjacentRole) : null,
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
  /** Expanded on first paint. Exactly one row (the current role, else the first). */
  defaultOpen: boolean;
};

const defaultOpenId: string | null =
  experience.find(isCurrent)?.id ?? experience[0]?.id ?? null;

export const experienceView = {
  section: sections.experience,
  dateRangeSeparator: ui.experience.dateRangeSeparator,
  education: hasText(contact.education) ? contact.education : null,
  rows: experience.map<ExperienceRow>((entry) => ({
    id: entry.id,
    company: entry.company,
    title: entry.title,
    start: toDateLabel(entry.start),
    end: toDateLabel(entry.end),
    dateRange: dateRange(entry),
    location: hasText(entry.location) ? entry.location : null,
    scopeLine: hasText(entry.scopeLine) ? entry.scopeLine : null,
    bullets: visible(entry.bullets),
    defaultOpen: entry.id === defaultOpenId,
  })),
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footerView = {
  section: sections.contact,
  location: hasText(contact.location) ? contact.location : null,
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

const seoTitle = `${hero.name} — ${hero.title}`;
const seoDescription = hasText(hero.mappingLine)
  ? hero.mappingLine
  : hero.voiceLine;

export const seoView = {
  lang: site.lang,
  siteUrl,
  title: seoTitle,
  description: seoDescription,
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
    jobTitle: hero.title,
    email: mailto(contact.email),
    url: siteUrl.href,
    sameAs: visible([contact.linkedin, contact.github]),
    ...(hasText(contact.location)
      ? {
          homeLocation: {
            "@type": "Place",
            name: contact.location,
          },
        }
      : {}),
  },
  skipToContent: ui.skipToContent,
};
