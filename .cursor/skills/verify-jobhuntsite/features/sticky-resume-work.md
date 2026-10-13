# Sticky Resume on work

On `/work`, after `#work-resume` leaves the viewport, sticky Resume chrome appears (mobile bar under 640px, desktop rail at 640px and up).

## Sub-features

- `chrome-hidden` while work Resume is on screen.
- `chrome-rail` desktop after scroll.
- `chrome-bar` mobile after scroll; hides when contact intersects.

## How to get to it (user POV)

- Open `/work/`, scroll into Experience.

## Driving it with Playwright

Preconditions:

- Doctor ok. Set viewport explicitly.

- **Hidden on load.** `#work-resume` in view → resume-bar and scroll-rail `aria-hidden="true"`.
- **Desktop.** Width ≥640, scroll Experience into view → `[data-component="scroll-rail"][aria-hidden="false"]`.
- **Mobile.** Width under 640, scroll away from Resume, keep contact off-screen → `[data-component="resume-bar"][aria-hidden="false"]`.
- **Proof.** Screenshots under `artifacts/.../sticky-resume-work/`.

## Gotchas

- Do not prove sticky chrome on the publisher home; it is work-only.
