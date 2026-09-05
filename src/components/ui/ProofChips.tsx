import type { ProofChip } from "@/lib/schema";

type Props = {
  chips: ProofChip[];
  label: string;
  className?: string;
};

/**
 * Three proof chips: tabular-nums value (text-sm semibold) with the scope label
 * underneath (text-xs muted). Wrap under 640px, one row from 640px.
 * Hooks: `data-slot="proof-chips"` on the list, `data-slot="metric"` and
 * `data-slot="chip-label"` inside each chip.
 */
export function ProofChips({ chips, label, className }: Props) {
  if (chips.length === 0) return null;

  return (
    <ul
      data-slot="proof-chips"
      aria-label={label}
      className={["flex flex-wrap gap-2 sm:flex-nowrap", className]
        .filter(Boolean)
        .join(" ")}
    >
      {chips.map((chip) => (
        <li
          key={`${chip.metric ?? ""}${chip.label}`}
          className="flex min-w-0 flex-col gap-y-0.5 rounded-md border border-hairline px-3 py-2 hover:border-ink"
        >
          {chip.metric ? (
            <span
              data-slot="metric"
              className="text-sm font-semibold tabular-nums leading-tight text-ink"
            >
              {chip.metric}
            </span>
          ) : null}
          <span
            data-slot="chip-label"
            className="text-xs leading-tight text-muted"
          >
            {chip.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
