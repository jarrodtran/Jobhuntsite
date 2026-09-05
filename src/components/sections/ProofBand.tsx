import { sectionShellClass } from "@/components/layout/Section";
import { ProofChips } from "@/components/ui/ProofChips";
import { proofBandView } from "@/lib/selectors";

/**
 * Full-bleed stone-100 strip between the hero and Experience carrying the
 * secondary metrics. The strip spans the viewport; the chips stay inside the
 * 40rem column. Sits 2.5rem under the hero; Experience follows 3rem below.
 * Renders nothing when Copy empties `proofBand`.
 *
 * Hooks: `data-component="proof-band"`, `data-slot="proof-chips"` inside.
 */
export function ProofBand() {
  if (proofBandView.chips.length === 0) return null;

  return (
    <section
      data-component="proof-band"
      aria-label={proofBandView.label}
      className="mt-10 bg-band py-8"
    >
      <div className={sectionShellClass}>
        <ProofChips
          chips={proofBandView.chips}
          label={proofBandView.label}
          variant="band"
        />
      </div>
    </section>
  );
}
