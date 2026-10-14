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
export type SectionId =
  | "hero"
  | "now"
  | "writing"
  | "roles"
  | "experience"
  | "contact";

/** Copy-owned Substack endpoints. Feed sync uses the publication URL + /feed. */
export type SubstackConfig = {
  /** Publication home, e.g. https://jarrodtran.substack.com */
  publicationUrl: string;
  /** Subscribe landing page. */
  subscribeUrl: string;
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
};

export type Role = {
  id: RoleId;
  /** Lane label on the Fit column. */
  label: string;
  /** Exactly one role must be primary. Fit renders it first in the lane stack. */
  primary: boolean;
  /** Lane paragraph. Fit underlines experience link labels inside this string. */
  summary: string;
  /** Stored, not rendered. Proof lives in Experience bullets. */
  evidence: string[];
  /** Stored for future per-audience ordering. Not rendered. */
  audiences: Audience[];
  /** Backing rows. Validated at build. Fit underlines matching labels in `summary`. */
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
  /**
   * Parent company, e.g. Alphabet for Waymo. The Experience row renders
   * "Waymo (Alphabet)" and JSON-LD adds `parentOrganization`. Fit link
   * labels keep the short `company`.
   */
  parentCompany?: string;
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
  /** City. /work header and footer render it when set. */
  location?: string;
  /**
   * Relocation stance in Jarrod's words, e.g. "open to relocate". Joined to
   * `location` with a middot on the /work CTA line and in the JSON-LD
   * description; the footer stays city-only. Never name target cities here.
   */
  relocation?: string;
  /** One line under Experience. Hidden when blank. */
  education?: string;
  /** Institution named in `education`. JSON-LD `alumniOf` only, not rendered. */
  school?: string;
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

/** Headings and anchors for each in-page section. */
export type SectionMeta = {
  id: SectionId;
  heading: string;
};

/**
 * Every non-content string the UI renders: button labels, badges, a11y
 * labels. Lives in content so Copy can retune wording without a component edit.
 */
export type UiStrings = {
  skipToContent: string;
  cta: {
    resume: string;
    /** Announced instead of `resume`: names the file type and the new tab. */
    resumeAriaLabel: string;
    linkedin: string;
    subscribe: string;
  };
  experience: {
    /** Separator between start and end inside a date range. */
    dateRangeSeparator: string;
  };
  now: {
    heading: string;
  };
  writing: {
    heading: string;
    empty: string;
    readOnSubstack: string;
    openSubstack: string;
    /** Home preview link to the full Writing index. */
    allWriting: string;
  };
  nav: {
    writing: string;
    work: string;
    contact: string;
  };
};
