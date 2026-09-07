import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

export type PostMeta = {
  title: string;
  date: string;
  summary: string;
  draft?: boolean;
};

export type Post = PostMeta & { slug: string };

const WRITING_DIR = path.join(process.cwd(), "content/writing");
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isDraft(post: { draft?: boolean }): boolean {
  return post.draft === true;
}

export function isSafeSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

function fileLabel(slug: string): string {
  return `content/writing/${slug}.mdx`;
}

function assertSlug(slug: string): void {
  if (!isSafeSlug(slug)) {
    throw new Error(
      `${fileLabel(slug)} has an invalid slug. Use a kebab-case filename like my-essay.mdx (lowercase letters, digits, and single hyphens).`,
    );
  }
}

function isRealIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  return (
    utc.getUTCFullYear() === year &&
    utc.getUTCMonth() === month - 1 &&
    utc.getUTCDate() === day
  );
}

function parseMeta(slug: string, raw: unknown): PostMeta {
  const file = fileLabel(slug);
  if (!raw || typeof raw !== "object") {
    throw new Error(
      `${file} must export const meta = { title, date, summary, draft? }. The meta export is missing or is not an object.`,
    );
  }

  const meta = raw as Record<string, unknown>;
  const problems: string[] = [];

  if (typeof meta.title !== "string" || !meta.title.trim()) {
    problems.push("title must be a non-empty string");
  }
  if (typeof meta.date !== "string" || !meta.date.trim()) {
    problems.push("date must be a YYYY-MM-DD string");
  } else if (!isRealIsoDate(meta.date)) {
    problems.push(
      `date must be a real calendar day as YYYY-MM-DD (got ${JSON.stringify(meta.date)})`,
    );
  }
  if (typeof meta.summary !== "string" || !meta.summary.trim()) {
    problems.push("summary must be a non-empty string");
  }
  if (meta.draft !== undefined && typeof meta.draft !== "boolean") {
    problems.push(
      `draft must be a boolean if set (got ${JSON.stringify(meta.draft)}). Only draft: true is excluded from lists, RSS, the sitemap, and the public slug`,
    );
  }

  if (problems.length > 0) {
    throw new Error(`${file} has invalid meta:\n  - ${problems.join("\n  - ")}`);
  }

  return {
    title: (meta.title as string).trim(),
    date: meta.date as string,
    summary: (meta.summary as string).trim(),
    draft: meta.draft === true ? true : undefined,
  };
}

function slugsOnDisk(): string[] {
  if (!fs.existsSync(WRITING_DIR)) {
    return [];
  }

  const slugs = fs
    .readdirSync(WRITING_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  const seen = new Map<string, string>();
  for (const slug of slugs) {
    assertSlug(slug);
    const key = slug.toLowerCase();
    const prior = seen.get(key);
    if (prior) {
      throw new Error(
        `Duplicate writing slugs: "${prior}" and "${slug}" both resolve to /writing/${key}.`,
      );
    }
    seen.set(key, slug);
  }

  return slugs.sort();
}

async function loadMeta(slug: string): Promise<PostMeta> {
  try {
    const mod = (await import(`../../content/writing/${slug}.mdx`)) as {
      meta?: unknown;
    };
    return parseMeta(slug, mod.meta);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith(fileLabel(slug))) {
      throw error;
    }
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to load ${fileLabel(slug)}: ${detail}`);
  }
}

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const slugs = slugsOnDisk();
  const posts = await Promise.all(
    slugs.map(async (slug) => ({ slug, ...(await loadMeta(slug)) })),
  );
  posts.sort(
    (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
  );
  return posts;
});

export async function getPublishedPosts(): Promise<Post[]> {
  return (await getAllPosts()).filter((post) => !isDraft(post));
}

export async function getPublishedPost(
  slug: string,
): Promise<Post | undefined> {
  if (!isSafeSlug(slug)) {
    return undefined;
  }
  const post = (await getPublishedPosts()).find((entry) => entry.slug === slug);
  if (!post || isDraft(post)) {
    return undefined;
  }
  return post;
}
