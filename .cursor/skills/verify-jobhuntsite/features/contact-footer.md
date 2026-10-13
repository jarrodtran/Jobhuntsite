# Contact footer

The footer is the contact block: email, LinkedIn, and city. Resume stays in the hero and sticky chrome, not here.

## Sub-features

- `contact-nav` reaches `#contact` from the header.
- `contact-email` exposes a `mailto:` link labeled with the address.
- `contact-linkedin` exposes the LinkedIn profile URL.
- `contact-location` shows the city.

## How to get to it (user POV)

- Choose header nav link `Contact`.
- Scroll to the bottom of the page.

## Driving it with Playwright

Preconditions:

- Instance healthy (`verify-jobhuntsite doctor` → `ok`).

- **Nav entry.** Click Primary nav link `Contact` (or navigate to `<URL>#contact`). Expect `[data-section="contact"]` in view.
- **Email.** `[data-slot="contact-links"] [data-cta="email"]` has accessible name / text `jarrodtran@outlook.com` and `href` `mailto:jarrodtran@outlook.com`.
- **LinkedIn.** `[data-slot="contact-links"] [data-cta="linkedin"]` href is `https://www.linkedin.com/in/jarrodtran/`.
- **Location.** `[data-section="contact"] [data-slot="location"]` reads `Houston`.
- **No Resume here.** Footer has no `[data-cta="resume"]`.
- **Proof.** Screenshot and ARIA snapshot of the contact block under `$(verify-jobhuntsite artifacts)/contact-footer/`.

## Gotchas

- On mobile, the sticky Resume bar hides when contact intersects — if the bar covers the footer, that is a failure of sticky chrome, not of contact content.
- Do not open the real mail client or LinkedIn as proof; `href` values are sufficient.
