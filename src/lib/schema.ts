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

export type RoleId = "ai-enablement" | "bizops";

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
  /** Tesla (or current) job name. On-page subtitle and JSON-LD jobTitle. */
  title: string;
  /**
   * Tab and OG title after the name. Recruiter filing language, not the
   * Tesla-internal title.
   */
  searchTitle?: string;
  /** One filing sentence under the Tesla title. Also the meta / OG description. */
  mappingLine?: string;
  /** Extra first-person line. Hidden when blank. */
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
  /** Lane name. Primary thesis uses this only as context; adjacent renders it. */
  label: string;
  /** Exactly one role must be primary. Fit renders its summary as the thesis. */
  primary: boolean;
  /** Primary: the Fit thesis. Adjacent: the second paragraph. */
  summary: string;
  /** Stored, not rendered. Proof lives in Experience bullets. */
  evidence: string[];
  /** Stored for future per-audience ordering. Not rendered. */
  audiences: Audience[];
  /** Backing rows. Validated at build. Fit renders each as a text link. */
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
  /** Stored, not rendered. */
  github?: string;
  /** City. Hero and footer render it when set. */
  location?: string;
  /** One line under Experience. Hidden when blank. */
  education?: string;
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
  experience: {
    /** Separator between start and end inside a date range. */
    dateRangeSeparator: string;
  };
};
