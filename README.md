# Jarrod Tran — personal site

Publisher-style personal site at [jarrodtran.com](https://jarrodtran.com). `/` is Now + Writing (Substack). `/work` is the recruiter path. `/writing/` is the full Writing index.

Posts sync from `https://jarrodtran.substack.com/feed` at build time into `src/data/substack-posts.json`. Copy lives in [`src/content.ts`](src/content.ts). Tokens live in [`src/app/globals.css`](src/app/globals.css). Display type is Instrument Serif; body is Geist. Markup keeps stable `data-*` hooks.

## Local development

Requires Node 22 and [pnpm](https://pnpm.io/).

```bash
pnpm install
pnpm fetch:substack   # optional; also runs as prebuild
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Routes: `/`, `/writing/`, `/work/`.

```bash
pnpm lint
pnpm test
pnpm build
```

`pnpm build` writes a static export to `out/` at the apex (`/`).

## Architecture

One direction of data flow across three routes:

```
src/content.ts             Copy-owned data (nowBody, substack URLs, experience, roles).
scripts/fetch-substack.mjs Build-time RSS → src/data/substack-posts.json
src/lib/substack.ts        Parse / normalize Substack posts.
src/lib/schema.ts          Eng-owned types.
src/lib/selectors.ts       Render-ready views; validates content at build time.
src/lib/url.ts             Prefixes public paths with NEXT_PUBLIC_BASE_PATH.
src/components/            Render views from @/lib/selectors, never @/content.
src/app/page.tsx           Home: identity + Now + Writing.
src/app/writing/page.tsx   Writing index (same feed).
src/app/work/page.tsx      Work: compact header → Experience → Fit.
src/app/layout.tsx         <title>, OG, Twitter, JSON-LD, robots — from seoView.
src/app/globals.css        Design tokens + hooks.
```

**Home.** Name, title, Now blurb, Writing list (or empty state + Subscribe to Substack). Chrome: wordmark → `/`; PrimaryNav is Writing · Work · Contact.

**Work.** Compact header with Resume + LinkedIn, then Experience accordion and Where I fit. Sticky Resume (`ResumeBar` / `ScrollRail`) watches `#work-resume` on this page only.

**Client components.** `ExperienceRows`, `ResumeBar`, `ScrollRail`, and `PrimaryNav` (route-aware `aria-current`).

**Substack.** `pnpm fetch:substack` (also `prebuild`) pulls the feed. On failure the prior JSON is kept so `pnpm build` still succeeds. Deploy also runs on a weekly cron so new posts can land without a manual commit.

**Experience accordion.** One row open at a time. The current role (`end` is a word such as "Present") is open on first paint and server-rendered. A `#<experience-id>` hash opens that row. Headers are real `<button>`s (`aria-expanded`).

**Ownership.** Copy edits `src/content.ts`. Eng owns `src/lib`. FE Designer owns `src/app/globals.css` and the class strings inside `src/components`.

**Content validation.** `selectors.ts` throws during `next build` if a role has no (or more than one) `primary`, an `experienceIds` entry points at an unknown `id`, or a required contact field is blank.

**Indexing.** `siteIndexable` is `true`. Indexing still requires no `TODO_COPY` in the content `selectors.ts` scans. Both the `robots` meta tag and `/robots.txt` follow `seoView.indexable`. Canonical origin is `https://jarrodtran.com`.

## Editing content

All copy lives in [`src/content.ts`](src/content.ts). Types are in [`src/lib/schema.ts`](src/lib/schema.ts). See those files for field shapes, locked fields, and values that are stored but not rendered.

Placeholders are `TODO_COPY: hint` via `todo()`. Blank optional fields are dropped in selectors before components see them.

[`public/resume.pdf`](public/resume.pdf) is the one-pager. Replace [`public/og.png`](public/og.png) in place (keep 1200×630 or update `site.ogImage`).

## Styling

[`src/app/globals.css`](src/app/globals.css) is the visual surface. Retune tokens there; do not copy values into this README.

## Deploy

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds at apex `/` and deploys `out/` on pushes to `main`. Pull requests lint and build only. `public/CNAME` ships `jarrodtran.com` so GitHub Pages keeps the custom domain.

Site URL: `https://jarrodtran.com`. `site.origin` in `src/content.ts` is that origin. [`src/lib/url.ts`](src/lib/url.ts) builds `siteUrl` and prefixes public-folder paths (`resume.pdf`, `og.png`) for raw `<a href>` and metadata. Do not use `asset()` with `next/link`.
