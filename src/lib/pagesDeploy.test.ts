import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readRepo(relative: string): string {
  return readFileSync(path.join(repoRoot, relative), "utf8");
}

describe("GitHub Pages apex (jarrodtran.com)", () => {
  it("ships a CNAME so static export publishes the custom domain", () => {
    expect(readRepo("public/CNAME")).toBe("jarrodtran.com\n");
  });

  it("builds production with an empty NEXT_PUBLIC_BASE_PATH", () => {
    const workflow = readRepo(".github/workflows/deploy.yml");
    expect(workflow).not.toMatch(/NEXT_PUBLIC_BASE_PATH:\s*\/Jobhuntsite/);
    expect(workflow).toMatch(/pnpm build/);
  });

  it("scopes Actions concurrency per PR so sibling PRs do not cancel lint/test", () => {
    const workflow = readRepo(".github/workflows/deploy.yml");
    expect(workflow).not.toMatch(/group:\s*pages\s*$/m);
    expect(workflow).toMatch(
      /group:\s*\$\{\{\s*github\.workflow\s*\}\}-\$\{\{\s*github\.event\.pull_request\.number\s*\|\|\s*github\.ref\s*\}\}/,
    );
    expect(workflow).toMatch(/cancel-in-progress:\s*true/);
  });
});
