/**
 * Content schema. Eng owns this file; Copy owns `src/content.ts`.
 *
 * Every field a component can render is declared here. Optional fields are
 * optional because the UI hides them when blank — never render an empty label.
 * Adding a field: declare it here, populate it in `src/content.ts`, then read it
 * through `src/lib/selectors.ts`. Components never import `process.env` or do
 * their own filtering; selectors hand them render-ready data.
 */

export type Audience =
  | "big-tech"
  | "ai-startup"
  | "defense"
  | "robotics"
  | "venture";

export type RoleId = "ai-enablement" | "bizops" | "cos" | "vc";

/** Section anchors. Also the `data-section` hook FE Designer can style against. */
export type SectionId = "hero" | "roles" | "experience" | "contact";

export type ProofChip = {
  /** Headline number. Optional: leave out when there is no defensible figure. */
  metric?: string;
  /** Scope for the metric, or the whole claim when `metric` is absent. */
  label: string;
};

export type Hero = {
  name: string;
  /** Drives the <h1> subtitle, <title>, OG title, and JSON-LD jobTitle. */
  title: string;
  /** One first-person line. Drives meta description and OG description. */
  voiceLine: string;
  proofChips: ProofChip[];
  /** Pedigree row. Order is display order. Hidden when empty. */
  employers: string[];
};

export type Role = {
  id: RoleId;
  /** Rendered as a chip in "Where I fit". */
  label: string;
  /** Exactly one role must be primary; it renders first and gets the badge. */
  primary: boolean;
  /** Stored, not rendered. Proof lives in Experience bullets (FE Designer spec). */
  summary: string;
  /** Stored, not rendered. */
  evidence: string[];
  /** Stored for future per-audience ordering. Not rendered. */
  audiences: Audience[];
  /** `ExperienceEntry.id`s that back this role. Validated at build; not rendered. */
  experienceIds?: string[];
};

export type ExperienceEntry = {
  /** Anchor target (`#<id>`) and the key `Role.experienceIds` points at. */
  id: string;
  company: string;
  title: string;
  /** Year or "Mon YYYY". Rendered inside <time>. */
  start: string;
  /** Year, "Mon YYYY", or "Present". */
  end: string;
  location?: string;
  /** Reporting line, team, budget. One line. */
  scopeLine?: string;
  bullets: string[];
  /** Company or program link. Stored, not rendered (rows are buttons, not links). */
  url?: string;
};

export type Contact = {
  email: string;
  linkedin: string;
  /** Public-folder path, e.g. "/resume.pdf". Prefixed with basePath at render. */
  resumePdf: string;
  /** Stored, not rendered. Footer is email + LinkedIn only. */
  github?: string;
  location?: string;
  availability?: string;
  clearance?: string;
};

export type OgImage = {
  /** Public-folder path, e.g. "/og.png". Prefixed with basePath at render. */
  path: string;
  width: number;
  height: number;
};

export type Site = {
  /** Canonical origin without basePath or trailing slash. */
  origin: string;
  /** Language for <html lang>. */
  lang: string;
  ogImage: OgImage;
};

/** Headings, nav labels, and anchors for each in-page section. */
export type SectionMeta = {
  id: SectionId;
  heading: string;
  /** Present when the section appears in the header nav. */
  navLabel?: string;
};

/**
 * Every non-content string the UI renders: button labels, badges, a11y
 * labels. Lives in content so Copy can retune wording without a component edit.
 */
export type UiStrings = {
  skipToContent: string;
  cta: {
    resume: string;
    linkedin: string;
  };
  hero: {
    proofChipsLabel: string;
    employersLabel: string;
  };
  roles: {
    primaryBadge: string;
  };
  experience: {
    /** Separator between start and end inside a date range. */
    dateRangeSeparator: string;
  };
};
