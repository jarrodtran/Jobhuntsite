# Craft Pass #3 — Rail Chrome, Reduced Motion, Focus, Closed Rows

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Craft-only polish after #17: solid rail chrome, reduced-motion snap, closed-row scan line, explicit focus-visible rings, and a quieter proof-strip value size — no IA rebuild.

**Architecture:** Extract two tiny class helpers (`withReducedMotionSnap`, `FOCUS_VISIBLE_CLASS`) so reduced-motion and focus can be unit-tested without matchMedia or visual snapshots. Keep the #17 `shouldShowScrollRail` rule. Closed-row markup stays on the existing accordion button; only the title/company/scope line changes.

**Tech Stack:** Next.js 15 (App Router, static export), React 19, Tailwind 4, TypeScript, existing Vitest + Testing Library harness from #17.

## Global Constraints

- Measure stays `min(52rem, 100%)` at ≥1024 (never raise `--measure`).
- `src/content.ts` prose and metrics locked — do not edit that file.
- `siteIndexable` stays `false`.
- No enrich, no typeface swap, no dark mode, no AI chrome, no IA rebuild.
- Do not touch `public/resume.pdf`.
- Rail show/hide stays the #17 rule: never coexist with the in-hero Resume.

---

### Task 1: Reduced-motion helper

**Files:**
- Create: `src/lib/motion.ts`
- Create: `src/lib/motion.test.ts`

**Interfaces:**
- Produces: `withReducedMotionSnap(animatedClass: string): string`

- [ ] **Step 1: Write the failing helper test**

`src/lib/motion.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { withReducedMotionSnap } from "@/lib/motion";

describe("withReducedMotionSnap", () => {
  it("keeps the 150ms animated classes for users who allow motion", () => {
    expect(
      withReducedMotionSnap("transition-transform duration-150 ease-soft"),
    ).toContain("duration-150");
  });

  it("adds motion-reduce:transition-none so reduced-motion users snap", () => {
    expect(
      withReducedMotionSnap("transition-transform duration-150 ease-soft"),
    ).toContain("motion-reduce:transition-none");
  });
});
```

- [ ] **Step 2: Run test to verify it fails** (`Cannot find module`)
- [ ] **Step 3: Minimal helper**

```ts
/** Keep 150ms height/translate; snap when prefers-reduced-motion: reduce. */
export function withReducedMotionSnap(animatedClass: string): string {
  return `${animatedClass} motion-reduce:transition-none`;
}
```

- [ ] **Step 4: Run test to verify it passes**
- [ ] **Step 5: Commit**

---

### Task 2: Focus-visible helper

**Files:**
- Create: `src/lib/focus.ts`
- Create: `src/lib/focus.test.ts`

**Interfaces:**
- Produces: `FOCUS_VISIBLE_CLASS` = `"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"`

- [ ] **Step 1: Write the failing helper test**
- [ ] **Step 2: Confirm fail**
- [ ] **Step 3: Export the class string**
- [ ] **Step 4: Confirm pass**
- [ ] **Step 5: Commit**

---

### Task 3: Rail chrome + reduced motion + focus on Resume

**Files:**
- Modify: `src/components/ui/ScrollRail.tsx`
- Modify: `src/components/ui/ScrollRail.test.tsx`
- Modify: `src/components/ui/CtaLink.tsx`
- Create: `src/components/ui/CtaLink.test.tsx`
- Modify: `src/components/sections/Fit.tsx`
- Create: `src/components/sections/Fit.test.tsx`

- [ ] **Step 1: Failing tests**
  - Rail has `z-50`, `bg-bg`, `border-b`, `border-hairline`
  - Rail has `motion-reduce:transition-none`
  - Rail Resume, CtaLink, and Fit `<a>` include `FOCUS_VISIBLE_CLASS` tokens
- [ ] **Step 2: Confirm fail**
- [ ] **Step 3: Apply helpers + `z-50` (keep `bg-bg` / hairline)**
- [ ] **Step 4: Confirm pass**
- [ ] **Step 5: Commit**

---

### Task 4: Closed rows + accordion snap + accordion focus

**Files:**
- Modify: `src/components/sections/ExperienceRows.tsx`
- Modify: `src/components/sections/ExperienceRows.test.tsx`

- [ ] **Step 1: Failing tests**
  - Closed row: title `font-semibold text-ink`, company `text-muted`, mid-dot on the same line, scope `line-clamp-1 text-muted`
  - Keep denser `py-2.5` / `min-h-11`
  - Accordion button has focus-visible classes
  - Panel + chevron have `motion-reduce:transition-none`
- [ ] **Step 2: Confirm fail**
- [ ] **Step 3: Mid-dot same-line title/company; `line-clamp-1` scope; apply helpers
- [ ] **Step 4: Confirm pass**
- [ ] **Step 5: Commit**

---

### Task 5: Proof strip value size

**Files:**
- Modify: `src/components/sections/ProofBand.tsx`
- Create: `src/components/sections/ProofBand.test.tsx`

- [ ] **Step 1: Failing test** — `[data-slot=metric]` is `text-base`, not `lg:text-xl` / `text-xl`
- [ ] **Step 2: Confirm fail**
- [ ] **Step 3: Change value class to `text-base`; leave labels as `text-label`
- [ ] **Step 4: Confirm pass**
- [ ] **Step 5: Commit**

---

### Task 6: Verification

- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm test`
- [ ] `NEXT_PUBLIC_BASE_PATH=/Jobhuntsite pnpm build`
- [ ] Confirm `siteIndexable=false`, `--measure` ≤52rem at ≥1024, `content.ts` hash unchanged
