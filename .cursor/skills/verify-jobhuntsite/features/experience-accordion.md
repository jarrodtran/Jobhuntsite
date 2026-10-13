# Experience accordion

Experience is the primary scan path after the fold: a list of roles where one row is open at a time, the current Tesla role starts open, and hash links can open a specific row.

## Sub-features

- `exp-default-open` opens the current role (`tesla-ai`) on first paint.
- `exp-toggle` opens another row and closes the previous one.
- `exp-hash` opens a row from `#<experience-id>` (Fit links or shared URL).
- `exp-panel` shows scope and outcome bullets only on the open row.

## How to get to it (user POV)

- Scroll to the Experience heading, or choose header nav link `Experience` (`#experience`).
- Open a Fit company link that points at an experience id.
- Land on a shared URL with a hash such as `#waymo`.

## Driving it with Playwright

Preconditions:

- Instance healthy (`verify-jobhuntsite doctor` → `ok`).
- Content still defines experience ids `tesla-ai`, `waymo`, `apple-india`, `tesla-4680`, `amazon`.

- **Default open.** Navigate to the site URL (no hash). Scroll to `[data-section="experience"]`. Expect `[data-entry="tesla-ai"][data-open="true"]` and its header `button[aria-expanded="true"]`. Panel `[data-entry="tesla-ai"] [data-slot="bullets"]` is visible with AI enablement / cost-down outcomes.
- **Toggle closed peer.** Click the header button inside `[data-entry="waymo"]`. Expect `waymo` → `data-open="true"` / `aria-expanded="true"`, and `tesla-ai` → `data-open="false"` / `aria-expanded="false"`. Capture before/after screenshots under `$(verify-jobhuntsite artifacts)/experience-accordion/`.
- **Hash deep link.** Navigate to `<URL>#apple-india` (or set `location.hash` and wait). Expect `[data-entry="apple-india"][data-open="true"]` and panel text about iPhone India.
- **Collapse current.** Click the open row’s header again. Expect that row `data-open="false"` and no `data-open="true"` row (allowed: all closed).
- **Proof.** ARIA snapshot of Experience plus screenshot of the open Waymo or Apple panel; record which entry point was used.

## Gotchas

- Only one row may be open at a time. Assert both the newly opened and previously open rows.
- Hash handling listens for `hashchange`; a full navigation to `/#id` is the reliable path.
- Under 640px dates stack above the title — layout differs, but `data-entry` / `aria-expanded` stay valid.
- Education line under Experience (`[data-slot="education"]`) is not an accordion row.
