# Jarrod Tran — personal site

Minimalist single-page site for the job hunt: AI enablement strategy and ops, business operations, chief of staff, and VC platform roles. Recruiters get title, employers, scoped proof, and a resume link in the first viewport. Hiring managers get role fit and experience on scroll.

Content is locked (Copy v1) and the site is served `noindex` until `siteIndexable` is flipped. Visual design is the next pass; the structure is built to take it without markup changes.

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
  layout/               SiteHeader, Section (shared shell + <h2>)
  sections/             Hero, Roles, Experience, Contact — the scan path
  ui/                   CtaLink, ProofChips, EmployerRow, Bullets
      │
src/app/page.tsx        Composes sections in scan-path order.
src/app/layout.tsx      <title>, OG, Twitter, JSON-LD, robots — all from seoView.
src/app/globals.css     Design tokens (type scale, spacing, motion) + hooks.
```

**Recruiter scan path** (top to bottom): Hero (name → title → voice line → proof chips → employers → Resume/LinkedIn/Email) → Where I fit (primary role, then "Also a fit for") → Experience → Contact. `sectionOrder` in `selectors.ts` drives the header nav; `page.tsx` renders in the same order.

**Ownership.** Copy edits `src/content.ts` and nothing else. Eng owns `src/lib`. FE Designer owns `src/app/globals.css` and the class strings inside `src/components`; the markup exposes stable hooks (`data-section`, `data-slot`, `data-role`, `data-primary`, `data-entry`, `data-cta`) so a visual overhaul does not need to change structure.

**Content validation.** `selectors.ts` throws during `next build` if a role has no (or more than one) `primary`, an `experienceIds` entry points at an unknown `id`, or a required contact field is blank. A typo cannot ship.

## Editing content

All copy lives in [`src/content.ts`](src/content.ts). Types are in [`src/lib/schema.ts`](src/lib/schema.ts). Components never import content directly, so prose, metric, and ordering changes should never require touching `src/components`.

| Export | What it drives |
| --- | --- |
| `hero.name`, `title`, `voiceLine` | Hero identity and first-person positioning line. Also `<title>`, OG title/description, and JSON-LD `jobTitle` |
| `hero.proofChips` | Chips under the voice line. `metric` is optional; leave it out when there is no defensible number |
| `hero.employers` | Pedigree row. Hidden when empty |
| `roles` | "Where I fit". The one `primary: true` role renders first with a badge; the rest sit under "Also a fit for". `evidence` bullets and `experienceIds` back each role. `audiences` is stored, not rendered |
| `experience` | Timeline. `id` is the anchor target used by `Role.experienceIds`. Lead with an outcome-led bullet. `location`, `scopeLine`, and `url` are optional |
| `contact.email`, `linkedin`, `resumePdf` | Contact footer and CTAs |
| `contact.location`, `github`, `availability`, `clearance` | Optional; omitted by default |
| `site.origin`, `lang`, `ogImage` | Canonical origin, `<html lang>`, and OG image path/dimensions |
| `sections` | Heading, anchor id, and nav label per section |
| `ui` | Every non-content string: CTA labels, badge text, a11y labels, date separator |

Placeholders are written as `TODO_COPY: hint` via the `todo()` helper. Blank or omitted optional fields (for example `location`) are never rendered — the selectors drop them before components see them. Indexing is gated twice: the site is served with `robots: noindex, nofollow` while any `TODO_COPY` remains anywhere in the content, and also while `siteIndexable` in `src/content.ts` is `false`. Flip `siteIndexable` to `true` only when the metrics and title are locked and the real `public/resume.pdf` is in place.

[`public/resume.pdf`](public/resume.pdf) is the site-aligned one-pager. Replace [`public/og.png`](public/og.png) when the visual design lands; the OG tags already read title and description from `hero`, so only the image file needs to change (keep 1200×630 or update `site.ogImage`).

## Styling and extension points

[`src/app/globals.css`](src/app/globals.css) is the visual-overhaul surface. Tokens are exposed as Tailwind utilities:

| Token | Utility | Used for |
| --- | --- | --- |
| `--text-display`, `--text-display-lg` | `text-display`, `sm:text-display-lg` | Hero name |
| `--text-h2`, `--text-h3` | `text-h2`, `text-h3` | Section and card headings |
| `--text-body`, `--text-small`, `--text-meta` | body default, `text-small`, `text-meta` | Prose, bullets, meta lines |
| `--container-content`, `--container-measure` | `max-w-content`, `max-w-measure` | Page column, prose measure |
| `--spacing-gutter`, `--spacing-section`, `--spacing-block` | `px-gutter`, `mt-section`, `mt-block` | Horizontal gutter, vertical rhythm |
| `--motion-duration`, `--motion-ease` | default transition, `ease-soft` | Hover/focus transitions; `prefers-reduced-motion` collapses them |

The `link` utility styles inline text links. Markup hooks for targeted styling: `[data-section]`, `[data-component="site-header"]`, `[data-slot]`, `[data-role][data-primary]`, `[data-entry]`, `[data-cta]`.

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
