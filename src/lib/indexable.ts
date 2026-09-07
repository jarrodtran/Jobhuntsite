import { TODO_COPY, siteIndexable, siteTextBlob } from "@/content/site";
import { getPublishedPosts } from "@/lib/writing";

export async function remainingPlaceholders(): Promise<string[]> {
  const texts = [siteTextBlob()];
  for (const post of await getPublishedPosts()) {
    texts.push(post.title, post.summary);
  }
  const blob = texts.join("\n");
  return blob.match(new RegExp(`${TODO_COPY}: [^"\\n]+`, "g")) ?? [];
}

export async function isIndexable(): Promise<boolean> {
  return siteIndexable && (await remainingPlaceholders()).length === 0;
}

export async function logRemainingPlaceholders(): Promise<void> {
  const leftover = await remainingPlaceholders();
  if (leftover.length === 0) {
    return;
  }
  console.warn(
    `Remaining ${TODO_COPY} placeholders (${leftover.length}):\n  - ${leftover.join("\n  - ")}`,
  );
}
