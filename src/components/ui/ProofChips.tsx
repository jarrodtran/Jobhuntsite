import type { ProofChip } from "@/lib/schema";

type Props = {
  chips: ProofChip[];
  label: string;
  className?: string;
};

/**
 * Compact, scannable claims. Receives pre-filtered chips from the selector.
 * Hooks: `data-slot="proof-chips"` on the list, `data-slot="metric"` and
 * `data-slot="chip-label"` inside each chip.
 */
export function ProofChips({ chips, label, className }: Props) {
  if (chips.length === 0) return null;

  return (
    <ul
      data-slot="proof-chips"
      aria-label={label}
      className={["flex flex-wrap gap-2", className].filter(Boolean).join(" ")}
    >
      {chips.map((chip) => (
        <li
          key={`${chip.metric ?? ""}${chip.label}`}
          className="inline-flex items-baseline gap-x-1.5 rounded-full border border-rule px-3 py-1 text-meta leading-snug"
        >
          {chip.metric ? (
            <span
              data-slot="metric"
              className="font-medium tabular-nums text-foreground"
            >
              {chip.metric}
            </span>
          ) : null}
          <span data-slot="chip-label" className="text-muted">
            {chip.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
