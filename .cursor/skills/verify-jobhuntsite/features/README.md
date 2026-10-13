# Jobhuntsite verification map

Publisher IA: home (Now + Writing), `/writing/`, `/work/` (Experience + Fit), footer contact.

## Baseline preconditions

- `verify-jobhuntsite launch` then `doctor` → `ok`.
- Drive only that URL with Playwright.
- Writing may be empty (`writingView.posts === []`); empty state is valid, not a failure.
- Artifacts: `verify-jobhuntsite artifacts`.

## Driving conventions

- Prefer `data-section`, `data-slot`, `data-entry`, `data-cta`, and accessible names.
- Wordmark is home; nav is Writing · Work · Contact.
- Sticky Resume chrome is proven on `/work` only (`#work-resume`).

## Features

- [Home Now](./home-now.md) — brand + Now blurb on `/`.
- [Writing feed](./writing-feed.md) — empty state, Subscribe, `/writing/`.
- [Work experience](./work-experience.md) — accordion + Fit on `/work`.
- [Sticky Resume on work](./sticky-resume-work.md) — bar/rail after work Resume leaves view.
- [Contact footer](./contact-footer.md) — email, LinkedIn, city.
