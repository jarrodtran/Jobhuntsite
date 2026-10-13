# Hero fold

The fold is the recruiter first viewport: name, Tesla title, filing sentence, proof figures, Resume and LinkedIn CTAs with location, and the employer pedigree line.

## Sub-features

- `hero-identity` shows name, title, and mapping line.
- `hero-proof` shows the lead figure and secondary chips.
- `hero-ctas` exposes Resume (solid) and LinkedIn (ghost) with the location line.
- `hero-employers` lists Tesla, Waymo, Apple, Amazon.

## How to get to it (user POV)

- Open the site root `/` (or `/` after launch URL).
- Choose the header wordmark (links to `#top`).
- Use the skip link “Skip to content” then land in `#main` with the hero above Experience.

## Driving it with Playwright

Preconditions:

- Instance healthy (`verify-jobhuntsite doctor` → `ok`).
- Viewport wide enough to read the fold (≥390 CSS px width is enough for identity + CTAs).

- **Open fold.** Navigate to the URL from `verify-jobhuntsite url`. Snapshot. Heading `Jarrod Tran` is present; `[data-section="hero"] [data-slot="name"]` matches.
- **Title and filing.** Read `[data-slot="title"]` and `[data-slot="mapping"]`. Expect title `Manager, AI & Factory Strategy` and mapping text that mentions Strategy & Operations / Technical Program Manager / Tesla Energy.
- **Proof chips.** Query `[data-slot="proof-chips"]`. Expect metrics including `10k+`, `$260M`, `20+` and a `[data-lead]` cell.
- **Resume CTA.** Locate `#hero-resume` (or `[data-slot="ctas"] [data-cta="resume"][data-variant="solid"]`). Accessible name `Resume`. `href` ends with `/resume.pdf`; opens in a new tab (`target="_blank"`).
- **LinkedIn CTA.** Locate `[data-slot="ctas"] [data-cta="linkedin"][data-variant="ghost"]`. `href` is `https://www.linkedin.com/in/jarrodtran/`.
- **Location.** `[data-slot="location"]` includes `Houston` and relocate stance.
- **Employers.** `[data-slot="employers"]` contains Tesla, Waymo, Apple, Amazon.
- **Proof.** Save ARIA snapshot and viewport screenshot under `$(verify-jobhuntsite artifacts)/hero-fold/` showing the name and Resume control.

## Gotchas

- Proof strip (`[data-component="proof-band"]`) is empty in current content — absence is correct, not a failure.
- Sticky Resume chrome must stay hidden while `#hero-resume` is on screen; do not require the bar/rail on the fold.
- Copy changes live only in `src/content.ts`. If metrics or title differ, fail against this recipe and update the map — do not assert outdated unit-test strings.
