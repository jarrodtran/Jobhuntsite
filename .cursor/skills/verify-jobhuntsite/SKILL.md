---
name: verify-jobhuntsite
description: Verify the Jarrod Tran personal site (jobhuntsite) web UI — launch a local Next.js instance, doctor it, drive recruiter-scan paths with Playwright, and capture proof. Use when proving site behavior after copy, layout, accordion, CTA, or Fit changes.
---

# Verify Jobhuntsite

Single-page personal site for the job hunt ([jarrodtran.com](https://jarrodtran.com)). Primary surface is the **web UI**. Unit tests (`pnpm test`) exist but do not replace real-browser proof. There is no CLI product surface.

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

**Ready means usable, not just a listening socket.** `launch` waits until `http://127.0.0.1:<port>/` returns HTML containing `data-slot="name"` and `Jarrod Tran`. It prints `RUN_ID`, `URL`, `PID`, `LOG`, and `ARTIFACTS`.

- No migrations or seed data — content is `src/content.ts`.
- Bind is loopback only (`127.0.0.1`).
- Each launch picks a free port (default search from 3100) so instances can run side by side.
- State lives in `/tmp/jobhuntsite-verify-<RUN_ID>/`; the active id is `.cursor/skills/verify-jobhuntsite/.active-run`.
- Teardown: `.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite cleanup` (see Cleanup).

Never drive an instance you did not start. Never use production `https://jarrodtran.com` as the proof target for local changes (optional live spot-check only, after local proof).

## Doctor

Read-only health check. Run first whenever anything looks off:

```bash
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite doctor
```

Requires: recorded PID alive, HTTP 200, package name `jobhuntsite`, hero/experience sections present, `#hero-resume` and `/resume.pdf` in the HTML. Prints `ok` plus `URL` / `PID` / `PORT` / `ARTIFACTS`.

```bash
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite url
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite artifacts
```

## Drive

**Harness:** Cursor Playwright MCP (browser_* tools) against the URL from `verify-jobhuntsite url`.

Stable handles (prefer these over coordinates):

| Handle | Meaning |
| --- | --- |
| `[data-section="hero"]` | Fold |
| `[data-slot="name"]` | Hero name (h1) |
| `[data-slot="title"]` | Tesla title |
| `[data-slot="mapping"]` | Filing sentence |
| `[data-slot="proof-chips"]` / `[data-lead]` | Proof figures |
| `[data-slot="ctas"] [data-cta="resume"][data-variant="solid"]` or `#hero-resume` | Hero Resume |
| `[data-cta="linkedin"][data-variant="ghost"]` | Hero LinkedIn |
| `[data-slot="employers"]` | Pedigree row |
| `[data-component="site-header"] [data-slot="nav-links"] a` | In-page nav |
| `[data-section="experience"]` | Experience block |
| `[data-entry="<id>"]` / `[data-open="true\|false"]` | Accordion row (`tesla-ai`, `waymo`, `apple-india`, `tesla-4680`, `amazon`) |
| `[data-entry] button[aria-expanded]` | Row header control |
| `[data-slot="panel"]` / `[data-slot="bullets"]` | Open row body |
| `[data-section="roles"]` | Where I fit |
| `[data-slot="thesis"]` / `[data-slot="adjacent"]` | Fit lanes |
| `[data-slot="fit-links"] a` | Company hash links into Experience |
| `[data-section="contact"]` / `[data-cta="email"]` / `[data-cta="linkedin"]` | Footer |
| `[data-component="resume-bar"]` / `[data-component="scroll-rail"]` | Sticky Resume chrome |

Recipe pattern:

1. `doctor`
2. Playwright `browser_navigate` → URL from `url`
3. `browser_snapshot` (ARIA) before acting
4. Click/scroll using roles, accessible names, or the `data-*` handles above
5. Re-snapshot / screenshot into the artifacts directory (see Evidence)
6. Confirm side effects (hash, `aria-expanded`, `data-open`, resume href) — not only the final pixels

Feature recipes: [features/README.md](features/README.md).

## Evidence

Proof root for a run:

```text
.cursor/skills/verify-jobhuntsite/artifacts/<RUN_ID>/
```

Path from helper: `verify-jobhuntsite artifacts`.

**Standards**

- Exercise the real user path in the browser (scroll, click accordion, follow Fit links). Do not call internal React setters or unit-only entry points as the proof.
- Capture the action and the resulting state (before/after snapshot or screenshot), not only the end screen.
- Verify side effects with the UI: `location.hash`, `aria-expanded` / `data-open`, Resume `href` ending in `/resume.pdf`, contact `mailto:` / LinkedIn URL.
- Resume opens in a new tab — assert the hero link attributes (`target`, `href`); do not require downloading the PDF into the workspace unless the journey needs the bytes.
- Mocks: none for the page itself. External LinkedIn/email are production boundaries — prove `href` only.
- Name artifacts by feature id, e.g. `experience-accordion/after-waymo.png`, `experience-accordion/aria.after.txt`.

## Cleanup

```bash
.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite cleanup
```

Stops only the PID tree recorded for this run, removes `/tmp/jobhuntsite-verify-<RUN_ID>/` and `.active-run`. **Does not delete** `.cursor/skills/verify-jobhuntsite/artifacts/` — proof must survive teardown. After a failed iteration, still run `cleanup` so ports are not stranded.

## Helpers

Executable: `.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite`

| Command | Purpose |
| --- | --- |
| `launch [--port N]` | Start isolated Next on loopback; wait until usable |
| `doctor` | Read-only “is this instance worth driving?” |
| `url` | Print the instance URL |
| `artifacts` | Print this run’s evidence directory |
| `stop` | Kill the recorded process tree |
| `cleanup` | `stop` + remove scratch state; keep artifacts |

Env: `JOBHUNTSITE_VERIFY_RUN_ID`, `JOBHUNTSITE_VERIFY_PORT`.

## Isolate

Two instances may run side by side on different ports. There is no shared data directory. Do not double-drive the same URL/port from two agents. Do not `pkill -f next` or kill by process name.

## Maintenance

After the app changes, keep the map honest with `/maintain-verification-skill`.
