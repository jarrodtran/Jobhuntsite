---
name: verify-jobhuntsite
description: Verify the Jarrod Tran personal site (jobhuntsite) web UI — launch a local Next.js instance, doctor publisher home plus /work, drive Now/Writing/Work paths with Playwright, and capture proof. Use after copy, nav, Substack feed, or Experience changes.
---

# Verify Jobhuntsite

Publisher-style personal site ([jarrodtran.com](https://jarrodtran.com)). Primary surface is the **web UI** with routes `/`, `/writing/`, `/work/`. Unit tests (`pnpm test`) do not replace real-browser proof.

## Launch

From the repo root (Node ≥22, pnpm):

```bash
pnpm install   # once, if node_modules is missing
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite launch
```

Optional preferred port:

```bash
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite launch --port 3100
```

**Ready means usable.** `launch` waits until `http://127.0.0.1:<port>/` returns HTML containing `data-section="now"` and `Jarrod Tran`.

- Content is `src/content.ts`; Writing posts come from `src/data/substack-posts.json` (filled by `pnpm fetch:substack` / `prebuild`).
- Bind is loopback only. Each launch picks a free port (from 3100).
- State: `/tmp/jobhuntsite-verify-<RUN_ID>/`; active id `.cursor/skills/verify-jobhuntsite/.active-run`.
- Teardown: `verify-jobhuntsite cleanup`.

Never drive an instance you did not start. Prefer local proof over production for unreleased changes.

## Doctor

```bash
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite doctor
```

Requires: PID alive, HTTP 200 on `/` and `/work/`, package `jobhuntsite`, home has `data-section="now"`, `data-section="writing"`, `data-cta="subscribe"`; `/work/` has `data-section="experience"` and `#work-resume` + `/resume.pdf`.

```bash
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite url
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite artifacts
```

## Drive

**Harness:** Playwright MCP against `verify-jobhuntsite url`.

| Handle | Meaning |
| --- | --- |
| `[data-page="home"]` | Publisher home main |
| `[data-slot="name"]` | Brand name |
| `[data-section="now"]` / `[data-slot="now-body"]` | Now blurb |
| `[data-section="writing"]` | Writing block |
| `[data-slot="writing-empty"]` / `[data-slot="writing-list"]` | Empty vs posts |
| `[data-cta="subscribe"]` | Subscribe → Substack |
| `[data-cta="substack"]` | Open Substack (empty state) |
| `/writing/` | Full Writing index |
| `/work/` | Recruiter path |
| `#work-resume` | Work-page Resume CTA |
| `[data-entry="<id>"]` / `[data-open]` | Experience accordion on `/work` |
| `[data-section="roles"]` | Where I fit on `/work` |
| `[data-section="contact"]` | Footer contact |

Feature recipes: [features/README.md](features/README.md).

## Evidence

```text
.cursor/skills/verify-jobhuntsite/artifacts/<RUN_ID>/
```

Exercise real navigation (home → Writing → Work). Capture before/after for accordion toggles. Assert Subscribe `href` contains `substack.com`. Resume proof is on `/work` (`#work-resume`).

## Cleanup

```bash
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite cleanup
```

Stops the recorded PID tree only. Keeps `artifacts/`.

## Helpers

Executable: `.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite`

| Command | Purpose |
| --- | --- |
| `launch [--port N]` | Start isolated Next on loopback |
| `doctor` | Home + `/work/` health |
| `url` / `artifacts` | Print URL / evidence dir |
| `stop` / `cleanup` | Tear down instance; keep artifacts |

## Isolate

Side-by-side via different ports. Do not `pkill -f next`.

## Maintenance

After IA or selector changes, run `/maintain-verification-skill`.
