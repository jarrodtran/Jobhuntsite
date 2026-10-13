# Home Now

The homepage first composition shows the name as brand, the current title, and the Now blurb (what’s going on).

## Sub-features

- `home-brand` shows `Jarrod Tran` as the h1.
- `home-title` shows the current role title under the name.
- `home-now` shows the Now heading and body from `nowBody`.

## How to get to it (user POV)

- Open `/`.
- Choose the header wordmark.

## Driving it with Playwright

Preconditions:

- `verify-jobhuntsite doctor` → `ok`.

- **Open home.** Navigate to the instance URL. Expect `[data-page="home"]`, `[data-slot="name"]` = `Jarrod Tran`.
- **Title.** `[data-slot="title"]` includes `Manager` / `Strategy` (current title from content).
- **Now.** `[data-section="now"] [data-slot="now-body"]` mentions Super Intelligence / Tesla Energy Manufacturing.
- **Proof.** Screenshot + ARIA under `$(verify-jobhuntsite artifacts)/home-now/`.

## Gotchas

- Now lives inside the home identity section, not a separate route.
- Empty Writing below Now is expected until Substack has posts.
