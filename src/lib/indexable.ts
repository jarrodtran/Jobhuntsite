import fs from "node:fs";
import path from "node:path";
import { TODO_COPY, siteCopy, siteIndexable } from "@/content/site";
import { isPlaceholder } from "@/lib/format";
import { getPublishedPosts, type Post } from "@/lib/writing";

const WRITING_DIR = path.join(process.cwd(), "content/writing");

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Bare `TODO_COPY` or `TODO_COPY: hint` on one line. */
const PLACEHOLDER_RE = new RegExp(
  `${escapeRegExp(TODO_COPY)}(?::[^\\n]*)?`,
  "g",
);

function walkStrings(value: unknown, out: string[]): void {
  if (typeof value === "string") {
    out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      walkStrings(item, out);
    }
    return;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      walkStrings(item, out);
    }
  }
}

function placeholdersIn(text: string): string[] {
  return (text.match(PLACEHOLDER_RE) ?? []).map((hit) => hit.trimEnd());
}

function publishedPostSource(slug: string): string {
  try {
    return fs.readFileSync(path.join(WRITING_DIR, `${slug}.mdx`), "utf8");
  } catch {
    return "";
  }
}

/** Published, non-draft posts whose listing fields are real copy. */
export function isListablePost(post: Post): boolean {
  return (
    !post.draft &&
    !isPlaceholder(post.title) &&
    !isPlaceholder(post.summary) &&
    !isPlaceholder(post.slug)
  );
}

export async function getListablePosts(): Promise<Post[]> {
  return (await getPublishedPosts()).filter(isListablePost);
}

export async function remainingPlaceholders(): Promise<string[]> {
  const texts: string[] = [];
  walkStrings(siteCopy, texts);

  for (const post of await getPublishedPosts()) {
    texts.push(post.title, post.summary, post.slug, publishedPostSource(post.slug));
  }

  const found = new Set<string>();
  for (const text of texts) {
    for (const hit of placeholdersIn(text)) {
      found.add(hit);
    }
  }
  return [...found].sort((a, b) => a.localeCompare(b));
}

export async function isIndexable(): Promise<boolean> {
  return siteIndexable && (await remainingPlaceholders()).length === 0;
}

let logged = false;

export async function logRemainingPlaceholders(): Promise<void> {
  if (logged) {
    return;
  }
  logged = true;
  const leftover = await remainingPlaceholders();
  if (leftover.length === 0) {
    return;
  }
  console.warn(
    `Remaining ${TODO_COPY} placeholders (${leftover.length}):\n  - ${leftover.join("\n  - ")}`,
  );
}
