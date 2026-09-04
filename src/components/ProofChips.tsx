import type { ProofChip } from "@/content";
import { hasText } from "@/lib/content";

type Props = {
  chips: ProofChip[];
  className?: string;
};

/** Compact, scannable claims. Chips with no label are dropped; metric is optional. */
export function ProofChips({ chips, className }: Props) {
  const visible = chips.filter((chip) => hasText(chip.label));
  if (visible.length === 0) return null;

  return (
    <ul
      className={["flex flex-wrap gap-2", className].filter(Boolean).join(" ")}
      aria-label="Proof points"
    >
      {visible.map((chip) => (
        <li
          key={`${chip.metric ?? ""}${chip.label}`}
          className="inline-flex items-baseline gap-x-1.5 rounded-full border border-rule px-3 py-1 text-sm leading-snug"
        >
          {hasText(chip.metric) ? (
            <span className="font-medium tabular-nums text-foreground">
              {chip.metric}
            </span>
          ) : null}
          <span className="text-muted">{chip.label}</span>
        </li>
      ))}
    </ul>
  );
}
