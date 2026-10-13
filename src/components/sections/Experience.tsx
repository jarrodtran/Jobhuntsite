import { Section } from "@/components/layout/Section";
import { ExperienceRows } from "@/components/sections/ExperienceRows";
import { experienceView } from "@/lib/selectors";

/**
 * Reverse-chronological rows on /work. Current role open on first paint.
 * Closed rows show dates, title, company, and scope. Education is one line
 * under the list. Full section gap under WorkHeader so the recruiter path breathes.
 */
export function Experience() {
  return (
    <Section meta={experienceView.section} spacing="section">
      <ExperienceRows
        rows={experienceView.rows}
        dateRangeSeparator={experienceView.dateRangeSeparator}
      />
      {experienceView.education ? (
        <p
          data-slot="education"
          className="mt-8 max-w-voice font-mono text-xs leading-relaxed tracking-wide text-muted"
        >
          {experienceView.education}
        </p>
      ) : null}
    </Section>
  );
}
