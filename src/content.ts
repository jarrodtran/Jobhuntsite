/**
 * Single source of truth for every word on the site.
 *
 * Copy owns this file. Components only read from it, so prose changes should
 * never require touching `src/components`.
 *
 * Placeholders are prefixed with `TODO_COPY:` and produced by the `todo()`
 * helper below. While any placeholder remains, the site stays `noindex`
 * (see `contentHasPlaceholders`). Optional fields such as `location` may be
 * omitted or left blank; the UI hides blank fields rather than rendering
 * empty labels.
 */

export const TODO_COPY = "TODO_COPY";

/** Mark a string as placeholder copy. `hint` tells Copy what belongs here. */
const todo = (hint: string): string => `${TODO_COPY}: ${hint}`;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Audience =
  | "big-tech"
  | "ai-startup"
  | "defense"
  | "robotics"
  | "venture";

export type RoleId = "ai-enablement" | "bizops" | "cos" | "vc";

/** Short, scannable claim rendered as a chip under the hero voice line. */
export type ProofChip = {
  /** The chip text, e.g. a scope or result. Keep it under ~6 words. */
  label: string;
  /** Optional leading figure. Leave out when there is no defensible number. */
  metric?: string;
};

export type Hero = {
  name: string;
  /** Headline title shown directly under the name. */
  title: string;
  /** First-person line that says what you do and for whom. */
  voiceLine: string;
  proofChips: ProofChip[];
  /** Pedigree row. Hidden when empty. */
  employers: string[];
};

export type Role = {
  id: RoleId;
  /** Section heading. */
  label: string;
  /** Exactly one role should be primary; it leads the section order. */
  primary: boolean;
  /** One or two sentences on why this role is a fit. */
  summary: string;
  /** Outcome-led evidence bullets that support the fit. */
  evidence: string[];
  /** Stored for future per-audience ordering; not rendered today. */
  audiences: Audience[];
  /** Experience entries that back this role, by `ExperienceEntry.id`. */
  experienceIds?: string[];
};

export type ExperienceEntry = {
  /** Stable id used by `Role.experienceIds` and anchor links. */
  id: string;
  company: string;
  title: string;
  start: string;
  end: string;
  /** Optional. Blank or omitted values are never rendered. */
  location?: string;
  /** Reporting line, team size, budget or mandate. Hidden when blank. */
  scopeLine?: string;
  bullets: string[];
  url?: string;
};

export type Contact = {
  email: string;
  linkedin: string;
  /** Path under `public/`. Prefixed with basePath by `asset()`. */
  resumePdf: string;
  github?: string;
  /** Optional. Blank or omitted values are never rendered. */
  location?: string;
  availability?: string;
  clearance?: string;
};

export type NavLink = {
  label: string;
  /** In-page anchor, e.g. `#roles`. */
  href: `#${string}`;
};

export type Site = {
  title: string;
  description: string;
  origin: string;
  basePath: string;
  nav: NavLink[];
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export const hero: Hero = {
  name: "Jarrod Tran",
  title: "AI Strategy and Operations Leader",
  voiceLine:
    "I turn AI from a pilot into operating cadence for executive teams.",
  proofChips: [
    { label: todo("proof chip 1 — scope or result, under 6 words") },
    { label: todo("proof chip 2 — scope or result, under 6 words") },
    { label: todo("proof chip 3 — scope or result, under 6 words") },
  ],
  employers: [
    todo("employer 1"),
    todo("employer 2"),
    todo("employer 3"),
  ],
};

export const roles: Role[] = [
  {
    id: "ai-enablement",
    label: "AI Enablement Strategy and Ops",
    primary: true,
    summary: todo("one or two sentences on why this is the primary target"),
    evidence: [
      todo("outcome-led evidence bullet for AI enablement"),
      todo("second evidence bullet for AI enablement"),
    ],
    audiences: ["ai-startup", "big-tech", "defense", "robotics"],
    experienceIds: ["exp-1"],
  },
  {
    id: "bizops",
    label: "Business Operations",
    primary: false,
    summary: todo("one or two sentences on business operations fit"),
    evidence: [todo("outcome-led evidence bullet for bizops")],
    audiences: ["big-tech", "ai-startup"],
    experienceIds: ["exp-1", "exp-2"],
  },
  {
    id: "cos",
    label: "Chief of Staff",
    primary: false,
    summary: todo("one or two sentences on chief-of-staff fit"),
    evidence: [todo("outcome-led evidence bullet for chief of staff")],
    audiences: ["ai-startup", "defense", "robotics"],
    experienceIds: ["exp-2"],
  },
  {
    id: "vc",
    label: "VC Platform",
    primary: false,
    summary: todo("one or two sentences on venture platform / ops fit"),
    evidence: [todo("outcome-led evidence bullet for VC platform")],
    audiences: ["venture"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "exp-1",
    company: todo("most recent company"),
    title: todo("title held"),
    start: todo("start year"),
    end: "Present",
    // location intentionally omitted until Copy confirms it should show.
    scopeLine: todo("reporting line; team size; budget or mandate"),
    bullets: [
      todo("outcome-led bullet first (result, then how)"),
      todo("second bullet, still outcome-first"),
    ],
  },
  {
    id: "exp-2",
    company: todo("prior company"),
    title: todo("title held"),
    start: todo("start year"),
    end: todo("end year"),
    location: "",
    scopeLine: todo("reporting line; team size; budget or mandate"),
    bullets: [
      todo("outcome-led bullet first"),
      todo("second bullet"),
    ],
  },
];

export const contact: Contact = {
  email: "TODO_COPY@example.com",
  linkedin: "https://www.linkedin.com/in/TODO_COPY",
  resumePdf: "/resume.pdf",
  // location, github, availability and clearance stay omitted until useful.
};

export const site: Site = {
  title: `${hero.name} — ${hero.title}`,
  description: hero.voiceLine,
  origin: "https://jarrodtran.github.io",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  nav: [
    { label: "Roles", href: "#roles" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
};

/* ------------------------------------------------------------------ */
/* Derived values                                                      */
/* ------------------------------------------------------------------ */

export const primaryRole: Role = roles.find((role) => role.primary) ?? roles[0];

export const secondaryRoles: Role[] = roles.filter(
  (role) => role.id !== primaryRole.id,
);

export const targetingLine: string =
  secondaryRoles.length > 0
    ? `Also a fit for: ${secondaryRoles.map((role) => role.label).join(", ")}.`
    : "";

/** True while any string anywhere in the content still carries a placeholder. */
export const contentHasPlaceholders: boolean = JSON.stringify({
  hero,
  roles,
  experience,
  contact,
}).includes(TODO_COPY);
