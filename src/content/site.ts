/**
 * Copy-owned site data. Swap TODO_COPY strings for the real ones;
 * robots stays noindex until `siteIndexable` is true and no markers remain.
 */

export const TODO_COPY = "TODO_COPY";

export type TodoCopy = `${typeof TODO_COPY}: ${string}`;

/** Mark a string as placeholder copy. The hint is what belongs here. */
export const todo = (hint: string): TodoCopy => {
  const trimmed = hint.trim();
  if (!trimmed) {
    throw new Error("site.ts: todo() hint must be non-empty");
  }
  if (trimmed.includes(TODO_COPY)) {
    throw new Error("site.ts: todo() hint must not include the marker");
  }
  return `${TODO_COPY}: ${trimmed}`;
};

export const origin = "https://jarrodtran.com";

export type Intro = {
  name: string;
  greeting: string;
  tagline: string;
  bio: string;
};

export type Now = {
  /** Calendar date, YYYY-MM-DD (UTC). */
  updatedAt: string;
  items: readonly string[];
};

export type Work = {
  paragraph: string;
};

export type TimelineEntry = {
  year: string;
  text: string;
};

export type Links = {
  email: string;
  linkedin: string;
  github: string;
};

export const intro: Intro = {
  name: "Jarrod Tran",
  greeting: "Hi, I'm Jarrod.",
  tagline: todo("one-line tagline — who you are, not a job title"),
  bio: todo(
    "2–3 sentences, first person, about who you are outside the job title",
  ),
};

export const now: Now = {
  updatedAt: "2026-09-07",
  items: [
    todo("what you're working on"),
    todo("what you're learning"),
    todo("what you're reading"),
    todo("where you are"),
  ],
};

export const work: Work = {
  paragraph:
    "I lead AI and factory strategy at Tesla Energy. For roles, dates, and the rest of the work history, see",
};

export const timeline: TimelineEntry[] = [
  { year: todo("year"), text: todo("born / grew up") },
  { year: todo("year"), text: todo("school, a move, or another formative beat") },
  { year: todo("year"), text: todo("something that isn't a job") },
];

export const links: Links = {
  email: "jarrodtran@outlook.com",
  linkedin: "https://www.linkedin.com/in/jarrodtran/",
  github: todo("https://github.com/your-handle"),
};

/**
 * Flip to true only when intro/now/timeline copy is locked and you want
 * search engines in. Independently, any remaining TODO_COPY keeps noindex.
 */
export const siteIndexable: boolean = false;

/** Fields the indexing gate and placeholder scanner walk. */
export const siteCopy = { intro, now, work, timeline, links } as const;

export function absoluteUrl(pathname = "/"): string {
  if (!pathname.startsWith("/")) {
    throw new Error(`site.ts: pathname must start with "/": ${pathname}`);
  }
  return pathname === "/" ? origin : `${origin}${pathname}`;
}

export function siteTextBlob(): string {
  return JSON.stringify(siteCopy);
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

function isMarked(value: string): boolean {
  return value.includes(TODO_COPY);
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`site.ts: ${message}`);
  }
}

function validateSite(): void {
  assert(origin === "https://jarrodtran.com", "origin must be https://jarrodtran.com");
  assert(!origin.endsWith("/"), "origin must not have a trailing slash");

  assert(intro.name.trim().length > 0, "intro.name is required");
  assert(intro.greeting.trim().length > 0, "intro.greeting is required");
  assert(intro.tagline.trim().length > 0, "intro.tagline is required");
  assert(intro.bio.trim().length > 0, "intro.bio is required");

  assert(isIsoDate(now.updatedAt), "now.updatedAt must be a real YYYY-MM-DD date");
  assert(now.items.length > 0, "now.items must not be empty");
  now.items.forEach((item, index) => {
    assert(item.trim().length > 0, `now.items[${index}] must be a non-empty string`);
  });

  assert(work.paragraph.trim().length > 0, "work.paragraph is required");

  assert(timeline.length > 0, "timeline must not be empty");
  timeline.forEach((entry, index) => {
    assert(entry.year.trim().length > 0, `timeline[${index}].year is required`);
    assert(entry.text.trim().length > 0, `timeline[${index}].text is required`);
  });

  if (!isMarked(links.email)) {
    assert(EMAIL.test(links.email), "links.email must be an email address");
  }
  if (!isMarked(links.linkedin)) {
    assert(isHttpsUrl(links.linkedin), "links.linkedin must be an https URL");
  }
  if (!isMarked(links.github)) {
    assert(isHttpsUrl(links.github), "links.github must be an https URL");
  }

  assert(typeof siteIndexable === "boolean", "siteIndexable must be a boolean");
}

validateSite();
