# Where I fit

Where I fit files the candidate into two labeled lanes (AI adoption and Strategy & Operations) with a short intro and company names in the prose that link to Experience rows.

## Sub-features

- `fit-intro` shows the filing sentence under the section heading.
- `fit-thesis` is the primary lane (`AI adoption`, `data-role="ai-enablement"`).
- `fit-adjacent` is the secondary lane (`Strategy & Operations`, `data-role="bizops"`).
- `fit-jump` company links jump to Experience and open the matching row.

## How to get to it (user POV)

- Choose header nav `Where I fit` (`#roles`).
- Scroll past Experience to the section heading “Where I fit”.

## Driving it with Playwright

Preconditions:

- Instance healthy (`verify-jobhuntsite doctor` → `ok`).
- Roles content still has primary `ai-enablement` and adjacent `bizops` with experience links.

- **Open section.** Navigate to `<URL>#roles` or click nav link `Where I fit`. Expect `[data-section="roles"]` and heading text `Where I fit`.
- **Intro.** `[data-slot="intro"]` mentions Tesla / Manager, AI & Factory Strategy / AI adoption.
- **Lanes.** `[data-slot="thesis"][data-role="ai-enablement"]` and `[data-slot="adjacent"][data-role="bizops"]` are present with lane labels.
- **Follow a Fit link.** Inside `[data-slot="thesis"] [data-slot="fit-links"]` or adjacent, click a company link (e.g. accessible name containing `Tesla` or `Waymo` — exact label is the company string wrapped in the summary). Expect navigation hash to an experience id and the matching `[data-entry][data-open="true"]`.
- **Proof.** Screenshot of the Fit section before the click, and Experience after the jump showing the opened row. Save under `$(verify-jobhuntsite artifacts)/where-i-fit/`.

## Gotchas

- Fit links wrap the **first** occurrence of each company label in the lane summary. Prefer the link element, not a text search that might hit unlinked repeats.
- There is no chip/badge row in the current Fit design — do not require `[data-slot="badge"]`.
- If a lane summary no longer contains a linked company string, the journey fails; update content or this map rather than clicking Experience manually and calling Fit verified.
