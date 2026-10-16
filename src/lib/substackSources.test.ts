import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { SUBSTACK_FEED_URL } from "@/lib/substack";
import { substack } from "@/content";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readRepo(relative: string): string {
  return readFileSync(path.join(repoRoot, relative), "utf8");
}

function assignedString(source: string, name: string): string {
  const match = source.match(
    new RegExp(`(?:export const |const )${name}\\s*=\\s*"([^"]+)"`),
  );
  if (!match) {
    throw new Error(`missing string assignment for ${name}`);
  }
  return match[1];
}

describe("Substack URL owners", () => {
  it("keeps the fetch script on SUBSTACK_FEED_URL", () => {
    const script = readRepo("scripts/fetch-substack.mjs");
    expect(assignedString(script, "FEED_URL")).toBe(SUBSTACK_FEED_URL);
    expect(SUBSTACK_FEED_URL).toBe("https://jarrodtran.substack.com/feed");
  });

  it("keeps publication and subscribe URLs in content.ts", () => {
    expect(substack.publicationUrl).toBe("https://jarrodtran.substack.com");
    expect(substack.subscribeUrl).toBe(
      "https://jarrodtran.substack.com/subscribe",
    );
    const moduleSource = readRepo("src/lib/substack.ts");
    expect(assignedString(moduleSource, "SUBSTACK_SITE_URL")).toBe(
      substack.publicationUrl,
    );
    expect(assignedString(moduleSource, "SUBSTACK_SUBSCRIBE_URL")).toBe(
      substack.subscribeUrl,
    );
  });
});
