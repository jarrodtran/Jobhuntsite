import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { sectionShellClass } from "@/components/layout/Section";

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readSrc(relative: string): string {
  return readFileSync(path.join(srcDir, relative), "utf8");
}

function measureInBlock(block: string): string {
  const match = block.match(/--measure:\s*([^;]+);/);
  if (!match) {
    throw new Error("missing --measure in block");
  }
  return match[1].trim();
}

function mediaRoot(css: string, minWidthPx: number): string {
  const match = css.match(
    new RegExp(
      `@media \\(min-width: ${minWidthPx}px\\) \\{\\s*:root \\{([\\s\\S]*?)\\n  \\}`,
    ),
  );
  if (!match) {
    throw new Error(`missing :root inside ${minWidthPx}px media query`);
  }
  return match[1];
}

describe("measure tokens", () => {
  const css = readSrc("app/globals.css");

  it("keeps the page column full width under 640px", () => {
    const root = css.match(/:root\s*\{([\s\S]*?)\n\}/);
    if (!root) {
      throw new Error("missing :root block");
    }
    expect(measureInBlock(root[1])).toBe("100%");
  });

  it("keeps the mid breakpoint at 44rem", () => {
    expect(measureInBlock(mediaRoot(css, 640))).toBe("min(44rem, 100%)");
  });

  it("raises the ≥1024 measure to 56rem (896px) and does not ship 60rem", () => {
    expect(measureInBlock(mediaRoot(css, 1024))).toBe("min(56rem, 100%)");
    expect(css).not.toMatch(/--measure:\s*min\(60rem/);
    expect(css).not.toMatch(/--measure:\s*min\(52rem/);
  });

  it("binds max-w-content to --measure only", () => {
    expect(css).toMatch(/--container-content:\s*var\(--measure\)/);
    expect(sectionShellClass).toContain("max-w-content");
    expect(sectionShellClass).toContain("w-full");
    expect(sectionShellClass).toContain("px-5");
  });

  it("holds section gap and rail width at ≥1024", () => {
    const desktop = mediaRoot(css, 1024);
    expect(desktop).toMatch(/--section-gap:\s*6rem;/);
    expect(desktop).toMatch(/--rail:\s*8rem;/);
    expect(css).toMatch(/--section-gap:\s*5rem;/);
    expect(css).toMatch(/--rail:\s*7rem;/);
  });
});

describe("measure scale locks", () => {
  it("keeps the hero stacked and the name at text-5xl", () => {
    const hero = readSrc("components/sections/Hero.tsx");
    expect(hero).toMatch(
      /data-slot="name"[\s\S]*className="text-5xl font-semibold leading-none tracking-tighter"/,
    );
    expect(hero).not.toMatch(/lg:grid-cols-2/);
    expect(hero).not.toMatch(/lg:grid-cols-\[/);
  });

  it("keeps $260M at text-6xl and widens the pair column to 16rem at ≥1024", () => {
    const chips = readSrc("components/ui/ProofChips.tsx");
    expect(chips).toContain("lg:grid-cols-[1fr_16rem]");
    expect(chips).not.toContain("lg:grid-cols-[1fr_15rem]");
    expect(chips).toMatch(
      /lead[\s\S]*\? "text-5xl font-bold tracking-tighter lg:text-6xl"/,
    );
  });

  it("keeps the open experience panel at p-6 on the unchanged rail", () => {
    const rows = readSrc("components/sections/ExperienceRows.tsx");
    expect(rows).toContain('open ? "p-5 lg:p-6"');
    expect(rows).toContain("sm:grid-cols-[var(--rail)_1fr_auto]");
  });
});
