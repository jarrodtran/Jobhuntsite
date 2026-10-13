# Contact footer

Footer contact on every route: email, LinkedIn, city. Resume stays on `/work`.

## Sub-features

- `contact-nav` via header `Contact` (`#contact`).
- `contact-email` / `contact-linkedin` / `contact-location`.

## How to get to it (user POV)

- Choose nav `Contact` from any page.
- Scroll to the footer.

## Driving it with Playwright

Preconditions:

- Doctor ok.

- **Nav.** Click `Contact`. Expect `[data-section="contact"]`.
- **Links.** `[data-cta="email"]` → `mailto:jarrodtran@outlook.com`; LinkedIn profile href; location `Houston`.
- **No Resume in footer.** No `[data-cta="resume"]` inside contact.
- **Proof.** Screenshot under `artifacts/.../contact-footer/`.

## Gotchas

- On mobile `/work`, sticky Resume bar should hide when contact intersects.
