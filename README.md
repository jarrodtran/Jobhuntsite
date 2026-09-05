# Jarrod Tran — personal site

Minimalist single-page site for the job hunt: AI enablement strategy and ops, business operations, chief of staff, and VC platform roles. Recruiters get title, employers, scoped proof, and a resume link in the first viewport. Hiring managers get role fit and experience on scroll.

Content is locked (Copy v1) and the site is served `noindex` until `siteIndexable` is flipped. The visual pass (chip cards, proof band, timeline rail) is in; the structure exposes stable hooks so further retuning does not need markup changes.

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
  ui/                   CtaLink, ProofChips, EmployerRow, Bullets, card (shared classes)
      │
src/app/page.tsx        Composes sections in scan-path order.
src/app/layout.tsx      <title>, OG, Twitter, JSON-LD, robots — all from seoView.
src/app/globals.css     Design tokens (palette, column, rhythm, motion) + hooks.
```

**Recruiter scan path** (top to bottom, per FE Designer spec): Hero (name → title → voice → featured `$` chip + pair → Resume solid + LinkedIn ghost → employer strip) → Proof band (full-bleed stone strip, three secondary metrics split by hairlines; not a nav section) → Experience (primary scan path; accordion rows, current role open as a card) → Where I fit (one compact row of low-contrast role chips, primary badge on the primary role only) → Footer (email + LinkedIn). `sectionOrder` in `selectors.ts` drives the header nav; `page.tsx` renders in the same order.

**Experience accordion.** `ExperienceRows` is the only client component. Closed row = dates + title + company + scope line, flat with a hairline underneath; open row = the locked bullets inside a white card (same treatment as the featured chip). One row open at a time at every width; the current role (`end` is a word such as "Present") is open on first paint and server-rendered, so the page reads correctly before hydration. Under 640px dates stack above the title and the open card bleeds 1rem into the gutter; from 640px a hairline rail runs down the left with a 7rem date column (`--rail`) beside it. Motion is 150ms on `grid-template-rows` (height), opacity, and the chevron rotation.

**Ownership.** Copy edits `src/content.ts` and nothing else. Eng owns `src/lib`. FE Designer owns `src/app/globals.css` and the class strings inside `src/components`; the markup exposes stable hooks (`data-section`, `data-slot`, `data-role`, `data-primary`, `data-entry`, `data-cta`) so a visual overhaul does not need to change structure.

**Content validation.** `selectors.ts` throws during `next build` if a role has no (or more than one) `primary`, an `experienceIds` entry points at an unknown `id`, or a required contact field is blank. A typo cannot ship.

## Editing content

All copy lives in [`src/content.ts`](src/content.ts). Types are in [`src/lib/schema.ts`](src/lib/schema.ts). Components never import content directly, so prose, metric, and ordering changes should never require touching `src/components`.

| Export | What it drives |
| --- | --- |
| `hero.name`, `title`, `voiceLine` | Hero identity and first-person positioning line. Also `<title>`, OG title/description, and JSON-LD `jobTitle` |
| `hero.proofChips` | Chips under the voice line. The first chip renders as the featured card (money leads); the rest as the pair. `metric` is optional; leave it out when there is no defensible number |
| `proofBand` | Secondary metrics in the full-bleed strip under the hero. Same shape as a chip; every figure must already appear in `experience`. Hidden when empty |
| `hero.employers` | Pedigree row. Hidden when empty |
| `roles` | "Where I fit" chips. The one `primary: true` role renders first with the badge. `summary`, `evidence`, `audiences`, and `experienceIds` are stored and validated but not rendered — proof lives in Experience bullets |
| `experience` | Accordion rows. `id` is the anchor target and the key `Role.experienceIds` points at. Lead with an outcome-led bullet. `location` and `scopeLine` are optional; `url` is stored, not rendered |
| `contact.email`, `linkedin` | Footer links. `resumePdf` drives the hero Resume CTA |
| `contact.location`, `github`, `availability`, `clearance` | Stored, not rendered (footer is email + LinkedIn only) |
| `site.origin`, `lang`, `ogImage` | Canonical origin, `<html lang>`, and OG image path/dimensions |
| `sections` | Heading, anchor id, and nav label per section |
| `ui` | Every non-content string: CTA labels, badge text, a11y labels, date separator |

Placeholders are written as `TODO_COPY: hint` via the `todo()` helper. Blank or omitted optional fields (for example `location`) are never rendered — the selectors drop them before components see them. Indexing is gated twice: the site is served with `robots: noindex, nofollow` while any `TODO_COPY` remains anywhere in the content, and also while `siteIndexable` in `src/content.ts` is `false`. Flip `siteIndexable` to `true` only when the metrics and title are locked and the real `public/resume.pdf` is in place.

[`public/resume.pdf`](public/resume.pdf) is the site-aligned one-pager. Replace [`public/og.png`](public/og.png) when the visual design lands; the OG tags already read title and description from `hero`, so only the image file needs to change (keep 1200×630 or update `site.ogImage`).

## Styling and extension points

[`src/app/globals.css`](src/app/globals.css) is the visual surface. Type uses Tailwind's default scale (name `text-4xl` semibold tracking-tight, title `text-base` medium muted, voice `text-sm` muted, featured chip `text-3xl`, pair chips `text-xl`, proof band `text-lg`, section labels `text-xs` uppercase tracking-widest). Everything else is a token:

| Token | Utility | Value / used for |
| --- | --- | --- |
| `--bg`, `--ink`, `--muted`, `--hairline`, `--accent` | `bg-bg`, `text-ink`, `text-muted`, `border-hairline`, `bg-accent` | Tailwind stone: `#FAFAF9`, `#0A0A0A`, `#57534E`, `#E7E5E4`, `#1C1917` |
| `--surface`, `--band` | `bg-surface`, `bg-band` | White card surface; stone-100 proof band |
| `--card-shadow`, `--card-radius` | `shadow-card`, `rounded-card` | `0 1px 2px rgb(0 0 0 / 0.04)`; 0.75rem. Shared via `cardClass` in `src/components/ui/card.ts` |
| `--font-inter` → `--font-sans` | body default | Inter with `system-ui` fallback; sans only |
| `--container-content`, `--container-voice` | `max-w-content`, `max-w-voice` | 40rem page column; ~64ch voice line |
| `--spacing-section` | `mt-section` | 5rem gap between sections. Hero→proof band is 2.5rem (`mt-10`) and proof band→Experience 3rem (`Section spacing="tight"`) |
| `--rail` | `sm:grid-cols-[var(--rail)_1fr_auto]`, `sm:pl-[calc(var(--rail)+2rem)]` | 7rem experience date column beside the hairline rail |
| `--motion-duration`, `--motion-ease` | default transition, `ease-soft` | 150ms ease; only the accordion animates (grid rows, opacity, chevron). `prefers-reduced-motion` collapses it |

Page padding is `px-5 md:px-8` (1.25rem → 2rem at ≥768) on the shared shell in `Section.tsx`. Hovers are flat colour swaps with no transition; focus rings are 2px ink, offset 2. The `link` utility styles inline text links. Markup hooks for targeted styling: `[data-section]`, `[data-component="site-header" | "proof-band"]`, `[data-slot]`, `[data-lead]`, `[data-role][data-primary]`, `[data-entry][data-open]`, `[data-cta][data-variant]`.

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
