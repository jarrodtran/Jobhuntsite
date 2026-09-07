# Jarrod Tran — jarrodtran.com

Personal site: a first-person intro, a living Now block, a short work handoff to LinkedIn, a life timeline, and writing at `/writing`. Recruiters who want the resume can use LinkedIn.

Content in [`src/content/site.ts`](src/content/site.ts) is placeholder-marked with `TODO_COPY:` until Jarrod fills it in. The site stays `noindex` until `siteIndexable` is `true` **and** no `TODO_COPY` markers remain.

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
pnpm start
```

## Editing copy

All homepage copy lives in [`src/content/site.ts`](src/content/site.ts).

| Export | What it drives |
| --- | --- |
| `intro.greeting`, `tagline`, `bio` | Homepage intro. Tagline is also the default meta description |
| `now.updatedAt`, `now.items` | Dated Now block. `updatedAt` is `YYYY-MM-DD` |
| `work.paragraph` | One-sentence current role; the LinkedIn link is appended in the page |
| `timeline` | Life events only (`year` + `text`). No job rows — those live on LinkedIn |
| `links.email`, `linkedin`, `github` | Footer. A value that still contains `TODO_COPY` is omitted |
| `siteIndexable` | Flip to `true` when copy is locked and you want search engines in |

Replace [`public/avatar.svg`](public/avatar.svg) with a photo (keep it square). [`public/resume.pdf`](public/resume.pdf) is reachable at `/resume.pdf` but is not linked anywhere.

## Writing

Posts live in [`content/writing/`](content/writing/). Each file:

```mdx
export const meta = {
  title: "Title",
  date: "2026-09-07",
  summary: "One or two sentences.",
  draft: true,
};

# Title

Body in MDX. GitHub-flavored markdown (tables, strikethrough) works.
```

- Filename is the slug: `my-post.mdx` → `/writing/my-post`.
- `date` must be `YYYY-MM-DD`. Title and summary are required.
- `draft: true` posts are excluded from `/`, `/writing`, `/feed.xml`, and `/sitemap.xml`. Hitting the slug directly 404s.
- `hello-world.mdx` is a draft fixture so the MDX pipeline has something to compile. Leave it drafted, or delete it, when the first real post lands.

## Design

Warm paper in light mode, warm charcoal in dark. Newsreader for headings, Inter for body, 42rem column. Theme follows the OS by default; the header toggle persists. Accent color matches the existing JT favicon (`#1f4a3a`).

## Deploy (Vercel)

This app is built for Vercel (App Router route handlers, `next/og`, no `output: "export"`). GitHub Actions only lints and builds; it no longer publishes GitHub Pages.

Until `jarrodtran.com` is serving this app, the last successful Pages deploy at `https://jarrodtran.github.io/Jobhuntsite/` stays up. Do not disable Pages until the custom domain is verified.

### Cutover

1. Merge this branch to `main`.
2. Import the repo at [vercel.com/new](https://vercel.com/new). Framework: Next.js. Install command: `pnpm install`. Build: `pnpm build`.
3. Project → Domains → add `jarrodtran.com` (and `www`). Copy the **exact** DNS records from the Vercel domain card — they are project-specific; do not reuse old generic IPs. Point the registrar at those records. Set `www` → apex redirect in Vercel.
4. Confirm `https://jarrodtran.com` serves this site.
5. Follow-up: disable GitHub Pages on the repo so `jarrodtran.github.io/Jobhuntsite` stops serving the old one-pager.

RSS is at `/feed.xml`. Robots stay closed until the content gate opens.
