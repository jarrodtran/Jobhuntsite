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
  /**
   * Market seat recruiters should route into (e.g. Chief of Staff / BizOps).
   * Drives the hero subtitle, <title>, OG title, and JSON-LD jobTitle — not the
   * current employer job title (that lives on the Experience row).
   */
  seat: string;
  /**
   * Quiet adjacent line under the seat (e.g. AI enablement as the operating
   * edge). Hidden when blank.
   */
  edge?: string;
  /** One first-person line. Drives meta description and OG description. */
  voiceLine: string;
  /** Headline chips. Order is display order; the first chip is the visual lead. */
  proofChips: ProofChip[];
  /** Pedigree row. Order is display order. Hidden when empty. */
  employers: string[];
};

/**
 * Secondary proof under the hero (hairline strip before Experience). Same
 * shape as a hero chip; every figure must already appear in `experience`.
 * Hidden when empty.
 */
export type ProofBand = ProofChip[];

export type Role = {
  id: RoleId;
  /** Rendered as a text link in "Where I fit". */
  label: string;
  /** Exactly one role must be primary; it renders first and gets the badge. */
  primary: boolean;
  /** One-sentence fit argument. Rendered for the primary role. */
  summary: string;
  /** Proof lines. The first is rendered under the primary summary. */
  evidence: string[];
  /** Stored for future per-audience ordering. Not rendered. */
  audiences: Audience[];
  /**
   * When true, the role is omitted from the Fit section (kept in content for
   * later). Use for under-evidenced seats such as VC Platform.
   */
  hidden?: boolean;
  /** `ExperienceEntry.id`s that back this role. Validated at build; the first is the Fit link target. */
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
  /**
   * When true, render as a single compact line (pedigree only) instead of an
   * expandable row. Use for early roles that pad more than they prove.
   */
  compact?: boolean;
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
  proofBand: {
    /** a11y label for the strip; not rendered visually. */
    label: string;
  };
  roles: {
    primaryBadge: string;
    /** Heading for non-primary roles under the primary proof block. */
    alsoLabel: string;
  };
  experience: {
    /** Separator between start and end inside a date range. */
    dateRangeSeparator: string;
  };
};
