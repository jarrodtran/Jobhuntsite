# Work experience

`/work` is the recruiter path: compact header with Resume, Experience accordion, and Where I fit.

## Sub-features

- `work-header` shows name, title, `#work-resume`, LinkedIn.
- `work-default-open` opens `tesla-ai` by default.
- `work-toggle` opens another row and closes the previous.
- `work-fit` links into experience hashes on the same page.

## How to get to it (user POV)

- Choose nav `Work`.
- Open `/work/` directly.

## Driving it with Playwright

Preconditions:

- Doctor ok (includes `/work/` checks).

- **Open work.** Navigate to `<URL>work/`. Expect `#work-resume` and `[data-section="experience"]`.
- **Default open.** `[data-entry="tesla-ai"][data-open="true"]`.
- **Toggle.** Click `[data-entry="waymo"] button`. Expect waymo open, tesla-ai closed.
- **Fit.** Scroll to `[data-section="roles"]`; follow a fit company link; matching `[data-entry]` opens.
- **Proof.** Screenshots under `artifacts/.../work-experience/`.

## Gotchas

- Resume id is `#work-resume`, not `#hero-resume`.
- Fit hashes are page-local on `/work`.
