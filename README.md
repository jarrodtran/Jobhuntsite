# Jarrod Tran — personal site

Minimalist single-page site for the job hunt: AI enablement strategy and ops, business operations, chief of staff, and VC platform roles. Recruiters get title, employers, scoped proof, and a resume link in the first viewport. Hiring managers get role fit and experience on scroll.

Content is locked (Copy v1) and the site is served `noindex` until `siteIndexable` is flipped. The visual bar is an operator memo, not a portfolio: warm paper, one `$260M` figure block, hairline rules, one white product panel. The structure exposes stable hooks so further retuning does not need markup changes.

## Local development

Requires Node 22 and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm lint
pnpm build
```

`pnpm build` writes a static site to `out/`. To preview the GitHub Pages path locally:

```bash
NEXT_PUBLIC_BASE_PATH=/Jobhuntsite pnpm build
pnpm dlx serve out
```

Then open `http://localhost:3000/Jobhuntsite/`.

## Architecture

One page, one direction of data flow:

```
src/content.ts          Copy-owned data. Every word on the site.
      │
src/lib/schema.ts       Eng-owned types for that data.
src/lib/selectors.ts    Render-ready views: blanks dropped, primary role first,
      │                 experience ids resolved, basePath applied. Validates
      │                 content at build time.
src/lib/url.ts          The only module that reads NEXT_PUBLIC_BASE_PATH.
      │
src/components/         Dumb renderers. Import from @/lib/selectors only.
  layout/               SiteHeader, Section (shared shell + <h2>), SiteFooter
  sections/             Hero, ProofBand, Experience (+ ExperienceRows, client), Fit
  ui/                   CtaLink, ProofChips, ResumeBar (client), EmployerRow, Bullets,
                        card (shared classes)
      │
src/app/page.tsx        Composes sections in scan-path order.
src/app/layout.tsx      <title>, OG, Twitter, JSON-LD, robots — all from seoView.
src/app/globals.css     Design tokens (palette, column, rhythm, motion) + hooks.
```

**Recruiter scan path** (top to bottom, per FE Designer spec): Hero (name → title → voice whisper → the `$260M` figure block with the secondary pair → Resume solid + LinkedIn ghost → one muted employer line) → Proof strip (three secondary metrics between hairline rules; not a nav section) → Experience (primary scan path; list-like rows, current role open as the product panel) → Where I fit (one line of text links to the backing experience rows, primary first) → Footer (email + LinkedIn). `sectionOrder` in `selectors.ts` drives the header nav; `page.tsx` renders in the same order. Under 640px a fixed h-12 Resume bar (`ResumeBar`) rides the bottom edge only while the hero's own Resume button is off-screen (below the fold on a short phone, or scrolled away), so the two never coexist.

**Experience accordion.** `ExperienceRows` and `ResumeBar` are the only client components. Closed row = dates + title + company + scope line with a hairline underneath, no padding beyond the column; open row = the product panel: white card, 1.25rem padding, the 7rem date column (`--rail`) as its left rail, bullets aligned to the title column. One row open at a time at every width; the current role (`end` is a word such as "Present") is open on first paint and server-rendered, so the page reads correctly before hydration. A `#<experience-id>` hash (the Fit links, or a shared URL) opens that row. Under 640px dates stack above the title and the panel runs edge to edge. Motion is 150ms on `grid-template-rows` (height), opacity, and the chevron rotation.

**Ownership.** Copy edits `src/content.ts` and nothing else. Eng owns `src/lib`. FE Designer owns `src/app/globals.css` and the class strings inside `src/components`; the markup exposes stable hooks (`data-section`, `data-slot`, `data-role`, `data-primary`, `data-entry`, `data-cta`) so a visual overhaul does not need to change structure.

**Content validation.** `selectors.ts` throws during `next build` if a role has no (or more than one) `primary`, an `experienceIds` entry points at an unknown `id`, or a required contact field is blank. A typo cannot ship.

## Editing content

All copy lives in [`src/content.ts`](src/content.ts). Types are in [`src/lib/schema.ts`](src/lib/schema.ts). Components never import content directly, so prose, metric, and ordering changes should never require touching `src/components`.

| Export | What it drives |
| --- | --- |
| `hero.name`, `title`, `voiceLine` | Hero identity and first-person positioning line. Also `<title>`, OG title/description, and JSON-LD `jobTitle` |
| `hero.proofChips` | The figure block under the voice line. The first chip is the lead figure (`text-5xl`); the rest are the secondary pair in ruled cells. `metric` is optional; leave it out when there is no defensible number |
| `proofBand` | Secondary metrics in the full-bleed strip under the hero. Same shape as a chip; every figure must already appear in `experience`. Hidden when empty |
| `hero.employers` | Pedigree row. Hidden when empty |
| `roles` | "Where I fit" text links. The one `primary: true` role renders first with the badge. Each link points at the first entry in `experienceIds` (a role with none renders as plain text). `summary`, `evidence`, and `audiences` are stored and validated but not rendered — proof lives in Experience bullets |
| `experience` | Accordion rows. `id` is the anchor target and the key `Role.experienceIds` points at. Lead with an outcome-led bullet. `location` and `scopeLine` are optional; `url` is stored, not rendered |
| `contact.email`, `linkedin` | Footer links. `resumePdf` drives the hero Resume CTA |
| `contact.location`, `github`, `availability`, `clearance` | Stored, not rendered (footer is email + LinkedIn only) |
| `site.origin`, `lang`, `ogImage` | Canonical origin, `<html lang>`, and OG image path/dimensions |
| `sections` | Heading, anchor id, and nav label per section |
| `ui` | Every non-content string: CTA labels, badge text, a11y labels, date separator |

Placeholders are written as `TODO_COPY: hint` via the `todo()` helper. Blank or omitted optional fields (for example `location`) are never rendered — the selectors drop them before components see them. Indexing is gated twice: the site is served with `robots: noindex, nofollow` while any `TODO_COPY` remains anywhere in the content, and also while `siteIndexable` in `src/content.ts` is `false`. Flip `siteIndexable` to `true` only when the metrics and title are locked and the real `public/resume.pdf` is in place.

[`public/resume.pdf`](public/resume.pdf) is the site-aligned one-pager. Replace [`public/og.png`](public/og.png) when the visual design lands; the OG tags already read title and description from `hero`, so only the image file needs to change (keep 1200×630 or update `site.ogImage`).

## Styling and extension points

[`src/app/globals.css`](src/app/globals.css) is the visual surface. Type is Inter on Tailwind's default scale with two weights that matter (semibold/bold) and muted for everything else: name `text-5xl` semibold `tracking-tighter`; title `text-base` muted; voice `text-sm` muted; lead figure `text-5xl` bold tabular `tracking-tighter`; pair `text-2xl` semibold; proof strip `text-lg` semibold; experience titles semibold; every label (section headings, figure labels, the Fit badge) is `text-label` 11px semibold uppercase `tracking-label`. Everything else is a token:

| Token | Utility | Value / used for |
| --- | --- | --- |
| `--bg`, `--ink`, `--muted`, `--hairline`, `--accent` | `bg-bg`, `text-ink`, `text-muted`, `border-hairline`, `bg-accent` | Warm paper `#F7F6F3`, ink `#111`, muted `#5F5B56`, hairline `#E7E5E4`, accent (solid-CTA hover) `#000` |
| `--surface` | `bg-surface` | White. The only surface besides paper: the `$260M` block and the open experience panel |
| `--card-shadow`, `--card-radius` | `shadow-card`, `rounded-card` | `0 1px 0 rgb(17 17 17 / 0.04)`; 0.5rem. Shared via `cardClass` / `bleedCardClass` (edge-to-edge under 640px) in `src/components/ui/card.ts` |
| `--text-label`, `--tracking-label` | `text-label`, `tracking-label` | 11px / 1rem line height; 0.14em |
| `--font-inter` → `--font-sans` | body default | Inter with `system-ui` fallback; sans only |
| `--container-content`, `--container-voice` | `max-w-content`, `max-w-voice` | 40rem page column; 60ch voice line (one line at desktop) |
| `--spacing-section` | `mt-section` | 5rem gap between sections. Hero→proof strip is 2.5rem (`mt-10`) and strip→Experience 3rem (`Section spacing="tight"`) |
| `--rail` | `sm:grid-cols-[var(--rail)_1fr_auto]`, `sm:pl-[calc(1.25rem+var(--rail)+1rem)]` | 7rem experience date column; inside the open panel it is the left rail the bullets clear |
| `--motion-duration`, `--motion-ease` | default transition, `ease-soft` | 150ms ease; only the accordion (grid rows, opacity, chevron) and the mobile Resume bar (translate) animate. `prefers-reduced-motion` collapses it |

Page padding is `px-5 md:px-8` (1.25rem → 2rem at ≥768) on the shared shell in `Section.tsx`. Hovers are flat colour swaps with no transition; focus rings are 2px ink, offset 2. The `link` utility styles inline text links. Markup hooks for targeted styling: `[data-section]`, `[data-component="site-header" | "proof-band" | "resume-bar"]`, `[data-slot]`, `[data-lead]`, `[data-role][data-primary]`, `[data-entry][data-open]`, `[data-cta][data-variant]`.

## Deploy (GitHub Pages)

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds with `NEXT_PUBLIC_BASE_PATH=/Jobhuntsite` and deploys `out/` on pushes to `main`. Pull requests lint and build only.

The workflow enables Pages (source: GitHub Actions) on first deploy. GitHub Pages on a **private** repo still needs GitHub Pro or Team; this repo is public, so the site can go live.

Site URL after a successful deploy: `https://jarrodtran.github.io/Jobhuntsite/`.

### Custom domain

A custom domain (recommended for a job hunt) drops the `/Jobhuntsite` prefix:

1. Add `public/CNAME` containing the domain.
2. In the workflow, set `NEXT_PUBLIC_BASE_PATH` to empty (`NEXT_PUBLIC_BASE_PATH: ""` or remove the env var).
3. Point DNS at GitHub Pages and set the custom domain in repo Settings → Pages.

[`src/lib/url.ts`](src/lib/url.ts) is the only module that reads `NEXT_PUBLIC_BASE_PATH`. `asset()` prefixes public-folder paths (`resume.pdf`, `og.png`) for raw `<a href>` and metadata; `siteUrl` is the canonical homepage URL. Do not use `asset()` with `next/link`.

## What this shell is not (Phase 2+)

Deferred until real copy exists:

- Analytics (Plausible or Umami), added the day content ships
- HTML `/resume` print route
- Indexing (`robots` stays noindex until `siteIndexable` is flipped to `true` and no `TODO_COPY` remains)
- Case studies, writing, or per-audience (`?for=`) highlight ordering
- A “coming soon” work grid — never ship an empty one
