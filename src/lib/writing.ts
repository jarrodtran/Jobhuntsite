import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  title: string;
  date: string;
  summary: string;
  draft?: boolean;
};

export type Post = PostMeta & { slug: string };

const WRITING_DIR = path.join(process.cwd(), "content/writing");
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function slugsOnDisk(): string[] {
  if (!fs.existsSync(WRITING_DIR)) {
    return [];
  }
  return fs
    .readdirSync(WRITING_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

async function loadMeta(slug: string): Promise<PostMeta> {
  const mod = (await import(`../../content/writing/${slug}.mdx`)) as {
    meta?: Partial<PostMeta>;
  };
  const meta = mod.meta;
  if (!meta?.title?.trim() || !meta.summary?.trim() || !meta.date) {
    throw new Error(
      `content/writing/${slug}.mdx is missing meta.title, meta.date, or meta.summary`,
    );
  }
  if (!ISO_DATE.test(meta.date) || Number.isNaN(Date.parse(`${meta.date}T00:00:00Z`))) {
    throw new Error(
      `content/writing/${slug}.mdx meta.date must be YYYY-MM-DD (got ${meta.date})`,
    );
  }
  return {
    title: meta.title.trim(),
    date: meta.date,
    summary: meta.summary.trim(),
    draft: Boolean(meta.draft),
  };
}

let cached: Post[] | undefined;

export async function getAllPosts(): Promise<Post[]> {
  if (cached) {
    return cached;
  }
  const slugs = slugsOnDisk();
  const unique = new Set(slugs);
  if (unique.size !== slugs.length) {
    throw new Error("Duplicate writing slugs");
  }
  const posts = await Promise.all(
    slugs.map(async (slug) => ({ slug, ...(await loadMeta(slug)) })),
  );
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  cached = posts;
  return posts;
}

export async function getPublishedPosts(): Promise<Post[]> {
  return (await getAllPosts()).filter((post) => !post.draft);
}

export async function getPublishedPost(slug: string): Promise<Post | undefined> {
  return (await getPublishedPosts()).find((post) => post.slug === slug);
}
