# Craft Pass #4 — Safe Area, Hover, Press, Chrome Match

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Micro chrome polish after #18 / craft #3: safe-area padding on sticky chrome, closed-row hover, CTA press, theme-color + selection, and tabular-nums on the open Experience panel list — no IA rebuild.

**Architecture:** Extract `THEME_COLOR` / `viewportChrome` so theme-color is unit-tested without importing `next/font`. Hover, press, safe-area, and tabular-nums stay in class strings and `globals.css`, asserted via RTL class hooks.

**Tech Stack:** Next.js 15 (App Router, static export), React 19, Tailwind 4, TypeScript, existing Vitest + Testing Library harness.

## Global Constraints

- Measure stays `min(52rem, 100%)` at ≥1024 (never raise `--measure`).
- `src/content.ts` prose and metrics locked — do not edit that file.
- `siteIndexable` stays `false`.
- No enrich, no typeface swap, no dark mode, no AI chrome, no IA rebuild.
- Do not touch `public/resume.pdf`.
- Keep #3 focus-visible rings and #17 rail show/hide rule.

---

### Task 1: theme-color + selection

**Files:**
- Create: `src/lib/chrome.ts`
- Create: `src/lib/chrome.test.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [x] **Step 1: Failing tests** — `THEME_COLOR` `#F7F6F3`, layout wires `viewportChrome`, `::selection` is ink on a paper tint
- [x] **Step 2: Confirm fail** (`Cannot find module` / no `::selection`)
- [x] **Step 3: Export viewport chrome; add `::selection`**
- [x] **Step 4: Confirm pass**

---

### Task 2: Safe area on bar + rail

**Files:**
- Create: `src/components/ui/ResumeBar.test.tsx`
- Modify: `src/components/ui/ScrollRail.tsx`
- Modify: `src/components/ui/ScrollRail.test.tsx`

- [x] **Step 1: Failing tests** — bar has `env(safe-area-inset-bottom)` + inner `h-12`; rail has `env(safe-area-inset-top)` + inner `h-12`
- [x] **Step 2: Confirm fail** (rail missing top inset; bar already padded)
- [x] **Step 3: `pt-[env(safe-area-inset-top)]` on the rail wrapper**
- [x] **Step 4: Confirm pass**

---

### Task 3: Closed-row hover + panel tabular-nums

**Files:**
- Modify: `src/components/sections/ExperienceRows.tsx`
- Modify: `src/components/sections/ExperienceRows.test.tsx`

- [x] **Step 1: Failing tests** — closed row `hover:bg-white` + `hover:border-ink` + `duration-150` + `motion-reduce:transition-none`, no scale; open `[data-slot=bullets]` has `tabular-nums`
- [x] **Step 2: Confirm fail**
- [x] **Step 3: Hover classes on the closed `<li>`; `className="tabular-nums"` on panel `Bullets`
- [x] **Step 4: Confirm pass**

---

### Task 4: CTA press

**Files:**
- Modify: `src/components/ui/CtaLink.tsx`
- Modify: `src/components/ui/CtaLink.test.tsx`
- Modify: `src/components/ui/ScrollRail.tsx`
- Modify: `src/components/ui/ScrollRail.test.tsx`

- [x] **Step 1: Failing tests** — solid + ghost + rail Resume have `active:opacity-90`; focus-visible classes remain
- [x] **Step 2: Confirm fail**
- [x] **Step 3: Add `active:opacity-90`**
- [x] **Step 4: Confirm pass**

---

### Task 5: Verification

- [ ] `pnpm lint`
- [ ] `pnpm exec tsc --noEmit`
- [ ] `pnpm test`
- [ ] `NEXT_PUBLIC_BASE_PATH=/Jobhuntsite pnpm build`
- [ ] Confirm `siteIndexable=false`, `--measure` ≤52rem at ≥1024, `content.ts` hash unchanged
