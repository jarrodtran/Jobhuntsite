import type { ProofChip } from "@/lib/schema";

type Variant = "hero" | "band";

type Props = {
  chips: ProofChip[];
  label: string;
  /**
   * `hero`: text-2xl values, 1+2 wrap under 640px, first chip gets the ink
   * border (money leads). `band`: text-lg values, stacked under 640px, no lead.
   */
  variant: Variant;
  className?: string;
};

/** Card treatment shared with the open experience row: white, hairline, soft shadow, 0.75rem radius. */
export const cardClass =
  "rounded-card border border-hairline bg-surface shadow-card";

const listClass: Record<Variant, string> = {
  hero: "grid grid-cols-2 gap-3 sm:grid-cols-3",
  band: "grid grid-cols-1 gap-3 sm:grid-cols-3",
};

const chipClass: Record<Variant, string> = {
  hero: "px-5 py-4",
  band: "px-4 py-3",
};

const metricClass: Record<Variant, string> = {
  hero: "text-2xl",
  band: "text-lg",
};

/**
 * Proof chips as cards: tabular-nums value with the scope label underneath
 * (text-xs muted). Hooks: `data-slot="proof-chips"` on the list,
 * `data-lead="true"` on the leading hero chip, `data-slot="metric"` and
 * `data-slot="chip-label"` inside each chip.
 */
export function ProofChips({ chips, label, variant, className }: Props) {
  if (chips.length === 0) return null;

  return (
    <ul
      data-slot="proof-chips"
      aria-label={label}
      className={[listClass[variant], className].filter(Boolean).join(" ")}
    >
      {chips.map((chip, index) => {
        const lead = variant === "hero" && index === 0;

        return (
          <li
            key={`${chip.metric ?? ""}${chip.label}`}
            data-lead={lead || undefined}
            className={[
              "flex min-w-0 flex-col gap-y-1",
              cardClass,
              chipClass[variant],
              lead ? "col-span-2 border-[1.5px] border-ink sm:col-span-1" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {chip.metric ? (
              <span
                data-slot="metric"
                className={`${metricClass[variant]} font-semibold tabular-nums leading-tight text-ink`}
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
        );
      })}
    </ul>
  );
}
