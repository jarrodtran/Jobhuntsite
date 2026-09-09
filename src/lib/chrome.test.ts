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

  it("covers the viewport so safe-area insets apply", () => {
    expect(viewportChrome.viewportFit).toBe("cover");
  });

  it("wires theme-color through the Next viewport export in the root layout", () => {
    const layout = readFileSync(path.join(srcDir, "app/layout.tsx"), "utf8");
    expect(layout).toContain("viewportChrome");
    expect(layout).toContain("export const viewport");
  });

  it("selects ink on a paper tint", () => {
    const css = readFileSync(path.join(srcDir, "app/globals.css"), "utf8");
    expect(css).toMatch(/::selection\s*\{[^}]*color:\s*var\(--ink\)/s);
    expect(css).toMatch(/::selection\s*\{[^}]*background:\s*var\(--hairline\)/s);
  });
});

describe("site typeface", () => {
  it("binds Geist Sans site-wide through --font-sans, not Inter", () => {
    const layout = readFileSync(path.join(srcDir, "app/layout.tsx"), "utf8");
    expect(layout).toContain('from "geist/font/sans"');
    expect(layout).toContain("GeistSans.variable");
    expect(layout).not.toMatch(/\bInter\b/);
    expect(layout).not.toContain("next/font/google");

    const css = readFileSync(path.join(srcDir, "app/globals.css"), "utf8");
    expect(css).toMatch(
      /--font-sans:\s*var\(--font-geist-sans\),\s*ui-sans-serif,\s*system-ui,\s*-apple-system,\s*"Segoe UI",\s*sans-serif/,
    );
    expect(css).toMatch(/html\s*\{[^}]*font-family:\s*var\(--font-sans\)/s);
    expect(css).toMatch(/body\s*\{[^}]*font-family:\s*var\(--font-sans\)/s);
    expect(css).not.toContain("--font-inter");
  });
});
