import { Section } from "@/components/layout/Section";
import { ExperienceRows } from "@/components/sections/ExperienceRows";
import { experienceView, proofBandView } from "@/lib/selectors";

/**
 * Primary scan path. Reverse-chronological rows; each row is closed by default
 * except the current role. Closed = dates + title + company + scope line.
 * Open = the locked bullets. `ExperienceRows` is the only client component on
 * the page; everything else is static.
 *
 * Sits 3rem under the proof strip; falls back to the normal section gap when
 * Copy has emptied `proofBand`.
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
