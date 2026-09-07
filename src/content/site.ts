/**
 * Copy-owned site data. Swap TODO_COPY strings for the real ones;
 * robots stays noindex until `siteIndexable` is true and no markers remain.
 */

export const TODO_COPY = "TODO_COPY";

/** Mark a string as placeholder copy. The hint is what belongs here. */
export const todo = (hint: string): string => `${TODO_COPY}: ${hint}`;

export const origin = "https://jarrodtran.com";

export const intro = {
  name: "Jarrod Tran",
  greeting: "Hi, I'm Jarrod.",
  tagline: todo("one-line tagline — who you are, not a job title"),
  bio: todo(
    "2–3 sentences, first person, about who you are outside the job title",
  ),
};

export const now = {
  updatedAt: "2026-09-07",
  items: [
    todo("what you're working on"),
    todo("what you're learning"),
    todo("what you're reading"),
    todo("where you are"),
  ],
};

export const work = {
  paragraph:
    "I lead AI and factory strategy at Tesla Energy. For roles, dates, and the rest of the work history, see",
};

export type TimelineEntry = {
  year: string;
  text: string;
};

export const timeline: TimelineEntry[] = [
  { year: todo("year"), text: todo("born / grew up") },
  { year: todo("year"), text: todo("school, a move, or another formative beat") },
  { year: todo("year"), text: todo("something that isn't a job") },
];

export const links = {
  email: "jarrodtran@outlook.com",
  linkedin: "https://www.linkedin.com/in/jarrodtran/",
  github: todo("https://github.com/your-handle"),
};

/**
 * Flip to true only when intro/now/timeline copy is locked and you want
 * search engines in. Independently, any remaining TODO_COPY keeps noindex.
 */
export const siteIndexable = false;

export function siteTextBlob(): string {
  return JSON.stringify({ intro, now, work, timeline, links });
}
