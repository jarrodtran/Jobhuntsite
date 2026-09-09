# Craft Pass #2 — Desktop Scroll Rail + Optical Craft Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recruiter hire-now lift via interaction and optical craft only: a desktop (≥640) top scroll rail that appears only after hero CTAs leave the viewport, denser Experience accordion hit targets with locked a11y, and optical CTA/figure tweaks — no IA rebuild.

**Architecture:** Extract two pure helpers (`shouldShowScrollRail`, experience open-id reducers) so visibility and accordion state are unit-tested without jsdom gymnastics. Reuse the existing `#hero-resume` IntersectionObserver rule for both the mobile bottom `ResumeBar` and a new desktop top `ScrollRail`. Keep `ExperienceRows` as the only accordion client island; optical tweaks stay in class strings.

**Tech Stack:** Next.js 15 (App Router, static export), React 19, Tailwind 4, TypeScript, Vitest + Testing Library (new, interactive pieces only).

## Global Constraints

- Measure stays `min(52rem, 100%)` at ≥1024 (never raise `--measure`).
- `src/content.ts` prose and metrics locked — do not edit that file.
- `siteIndexable` stays `false`.
- No enrich, no typeface swap, no dark mode, no AI chrome.
- Do not touch `public/resume.pdf`.
- Skip-link already exists in `src/app/layout.tsx` — leave it.
- Hash/Fit links stay `#<experience-id>` and must still open the named row.

---

### Task 1: Pure helpers + Vitest harness

**Files:**
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/lib/stickyCta.ts`
- Create: `src/lib/experienceAccordion.ts`
- Create: `src/lib/stickyCta.test.ts`
- Create: `src/lib/experienceAccordion.test.ts`
- Modify: `package.json` (add `test` script + vitest/RTL/jsdom deps)

**Interfaces:**
- Consumes: nothing (new leaf modules)
- Produces:
  - `shouldShowScrollRail(isHeroCtaVisible: boolean): boolean`
  - `nextOpenExperienceId(currentOpenId: string | null, toggledId: string): string | null`
  - `experienceIdFromHash(hash: string, rowIds: readonly string[]): string | null`

- [ ] **Step 1: Add the lightest Vitest harness**

`package.json` scripts gain `"test": "vitest run"`. DevDependencies: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@vitejs/plugin-react`.

`vitest.config.ts`:

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
```

`src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 2: Write failing helper tests**

`src/lib/stickyCta.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { shouldShowScrollRail } from "@/lib/stickyCta";

describe("shouldShowScrollRail", () => {
  it("hides the rail while the hero CTA is intersecting", () => {
    expect(shouldShowScrollRail(true)).toBe(false);
  });

  it("shows the rail once the hero CTA leaves the viewport", () => {
    expect(shouldShowScrollRail(false)).toBe(true);
  });
});
```

`src/lib/experienceAccordion.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  experienceIdFromHash,
  nextOpenExperienceId,
} from "@/lib/experienceAccordion";

describe("nextOpenExperienceId", () => {
  it("opens the toggled row when it is closed", () => {
    expect(nextOpenExperienceId("tesla-ai", "apple-india")).toBe("apple-india");
  });

  it("closes the row when it is already open", () => {
    expect(nextOpenExperienceId("tesla-ai", "tesla-ai")).toBe(null);
  });
});

describe("experienceIdFromHash", () => {
  const ids = ["tesla-ai", "tesla-4680", "apple-india"] as const;

  it("opens the row named by the hash (Fit / shared URL)", () => {
    expect(experienceIdFromHash("#tesla-4680", ids)).toBe("tesla-4680");
  });

  it("ignores hashes that are not experience ids", () => {
    expect(experienceIdFromHash("#nope", ids)).toBe(null);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — `shouldShowScrollRail` / accordion helpers are not defined.

- [ ] **Step 4: Write minimal helpers**

`src/lib/stickyCta.ts`:

```ts
/** Same rule as the mobile Resume bar: rail only while the hero CTA is off-screen. */
export function shouldShowScrollRail(isHeroCtaVisible: boolean): boolean {
  return !isHeroCtaVisible;
}
```

`src/lib/experienceAccordion.ts`:

```ts
export function nextOpenExperienceId(
  currentOpenId: string | null,
  toggledId: string,
): string | null {
  return currentOpenId === toggledId ? null : toggledId;
}

export function experienceIdFromHash(
  hash: string,
  rowIds: readonly string[],
): string | null {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  return id && rowIds.includes(id) ? id : null;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `pnpm test`
Expected: PASS (helper file only).

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts src/test/setup.ts \
  src/lib/stickyCta.ts src/lib/stickyCta.test.ts \
  src/lib/experienceAccordion.ts src/lib/experienceAccordion.test.ts
git commit -m "test: add vitest helpers for scroll rail and accordion"
```

---

### Task 2: Experience accordion a11y + denser closed rows

**Files:**
- Modify: `src/components/sections/ExperienceRows.tsx`
- Create: `src/components/sections/ExperienceRows.test.tsx`

**Interfaces:**
- Consumes: `nextOpenExperienceId`, `experienceIdFromHash`
- Produces: closed rows with denser `py` + `min-h-11` hit target; `aria-expanded`; native button Enter/Space; 150ms panel; 2px ink focus (global); hash still opens the named row

- [ ] **Step 1: Write failing component tests**

Fixture: two rows, first `defaultOpen`. Assert:

1. Default-open row `aria-expanded="true"`; other `false`.
2. Click closed row → that button `aria-expanded="true"`; previous `false`.
3. Enter on the open button closes it (`aria-expanded="false"`).
4. Space on a closed button opens it.
5. `window.location.hash = "#row-b"` + `hashchange` opens `row-b`.

- [ ] **Step 2: Run tests — they fail until the component uses the helpers and keyboard still works**

If click/keyboard already pass (native `<button>`), keep the tests as the lock. Wire helpers so hash/toggle go through the tested functions.

- [ ] **Step 3: Implement**

Closed button classes: `py-2.5 min-h-11 lg:py-3` (was `py-3.5 lg:py-4`). Keep hairline + chevron. Chevron `self-center` (clearer hit). Open panel unchanged: product card, `duration-150`, `grid-template-rows` + opacity. `onClick` uses `nextOpenExperienceId`. Hash effect uses `experienceIdFromHash`. Do not add a custom key handler — `<button>` already does Enter/Space.

- [ ] **Step 4: Run `pnpm test` — PASS**

- [ ] **Step 5: Commit**

```bash
git commit -m "feat: denser experience rows with tested accordion a11y"
```

---

### Task 3: Desktop scroll rail (≥640)

**Files:**
- Create: `src/components/ui/ScrollRail.tsx`
- Create: `src/components/ui/ScrollRail.test.tsx`
- Modify: `src/components/ui/ResumeBar.tsx` (share observer + `shouldShowScrollRail`)
- Create: `src/lib/useHeroCtaVisibility.ts`
- Modify: `src/components/sections/Hero.tsx` (mount `ScrollRail`)

**Interfaces:**
- Consumes: `shouldShowScrollRail(isHeroCtaVisible)`
- Produces: `useHeroCtaVisibility(watchId, rootMargin)` → `boolean` (true = CTA intersecting)
- ScrollRail: `hidden` below 640; `fixed top` thin bar (wordmark + solid Resume) at ≥640; visible only when `shouldShowScrollRail` is true

- [ ] **Step 1: Write failing ScrollRail tests**

Mock `IntersectionObserver`. Render a `#hero-resume` target + `<ScrollRail watchId="hero-resume" …>`.

- First IO callback `isIntersecting: true` → rail `aria-hidden="true"`, `sm:` classes present, no coexistence (in-hero Resume still in document).
- Callback `isIntersecting: false` → `aria-hidden="false"`, Resume CTA inside the rail, wordmark text present.

- [ ] **Step 2: Run — FAIL (ScrollRail missing)**

- [ ] **Step 3: Implement hook + ScrollRail + wire Hero**

Observer: `threshold: 0`. Mobile bar keeps `rootMargin: 0px 0px -48px 0px`. Desktop rail uses `rootMargin: -48px 0px 0px 0px` (own height). Both call `shouldShowScrollRail(entry.isIntersecting)`.

ScrollRail markup: `data-component="scroll-rail"`, `fixed inset-x-0 top-0 z-40 hidden sm:block`, `h-12`, `border-b border-hairline bg-bg`, measure shell, wordmark (`navView`) + solid `CtaLink`. Hidden state: `-translate-y-full`, `aria-hidden`, Resume `tabIndex={-1}`. 150ms transform. Server-rendered hidden.

- [ ] **Step 4: `pnpm test` PASS**

- [ ] **Step 5: Commit**

```bash
git commit -m "feat: desktop scroll rail after hero CTAs leave view"
```

---

### Task 4: Optical craft (figure + CTAs)

**Files:**
- Modify: `src/components/ui/ProofChips.tsx` — grid `sm:items-baseline`; lead cell `sm:justify-start` so `$260M` shares a baseline with the first pair value
- Modify: `src/components/sections/Hero.tsx` — CTA row `gap-3 sm:gap-4`; Resume `sm:min-w-36`
- Modify: `src/components/ui/CtaLink.tsx` — ghost `border border-hairline hover:border-ink hover:text-ink`; no scale; drop the ink-wash hover
- Modify: `src/app/globals.css` + `README.md` — document `scroll-rail` hook; do not change `--measure`

**Interfaces:**
- Consumes: existing tokens (`border-hairline`, `text-ink`)
- Produces: no new JS API

- [ ] **Step 1: Apply class-only optical edits (no content.ts)**

- [ ] **Step 2: Confirm `content.ts` hash unchanged; `--measure` still `min(52rem, 100%)` at ≥1024**

- [ ] **Step 3: Commit**

```bash
git commit -m "style: baseline figure cell and stable CTA hover"
```

---

### Task 5: Verification

Run and paste:

- `pnpm lint`
- `pnpm exec tsc --noEmit`
- `NEXT_PUBLIC_BASE_PATH=/Jobhuntsite pnpm build`
- `pnpm test`
- Confirm `siteIndexable=false` and `noindex` in export
- Confirm `content.ts` git hash unchanged
- Confirm `--measure` ≤52rem at ≥1024
- Browser 375 and ≥640: rail / mobile sticky / accordion keyboard

Do not merge.
