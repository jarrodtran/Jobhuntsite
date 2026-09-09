import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { THEME_COLOR, viewportChrome } from "@/lib/chrome";

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("browser chrome", () => {
  it("sets theme-color to paper #F7F6F3", () => {
    expect(THEME_COLOR).toBe("#F7F6F3");
    expect(viewportChrome.themeColor).toBe("#F7F6F3");
  });

  it("wires theme-color through the Next viewport export in the root layout", () => {
    const layout = readFileSync(path.join(srcDir, "app/layout.tsx"), "utf8");
    expect(layout).toContain("viewportChrome");
    expect(layout).toContain("export const viewport");
  });

  it("selects ink on a paper tint", () => {
    const css = readFileSync(path.join(srcDir, "app/globals.css"), "utf8");
    expect(css).toMatch(/::selection\s*\{[^}]*color:\s*var\(--ink\)/s);
    expect(css).toMatch(/::selection\s*\{[^}]*background:/s);
  });
});
