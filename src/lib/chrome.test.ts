import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { THEME_COLOR, viewportChrome } from "@/lib/chrome";

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const PAPER = "#F4F4F5";
const INK = "#0A0A0A";
const MUTED = "#52525B";
const HAIRLINE = "#E4E4E7";

function firstRootDeclarations(css: string): string {
  const block = css.match(/:root\s*\{([\s\S]*?)\n\}/);
  if (!block) {
    throw new Error("missing :root block");
  }
  return block[1];
}

function tokenValue(css: string, name: string): string {
  const match = firstRootDeclarations(css).match(
    new RegExp(`--${name}:\\s*([^;]+);`),
  );
  if (!match) {
    throw new Error(`missing --${name}`);
  }
  return match[1].trim();
}

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "").toLowerCase();
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : normalized;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function relativeLuminance(hex: string): number {
  const channel = (value: number) => {
    const s = value / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [relativeLuminance(foreground), relativeLuminance(background)]
    .sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

describe("browser chrome", () => {
  it("sets theme-color to paper #F4F4F5", () => {
    expect(THEME_COLOR).toBe(PAPER);
    expect(viewportChrome.themeColor).toBe(PAPER);
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

describe("contrast tokens", () => {
  const css = readFileSync(path.join(srcDir, "app/globals.css"), "utf8");

  it("replaces :root paper/ink/muted/hairline without adding a theme", () => {
    expect(tokenValue(css, "bg").toLowerCase()).toBe(PAPER.toLowerCase());
    expect(tokenValue(css, "ink").toLowerCase()).toBe(INK.toLowerCase());
    expect(tokenValue(css, "muted").toLowerCase()).toBe(MUTED.toLowerCase());
    expect(tokenValue(css, "hairline").toLowerCase()).toBe(HAIRLINE.toLowerCase());
    expect(css).not.toMatch(/\[data-theme|prefers-color-scheme:\s*dark|--bg-dark/);
  });

  it("keeps cards white and ink-aligns the 1px card shadow", () => {
    expect(tokenValue(css, "surface").toLowerCase()).toBe("#ffffff");
    expect(tokenValue(css, "card-shadow")).toBe("0 1px 0 rgb(10 10 10 / 0.04)");
  });

  it("gives muted ~6:1 contrast on the new paper (WCAG AA)", () => {
    const paper = tokenValue(css, "bg");
    const muted = tokenValue(css, "muted");
    expect(muted.toLowerCase()).toBe(MUTED.toLowerCase());
    const ratio = contrastRatio(muted, paper);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
    expect(ratio).toBeGreaterThanOrEqual(5.5);
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
