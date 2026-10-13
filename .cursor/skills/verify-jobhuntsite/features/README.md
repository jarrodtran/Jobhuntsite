# Jobhuntsite verification map

Maintained source for verifying user-facing behavior of the personal site. Read this index before driving, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch with `.cursor/skills/verify-jobhuntsite/bin/verify-jobhuntsite launch` so the instance owns a free loopback port.
- Run `verify-jobhuntsite doctor` and require `ok`, package `jobhuntsite`, and the printed URL.
- Drive only through Playwright against that URL. Never drive an instance this run did not start.
- Content comes from `src/content.ts` (no seed step). If a journey needs a row or label that content no longer has, fail the journey and record the gap in that feature’s Gotchas — do not weaken the recipe.
- Artifacts go under `.cursor/skills/verify-jobhuntsite/artifacts/<RUN_ID>/` (`verify-jobhuntsite artifacts`).

## Driving conventions

- Start every recipe from a fresh navigation to the instance URL unless preconditions say otherwise.
- Prefer `data-section`, `data-slot`, `data-entry`, `data-cta`, ARIA roles, and accessible names over CSS layout or coordinates.
- Treat labels and experience ids in the recipes as literals from current content (`Jarrod Tran`, `tesla-ai`, `waymo`, etc.).
- Sticky chrome (`resume-bar` / `scroll-rail`) depends on viewport width and scroll position — set viewport explicitly before those steps.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes an ARIA snapshot and a screenshot with the name `Jarrod Tran` visible (or the open experience panel when that is the subject).
- Side-effect proof includes hash, `data-open` / `aria-expanded`, and CTA `href` values.
- Record the feature file and entry point used with every artifact.
- Report an unreachable path with the attempted step and unmet precondition. Do not claim a skipped entry point was verified via another path.

## Feature entry contract

Each feature file starts with an H1 and one paragraph of user-visible behavior, then exactly these H2s in order:

1. `Sub-features`
2. `How to get to it (user POV)`
3. `Driving it with Playwright`
4. `Gotchas`

## Features

- [Hero fold](./hero-fold.md) — name, title, proof chips, Resume/LinkedIn, employers.
- [Experience accordion](./experience-accordion.md) — open/close rows, hash deep links.
- [Where I fit](./where-i-fit.md) — Fit lanes and company links into Experience.
- [Sticky Resume chrome](./sticky-resume-chrome.md) — mobile bar and desktop scroll rail after hero CTA leaves view.
- [Contact footer](./contact-footer.md) — email, LinkedIn, location, nav to `#contact`.
