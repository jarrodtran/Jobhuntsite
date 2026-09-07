# Jarrod Tran — jarrodtran.com

Personal site: a first-person intro, a living Now block, a short work handoff to LinkedIn, a life timeline, and writing at `/writing`. Recruiters who want the resume can use LinkedIn.

Content in [`src/content/site.ts`](src/content/site.ts) is placeholder-marked with `TODO_COPY:` until Jarrod fills it in. The site stays `noindex` until `siteIndexable` is `true` **and** no `TODO_COPY` markers remain.

## Local development

Requires **Node 22+** and [pnpm](https://pnpm.io/) 10+ (pinned via `packageManager` / `engines`). Enable Corepack if `pnpm` is missing: `corepack enable`.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) or [http://127.0.0.1:3000](http://127.0.0.1:3000). Dev and production servers bind `0.0.0.0:3000` so Cursor port preview and other proxies can reach them.

```bash
pnpm lint
pnpm build
pnpm preview   # production build + next start on 0.0.0.0:3000
```

### Preview / port troubleshooting

Turbopack (`pnpm dev`) plus a Cursor port preview sometimes drops the connection (`ERR_CONNECTION_RESET` on the document or `/_next/*`). The production server is more stable:

```bash
pnpm preview
```

That is `next build` then `next start --hostname 0.0.0.0 --port 3000`.

Still want hot reload?

- Free port 3000 if a leftover Next process is holding it, then retry `pnpm dev`.
- Fall back to Webpack: `pnpm dev:webpack`.
- Use the same host in the browser (`localhost` vs `127.0.0.1`). `allowedDevOrigins` in [`next.config.ts`](next.config.ts) allows both so `/_next/*` is not treated as a cross-origin warn.

Override the port: `pnpm dev -- --port 3001` or `pnpm start -- --port 3001`. Confirm `node -v` is 22+.

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

This app is built for Vercel (App Router route handlers, `next/og`, no `output: "export"`). [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) lints and builds on every PR. The GitHub Pages deploy job is still in that workflow so the last successful `github.io` publish stays live; it only uploads `out/` if a static export exists, which this app no longer produces.

Until `jarrodtran.com` is serving this app, `https://jarrodtran.github.io/Jobhuntsite/` stays up. Do not disable Pages until the custom domain is verified. After cutover, a follow-up PR can drop the Pages job.

### Cutover

1. Merge this branch to `main`.
2. Import the repo at [vercel.com/new](https://vercel.com/new). Framework: Next.js. Install command: `pnpm install`. Build: `pnpm build`.
3. Project → Domains → add `jarrodtran.com` (and `www`). Copy the **exact** DNS records from the Vercel domain card — they are project-specific; do not reuse old generic IPs. Point the registrar at those records. Set `www` → apex redirect in Vercel.
4. Confirm `https://jarrodtran.com` serves this site.
5. Follow-up: disable GitHub Pages on the repo so `jarrodtran.github.io/Jobhuntsite` stops serving the old one-pager.

RSS is at `/feed.xml`. Robots stay closed until the content gate opens.
