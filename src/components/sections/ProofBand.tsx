import { sectionShellClass } from "@/components/layout/Section";
import { proofBandView } from "@/lib/selectors";

/**
 * One full-bleed stone-100 strip between the hero and Experience: the three
 * secondary metrics side by side, split by vertical hairlines, values centered
 * at text-lg. A quieter echo of the hero chips, not a second chip row. The
 * strip spans the viewport; the metrics stay inside the 40rem column. Sits
 * 2.5rem under the hero; Experience follows 3rem below. Renders nothing when
 * Copy empties `proofBand`.
 *
 * Hooks: `data-component="proof-band"`, `data-slot="proof-metrics"` on the
 * list, `data-slot="metric"` and `data-slot="chip-label"` inside each cell.
 */
export function ProofBand() {
  if (proofBandView.chips.length === 0) return null;

  return (
    <section
      data-component="proof-band"
      aria-label={proofBandView.label}
      className="mt-10 bg-band py-5"
    >
      <ul
        data-slot="proof-metrics"
        className={`${sectionShellClass} grid grid-cols-3 divide-x divide-hairline text-center`}
      >
        {proofBandView.chips.map((chip) => (
          <li
            key={`${chip.metric ?? ""}${chip.label}`}
            className="flex min-w-0 flex-col items-center gap-y-0.5 px-2"
          >
            {chip.metric ? (
              <span
                data-slot="metric"
                className="text-lg font-semibold tabular-nums leading-tight text-ink"
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
    </section>
  );
}
