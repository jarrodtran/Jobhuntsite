import type { ProofChip } from "@/lib/schema";

type Props = {
  chips: ProofChip[];
  label: string;
  className?: string;
};

/**
 * Quiet fact rail, not a dashboard card. The first chip is the lead (10k AI
 * enablement) — a step larger than the pair, still tabular — so recruiters
 * file enablement first without a billboard eating the fold.
 *
 * <640: ruled memo rows, figure left and caps label right on one baseline.
 * ≥640: three columns under the identity block.
 * ≥1024: a right-hand stack beside the name (Hasque fold), no rules.
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
        "grid grid-cols-1 divide-y divide-hairline border-y border-hairline",
        "sm:grid-cols-3 sm:divide-x sm:divide-y-0",
        "lg:flex lg:flex-col lg:gap-6 lg:divide-x-0 lg:border-0 lg:divide-y-0",
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
            className={[
              "flex min-w-0 items-baseline justify-between gap-x-4 py-3",
              "sm:flex-col sm:items-start sm:justify-start sm:px-4 sm:py-4",
              "lg:px-0 lg:py-0",
              index === 0 ? "sm:pl-0" : "",
              index === chips.length - 1 ? "sm:pr-0" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {chip.metric ? (
              <span
                data-slot="metric"
                className={[
                  "tabular-nums leading-none tracking-tight text-ink",
                  lead
                    ? "text-3xl font-medium lg:text-4xl"
                    : "text-2xl font-medium",
                ].join(" ")}
              >
                {chip.metric}
              </span>
            ) : null}
            <span
              data-slot="chip-label"
              className={[
                "text-label font-semibold uppercase tracking-label text-muted",
                lead ? "sm:mt-2" : "text-right sm:mt-2 sm:text-left",
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
