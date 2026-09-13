import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  ANCHOR_OFFSET_CLASS,
  CHROME_HEIGHT_PX,
  THEME_COLOR,
  viewportChrome,
} from "@/lib/chrome";

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const PAPER = "#F5F0E6";
const INK = "#1C1A17";
const MUTED = "#534E46";
const HAIRLINE = "#E4D9C8";
const SURFACE = "#FFFDF8";

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
  it("sets theme-color to paper #F5F0E6", () => {
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

  it("opens every experience panel when a recruiter prints", () => {
    const css = readFileSync(path.join(srcDir, "app/globals.css"), "utf8");
    expect(css).toMatch(/@media print/);
    expect(css).toMatch(/\[data-slot="panel"\]/);
  });
});

describe("save-to-PDF", () => {
  const css = readFileSync(path.join(srcDir, "app/globals.css"), "utf8");
  const printBlock = (() => {
    const match = css.match(/@media print \{([\s\S]*)\n\}/);
    if (!match) throw new Error("missing @media print block");
    return match[1];
  })();

  it("drops the CTAs, the nav, and the chevrons from paper", () => {
    // Chrome prints with background graphics off by default, which leaves the
    // ink-filled Resume pill as an empty box holding cream text on white.
    expect(printBlock).toMatch(/\[data-component="site-header"\]/);
    expect(printBlock).toMatch(/\[data-slot="ctas"\] \[data-cta\]/);
    expect(printBlock).toMatch(/\[data-entry\] svg/);
  });

  it("keeps a role on one page and its header with its bullets", () => {
    expect(printBlock).toMatch(/\[data-entry\]\s*\{\s*break-inside: avoid/);
    expect(printBlock).toMatch(/break-after: avoid/);
  });

  it("prints the LinkedIn URL, since paper has nothing to click", () => {
    expect(printBlock).toMatch(
      /footer \[data-cta="linkedin"\]::after \{\s*content: " — " attr\(href\)/,
    );
  });

  it("sets page margins", () => {
    expect(css).toMatch(/@page \{\s*margin: [\d.]+in;/);
  });
});

describe("in-page anchors", () => {
  it("clears the fixed rail so a clicked heading is not tucked under it", () => {
    // scroll-mt-8 is 32px, under the 48px rail: the old offset left the
    // Experience heading 17px beneath it. sm:scroll-mt-20 is 80px.
    expect(CHROME_HEIGHT_PX).toBe(48);
    expect(ANCHOR_OFFSET_CLASS).toBe("scroll-mt-8 sm:scroll-mt-20");

    const remToPx = (value: string) => Number(value) * 4;
    const desktopOffset = remToPx(
      ANCHOR_OFFSET_CLASS.match(/sm:scroll-mt-(\d+)/)?.[1] ?? "0",
    );
    expect(desktopOffset).toBeGreaterThan(CHROME_HEIGHT_PX);
  });

  it("is the one offset sections and experience rows both use", () => {
    const section = readFileSync(
      path.join(srcDir, "components/layout/Section.tsx"),
      "utf8",
    );
    const rows = readFileSync(
      path.join(srcDir, "components/sections/ExperienceRows.tsx"),
      "utf8",
    );

    expect(section).toContain("ANCHOR_OFFSET_CLASS");
    expect(rows).toContain("ANCHOR_OFFSET_CLASS");
    expect(section).not.toMatch(/"scroll-mt-8"/);
    expect(rows).not.toMatch(/"scroll-mt-8"/);
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

  it("keeps the sheet slightly lighter than paper and ink-aligns the 1px card shadow", () => {
    expect(tokenValue(css, "surface").toLowerCase()).toBe(SURFACE.toLowerCase());
    expect(tokenValue(css, "card-shadow")).toBe("0 1px 0 rgb(28 26 23 / 0.04)");
  });

  it("gives muted ~6:1 contrast on the new paper (WCAG AA)", () => {
    const paper = tokenValue(css, "bg");
    const muted = tokenValue(css, "muted");
    expect(muted.toLowerCase()).toBe(MUTED.toLowerCase());
    const ratio = contrastRatio(muted, paper);
    expect(ratio).toBeGreaterThanOrEqual(4.5);
    expect(ratio).toBeGreaterThanOrEqual(5.5);
  });

  it("underlines links with a rule a reader can actually see", () => {
    // --hairline is 1.23:1 on paper. As the only thing marking a word as a
    // link — and with no hover on touch — that is invisible, so the Where-I-fit
    // jump links and the footer email read as plain text. WCAG 1.4.11 wants 3:1
    // for a non-text indicator.
    const rule = tokenValue(css, "rule");
    expect(contrastRatio(rule, tokenValue(css, "bg"))).toBeGreaterThanOrEqual(3);
    expect(contrastRatio(rule, tokenValue(css, "surface"))).toBeGreaterThanOrEqual(3);
    expect(contrastRatio(tokenValue(css, "hairline"), tokenValue(css, "bg"))).toBeLessThan(3);

    expect(css).toMatch(
      /@utility link \{[^}]*text-decoration-color:\s*var\(--rule\)/s,
    );
    expect(css).toMatch(/--color-rule:\s*var\(--rule\)/);
  });
});

describe("site typeface", () => {
  it("binds Geist Sans site-wide through --font-sans, not Inter", () => {
    const layout = readFileSync(path.join(srcDir, "app/layout.tsx"), "utf8");
    expect(layout).toContain('from "geist/font/sans"');
    expect(layout).toContain("GeistSans.variable");
    expect(layout).not.toMatch(/\bInter\b/);

    const css = readFileSync(path.join(srcDir, "app/globals.css"), "utf8");
    expect(css).toMatch(
      /--font-sans:\s*var\(--font-geist-sans\),\s*ui-sans-serif,\s*system-ui,\s*-apple-system,\s*"Segoe UI",\s*sans-serif/,
    );
    expect(css).toMatch(/html\s*\{[^}]*font-family:\s*var\(--font-sans\)/s);
    expect(css).toMatch(/body\s*\{[^}]*font-family:\s*var\(--font-sans\)/s);
    expect(css).not.toContain("--font-inter");
  });

  it("loads Instrument Serif only as the display face for the fold name", () => {
    const layout = readFileSync(path.join(srcDir, "app/layout.tsx"), "utf8");
    expect(layout).toContain('from "next/font/google"');
    expect(layout).toContain("Instrument_Serif");
    expect(layout).toContain("--font-instrument-serif");
    expect(layout).not.toMatch(/\bInter\b/);

    const css = readFileSync(path.join(srcDir, "app/globals.css"), "utf8");
    expect(css).toMatch(/--font-display:\s*var\(--font-instrument-serif\)/);

    const hero = readFileSync(
      path.join(srcDir, "components/sections/Hero.tsx"),
      "utf8",
    );
    expect(hero).toMatch(/data-slot="name"[\s\S]*font-display/);
  });
});
