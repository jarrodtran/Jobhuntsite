/**
 * Substack feed → typed posts. Build script writes JSON; pages read it.
 * Empty list is a valid state (show empty Writing UI), not an error.
 */

export type SubstackPost = {
  title: string;
  url: string;
  /** ISO-8601 from RSS pubDate when parseable; otherwise raw pubDate or "". */
  publishedAt: string;
  excerpt: string;
};

export type SubstackFeedFile = {
  fetchedAt: string | null;
  source: string;
  posts: SubstackPost[];
};

export const SUBSTACK_FEED_URL = "https://jarrodtran.substack.com/feed";

const DEFAULT_FEED_FILE: SubstackFeedFile = {
  fetchedAt: null,
  source: SUBSTACK_FEED_URL,
  posts: [],
};

/** Strip tags and collapse whitespace for card excerpts. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function decodeCdata(raw: string): string {
  return raw
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function tagContents(block: string, tag: string): string | null {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i");
  const match = block.match(re);
  if (!match) return null;
  return decodeCdata(match[1].trim());
}

function toIsoDate(raw: string | null): string {
  if (!raw) return "";
  const ms = Date.parse(raw);
  if (Number.isNaN(ms)) return raw.trim();
  return new Date(ms).toISOString();
}

/** Parse a Substack (or generic) RSS 2.0 channel into posts. */
export function parseSubstackRss(xml: string): SubstackPost[] {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const posts: SubstackPost[] = [];

  for (const item of items) {
    const title = tagContents(item, "title");
    const link = tagContents(item, "link");
    if (!title || !link) continue;

    const description =
      tagContents(item, "description") ??
      tagContents(item, "content:encoded") ??
      "";
    const pubDate = tagContents(item, "pubDate");

    posts.push({
      title: stripHtml(title),
      url: link.trim(),
      publishedAt: toIsoDate(pubDate),
      excerpt: truncate(stripHtml(description), 220),
    });
  }

  return posts;
}

export function normalizeFeedFile(raw: unknown): SubstackFeedFile {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_FEED_FILE };
  const record = raw as Record<string, unknown>;
  const postsRaw = Array.isArray(record.posts) ? record.posts : [];
  const posts: SubstackPost[] = postsRaw.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const p = entry as Record<string, unknown>;
    const title = typeof p.title === "string" ? p.title.trim() : "";
    const url = typeof p.url === "string" ? p.url.trim() : "";
    if (!title || !url) return [];
    return [
      {
        title,
        url,
        publishedAt: typeof p.publishedAt === "string" ? p.publishedAt : "",
        excerpt: typeof p.excerpt === "string" ? p.excerpt : "",
      },
    ];
  });

  return {
    fetchedAt: typeof record.fetchedAt === "string" ? record.fetchedAt : null,
    source:
      typeof record.source === "string" ? record.source : SUBSTACK_FEED_URL,
    posts,
  };
}
