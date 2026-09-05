import { bleedCardClass, cardClass } from "@/components/ui/card";
import type { ProofChip } from "@/lib/schema";

type Props = {
  chips: ProofChip[];
  label: string;
  className?: string;
};

/**
 * The hero figure block: one white panel, hairline-ruled into a lead figure and
 * a secondary pair. The first chip is the page — text-5xl bold tabular — with
 * its label set as an 11px caps rule under it. The pair sit at text-2xl
 * semibold, each in its own hairline cell. No chips, no second card.
 *
 * ≥640: lead on the left spanning both rows; pair stacked in a 13rem column on
 * the right behind a vertical hairline. <640: the panel runs edge to edge (only
 * top/bottom rules remain), lead full width, and each of the pair becomes a
 * ruled memo row — figure left, caps label right on the same baseline.
 *
 * Hooks: `data-slot="proof-chips"` on the list, `data-lead="true"` on the lead
 * figure, `data-slot="metric"` and `data-slot="chip-label"` inside each cell.
 */
export function ProofChips({ chips, label, className }: Props) {
  if (chips.length === 0) return null;

  return (
    <ul
      data-slot="proof-chips"
      aria-label={label}
      className={[
        cardClass,
        bleedCardClass,
        "grid sm:grid-cols-[1fr_13rem] sm:grid-rows-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {chips.map((chip, index) => {
        const lead = index === 0;

        return (
          <li
            key={`${chip.metric ?? ""}${chip.label}`}
            data-lead={lead || undefined}
            className={
              lead
                ? "flex min-w-0 flex-col justify-center px-5 py-7 sm:row-span-2 sm:px-6 sm:py-8"
                : [
                    "flex min-w-0 items-baseline justify-between gap-x-4 border-t border-hairline px-5 py-3",
                    "sm:flex-col sm:justify-center sm:border-l sm:py-4",
                    index === 1 ? "sm:border-t-0" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")
            }
          >
            {chip.metric ? (
              <span
                data-slot="metric"
                className={[
                  "tabular-nums leading-none text-ink",
                  lead
                    ? "text-5xl font-bold tracking-tighter"
                    : "text-2xl font-semibold tracking-tight",
                ].join(" ")}
              >
                {chip.metric}
              </span>
            ) : null}
            <span
              data-slot="chip-label"
              className={[
                "text-label font-semibold uppercase tracking-label text-muted",
                lead ? "mt-3" : "text-right sm:mt-1.5 sm:text-left",
              ].join(" ")}
            >
              {chip.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
