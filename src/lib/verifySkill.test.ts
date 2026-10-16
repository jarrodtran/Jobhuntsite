import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

describe("verify-jobhuntsite doctor", () => {
  it("fetches /writing/ in addition to / and /work/", () => {
    const script = readFileSync(
      path.join(
        repoRoot,
        ".cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite",
      ),
      "utf8",
    );
    expect(script).toContain('${JOBHUNTSITE_URL}work/');
    expect(script).toContain('${JOBHUNTSITE_URL}writing/');
    expect(script).toContain('data-page="writing"');
  });
});
