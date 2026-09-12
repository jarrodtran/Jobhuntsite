import { Section } from "@/components/layout/Section";
import { ExperienceRows } from "@/components/sections/ExperienceRows";
import { experienceView, proofBandView } from "@/lib/selectors";

/**
 * Reverse-chronological rows. Current role open on first paint. Closed rows
 * show dates, title, company, and scope. Education is one line under the list.
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
      {experienceView.education ? (
        <p data-slot="education" className="mt-6 text-sm text-muted">
          {experienceView.education}
        </p>
      ) : null}
    </Section>
  );
}
