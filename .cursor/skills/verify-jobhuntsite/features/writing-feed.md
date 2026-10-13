# Writing feed

Writing lists Substack posts from build-time JSON. When empty, the page shows empty copy, Subscribe, and an Open Substack link.

## Sub-features

- `writing-empty` shows empty copy when `posts` is `[]`.
- `writing-subscribe` links to Substack subscribe.
- `writing-index` serves the same list at `/writing/`.
- `writing-posts` lists cards when the JSON has items.

## How to get to it (user POV)

- Scroll the homepage Writing section.
- Choose nav `Writing` → `/writing/`.

## Driving it with Playwright

Preconditions:

- Doctor ok.
- Know whether `src/data/substack-posts.json` has posts (empty is the usual local state).

- **Home Writing.** On `/`, find `[data-section="writing"]`. If empty, expect `[data-slot="writing-empty"]` and `[data-cta="subscribe"]` whose `href` contains `substack.com/subscribe`. Also `[data-cta="substack"]` → publication URL.
- **Writing route.** Navigate to `<URL>writing/`. Same section and empty/posts behavior.
- **When posts exist.** Expect `[data-slot="writing-list"]` with titles linking off-site (`target="_blank"`).
- **Proof.** Screenshot of empty or populated Writing under `artifacts/.../writing-feed/`.

## Gotchas

- Do not fail the journey because the feed is empty. Fail only if empty UI or Subscribe is missing when posts length is 0.
- Posts open on Substack; on-site body mirror is out of scope.
