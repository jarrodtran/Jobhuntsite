# Sticky Resume chrome

After the in-hero Resume control leaves the viewport, a sticky Resume control appears: bottom bar under 640px, top scroll rail at 640px and above. It must never show at the same time as `#hero-resume`.

## Sub-features

- `chrome-hidden-on-fold` keeps bar and rail hidden while the hero Resume is on screen.
- `chrome-mobile-bar` shows `[data-component="resume-bar"]` below 640px after scroll.
- `chrome-desktop-rail` shows `[data-component="scroll-rail"]` at ≥640px after scroll.
- `chrome-hides-at-contact` hides the mobile bar again when `#contact` intersects.

## How to get to it (user POV)

- Load the site, then scroll until the hero Resume button is off-screen (into Experience or further).
- On a phone-width viewport, use the bottom Resume bar; on desktop width, use the top rail Resume.

## Driving it with Playwright

Preconditions:

- Instance healthy (`verify-jobhuntsite doctor` → `ok`).
- Set an explicit viewport before asserting which chrome appears.

- **Fold: hidden.** Navigate to the URL. With `#hero-resume` in view, expect `[data-component="resume-bar"]` and `[data-component="scroll-rail"]` to have `aria-hidden="true"` (translated off-screen).
- **Desktop rail.** Set viewport width ≥640 (e.g. 1280×800). Scroll until `#hero-resume` is out of view (scroll `[data-section="experience"]` into view). Expect `[data-component="scroll-rail"][aria-hidden="false"]` with wordmark and `[data-cta="resume"][data-variant="solid"]` whose `href` ends with `/resume.pdf`. Resume bar stays `sm:hidden` / not the active control.
- **Mobile bar.** Set viewport width under 640 (e.g. 390×844). Reload or re-navigate, scroll hero Resume away, keep `#contact` off-screen. Expect `[data-component="resume-bar"][aria-hidden="false"]` and bar link `[data-cta="resume"][data-variant="bar"]`.
- **Hide at contact (mobile).** Scroll `[data-section="contact"]` into view. Expect resume-bar `aria-hidden="true"` again so footer links stay usable.
- **Proof.** Screenshots of fold (hidden), mid-page (chrome visible), and contact (bar hidden on mobile) under `$(verify-jobhuntsite artifacts)/sticky-resume-chrome/`.

## Gotchas

- Chrome is client-hydrated. Wait for `aria-hidden` to flip after scroll; do not assert on first paint alone.
- Desktop and mobile chrome are mutually exclusive by CSS breakpoint — prove each at its viewport.
- Do not require the sticky control while the hero Resume is still visible; that is a product bug if it appears.
