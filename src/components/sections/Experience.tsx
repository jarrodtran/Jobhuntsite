import { Section } from "@/components/layout/Section";
import { ExperienceRows } from "@/components/sections/ExperienceRows";
import { experienceView } from "@/lib/selectors";

/**
 * Primary scan path. Reverse-chronological rows; each row is closed by default
 * except the current role. Closed = dates + title + company + scope line.
 * Open = the locked bullets. `ExperienceRows` is the only client component on
 * the page; everything else is static.
 */
export function Experience() {
  return (
    <Section meta={experienceView.section}>
      <ExperienceRows
        rows={experienceView.rows}
        dateRangeSeparator={experienceView.dateRangeSeparator}
      />
    </Section>
  );
}
