import { sectionShellClass } from "@/components/layout/Section";
import { proofBandView } from "@/lib/selectors";

/**
 * Proof strip: three secondary metrics ruled by hairlines — no tint, no cards,
 * left-aligned like a table in a memo. Values text-lg semibold tabular with
 * 11px caps labels: deliberately a full step under the hero figure so it
 * supports $260M instead of restating it.
 *
 * ≥640: one row, top and bottom rules, vertical rules between cells. ≥1024
 * the values step to text-xl and the cells take a little more air; still a
 * full step under the hero figure. <640: three ruled rows, figure left and
 * label right on the same baseline (the same memo-row grammar as the hero
 * pair). Sits 2.5rem under the hero (3rem at ≥1024); Experience follows 3rem
 * below (4rem at ≥1024). Renders nothing when Copy empties `proofBand`.
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
      className={`${sectionShellClass} mt-10 lg:mt-12`}
    >
      <ul
        data-slot="proof-metrics"
        className="divide-y divide-hairline border-y border-hairline sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        {proofBandView.chips.map((chip, index) => (
          <li
            key={`${chip.metric ?? ""}${chip.label}`}
            className={[
              "flex min-w-0 items-baseline justify-between gap-x-4 py-2.5",
              "sm:flex-col sm:py-3 lg:py-4",
              index === 0 ? "sm:pr-4 lg:pr-6" : "sm:px-4 lg:px-6",
            ].join(" ")}
          >
            {chip.metric ? (
              <span
                data-slot="metric"
                className="text-lg font-semibold tabular-nums leading-tight tracking-tight text-ink lg:text-xl"
              >
                {chip.metric}
              </span>
            ) : null}
            <span
              data-slot="chip-label"
              className="text-right text-label font-semibold uppercase tracking-label text-muted sm:mt-0.5 sm:text-left"
            >
              {chip.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
