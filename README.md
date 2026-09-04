# Jarrod Tran — personal site

Minimalist single-page site for the job hunt: AI enablement strategy and ops, business operations, chief of staff, and VC platform roles. Recruiters get title, employers, scoped proof, and a resume link in the first viewport. Hiring managers get highlights and experience on scroll.

The shell is live-shaped but filled with `TODO` placeholders. Phase 1 is the layout and deploy path. Real copy is Phase 2.

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

## Editing content

All copy lives in [`src/content.ts`](src/content.ts). You should not need to touch components to update the site.

| Field | What it drives |
| --- | --- |
| `profile.name`, `primaryTitle`, `positioning` | Hero identity |
| `profile.employers` | Pedigree row under the targeting line |
| `profile.email`, `linkedin`, `resumePdf`, `location` | Contact and CTAs |
| `profile.github`, `availability`, `clearance` | Optional; omitted by default |
| `roles` | Primary title plus the “Also a fit for” line |
| `proof` | Three stats in the first viewport (metric + scope + result) |
| `highlights` | Hiring-manager list. `audiences` is stored, not rendered |
| `experience` | Timeline. Lead with an outcome-led bullet. `scopeLine` is reporting line, team, budget |

Replace every `TODO` before making the repo public. Swap [`public/resume.pdf`](public/resume.pdf) with the current resume. Replace [`public/og.png`](public/og.png) when the copy is real.

When content is real, flip `robots` in [`src/app/layout.tsx`](src/app/layout.tsx) from `{ index: false, follow: false }` to `{ index: true }`.

## Deploy (GitHub Pages)

The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds with `NEXT_PUBLIC_BASE_PATH=/Jobhuntsite` and deploys `out/` on pushes to `main`. Pull requests lint and build only.

The workflow enables Pages (source: GitHub Actions) on first deploy. GitHub Pages on a **private** repo still needs GitHub Pro or Team; this repo is public, so the site can go live.

Site URL after a successful deploy: `https://jarrodtran.github.io/Jobhuntsite/`.

### Custom domain

A custom domain (recommended for a job hunt) drops the `/Jobhuntsite` prefix:

1. Add `public/CNAME` containing the domain.
2. In the workflow, set `NEXT_PUBLIC_BASE_PATH` to empty (`NEXT_PUBLIC_BASE_PATH: ""` or remove the env var).
3. Point DNS at GitHub Pages and set the custom domain in repo Settings → Pages.

[`src/lib/asset.ts`](src/lib/asset.ts) prefixes raw asset URLs (`resume.pdf`, etc.) from `NEXT_PUBLIC_BASE_PATH`. Do not use it with `next/link`.

## What this shell is not (Phase 2+)

Deferred until real copy exists:

- Analytics (Plausible or Umami), added the day content ships
- HTML `/resume` print route
- Indexing (`robots` stays noindex while placeholders remain)
- Case studies, writing, or per-audience (`?for=`) highlight ordering
- A “coming soon” work grid — never ship an empty one
