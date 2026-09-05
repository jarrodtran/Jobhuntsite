import { Section } from "@/components/layout/Section";
import { ExperienceRows } from "@/components/sections/ExperienceRows";
import { experienceView, proofBandView } from "@/lib/selectors";

/**
 * Hiring-manager scan path after Fit. Reverse-chronological rows; current role
 * open on first paint. Closed rows show an outcome preview; compact rows are
 * pedigree-only. `ExperienceRows` is the only client component on the page.
 *
 * Uses tight spacing when a proof strip precedes it; otherwise the normal
 * section gap (Fit → Experience).
 */
export function Experience() {
  return (
    <Section
      meta={experienceView.section}
      spacing={proofBandView.chips.length > 0 ? "tight" : "section"}
    >
      <ExperienceRows
        rows={experienceView.rows}
        dateRangeSeparator={experienceView.dateRangeSeparator}
      />
    </Section>
  );
}
