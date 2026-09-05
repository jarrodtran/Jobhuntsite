import { cardClass, flatCardClass } from "@/components/ui/card";
import type { ProofChip } from "@/lib/schema";

type Props = {
  chips: ProofChip[];
  label: string;
  className?: string;
};

/**
 * Featured chip + pair. The first chip (money leads) is the punch: text-3xl
 * value, ink border, soft shadow. The rest sit at half weight: text-xl,
 * hairline, same radius, no shadow.
 *
 * ≥640: two columns — featured chip tall on the left (spans both rows), pair
 * stacked on the right. <640: featured chip full width, pair in a row under.
 *
 * Hooks: `data-slot="proof-chips"` on the list, `data-lead="true"` on the
 * featured chip, `data-slot="metric"` and `data-slot="chip-label"` inside.
 */
export function ProofChips({ chips, label, className }: Props) {
  if (chips.length === 0) return null;

  return (
    <ul
      data-slot="proof-chips"
      aria-label={label}
      className={["grid grid-cols-2 gap-3 sm:auto-rows-fr", className]
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
                ? `${cardClass} col-span-2 flex min-w-0 flex-col justify-center gap-y-1 border-[1.5px] border-ink px-5 py-5 sm:col-span-1 sm:row-span-2`
                : `${flatCardClass} flex min-w-0 flex-col justify-center gap-y-0.5 px-4 py-3`
            }
          >
            {chip.metric ? (
              <span
                data-slot="metric"
                className={[
                  "font-semibold tabular-nums leading-none text-ink",
                  lead ? "text-3xl tracking-tight" : "text-xl",
                ].join(" ")}
              >
                {chip.metric}
              </span>
            ) : null}
            <span
              data-slot="chip-label"
              className={[
                "leading-tight text-muted",
                lead ? "mt-1 text-sm" : "text-xs",
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
