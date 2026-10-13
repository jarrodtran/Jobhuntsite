#!/usr/bin/env node
/**
 * Fetch Substack RSS into src/data/substack-posts.json for static export.
 * On network/parse failure, keep the existing file (or write empty posts) and exit 0.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "src/data/substack-posts.json");
const FEED_URL = "https://jarrodtran.substack.com/feed";

function decodeCdata(raw) {
  return raw
    .replace(/^<!\[CDATA\[/, "")
    .replace(/\]\]>$/, "")
    .trim();
}

function stripHtml(html) {
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

function truncate(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function tagContents(block, tag) {
  const re = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i");
  const match = block.match(re);
  if (!match) return null;
  return decodeCdata(match[1].trim());
}

function toIsoDate(raw) {
  if (!raw) return "";
  const ms = Date.parse(raw);
  if (Number.isNaN(ms)) return raw.trim();
  return new Date(ms).toISOString();
}

function parseSubstackRss(xml) {
  const items = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const posts = [];
  for (const item of items) {
    const title = tagContents(item, "title");
    const link = tagContents(item, "link");
    if (!title || !link) continue;
    const description =
      tagContents(item, "description") ??
      tagContents(item, "content:encoded") ??
      "";
    posts.push({
      title: stripHtml(title),
      url: link.trim(),
      publishedAt: toIsoDate(tagContents(item, "pubDate")),
      excerpt: truncate(stripHtml(description), 220),
    });
  }
  return posts;
}

async function readExisting() {
  try {
    const raw = await readFile(OUT, "utf8");
    return JSON.parse(raw);
  } catch {
    return {
      fetchedAt: null,
      source: FEED_URL,
      posts: [],
    };
  }
}

async function main() {
  await mkdir(path.dirname(OUT), { recursive: true });
  const existing = await readExisting();

  try {
    const res = await fetch(FEED_URL, {
      headers: { "user-agent": "jobhuntsite-fetch-substack/1.0" },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const xml = await res.text();
    const posts = parseSubstackRss(xml);
    const payload = {
      fetchedAt: new Date().toISOString(),
      source: FEED_URL,
      posts,
    };
    await writeFile(OUT, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    console.log(
      `fetch-substack: wrote ${posts.length} post(s) to ${path.relative(ROOT, OUT)}`,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `fetch-substack: fetch failed (${message}); keeping prior JSON (${existing.posts?.length ?? 0} posts)`,
    );
    if (!existing.posts) {
      await writeFile(
        OUT,
        `${JSON.stringify({ fetchedAt: null, source: FEED_URL, posts: [] }, null, 2)}\n`,
        "utf8",
      );
    }
  }
}

main();
