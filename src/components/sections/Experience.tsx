import { Section } from "@/components/layout/Section";
import { Bullets } from "@/components/ui/Bullets";
import {
  experienceView,
  type DateLabel,
  type ExperienceView,
} from "@/lib/selectors";

/**
 * Reverse-chronological timeline. Each entry is an <article> whose `id` is the
 * anchor target for "Backed by" links in the roles section.
 *
 * Hooks: `data-section="experience"`, `data-entry="<id>"`, `data-slot` on
 * company, title, meta, scope, bullets.
 */
export function Experience() {
  return (
    <Section meta={experienceView.section}>
      <ol className="mt-6">
        {experienceView.entries.map((entry) => (
          <li key={entry.id}>
            <ExperienceItem entry={entry} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

function ExperienceItem({ entry }: { entry: ExperienceView }) {
  const headingId = `${entry.id}-heading`;

  return (
    <article
      id={entry.id}
      data-entry={entry.id}
      aria-labelledby={headingId}
      className="scroll-mt-16 border-t border-rule py-6"
    >
      <header>
        {entry.start || entry.end || entry.location ? (
          <p data-slot="meta" className="text-meta text-muted">
            {entry.start || entry.end ? (
              <span data-slot="dates">
                <DateText date={entry.start} />
                {entry.start && entry.end
                  ? experienceView.dateRangeSeparator
                  : null}
                <DateText date={entry.end} />
              </span>
            ) : null}
            {entry.location ? (
              <>
                {entry.start || entry.end ? (
                  <span aria-hidden="true"> · </span>
                ) : null}
                <span data-slot="location">{entry.location}</span>
              </>
            ) : null}
          </p>
        ) : null}
        <h3
          id={headingId}
          data-slot="title"
          className="mt-1 font-serif text-h3 tracking-tight"
        >
          {entry.title}
        </h3>
        <p data-slot="company">
          {entry.companyUrl ? (
            <a href={entry.companyUrl} rel="noopener" className="link">
              {entry.company}
            </a>
          ) : (
            entry.company
          )}
        </p>
      </header>

      {entry.scopeLine ? (
        <p data-slot="scope" className="mt-2 text-meta text-muted">
          {entry.scopeLine}
        </p>
      ) : null}

      <Bullets items={entry.bullets} className="mt-3" />
    </article>
  );
}

function DateText({ date }: { date: DateLabel | null }) {
  if (!date) return null;
  return date.dateTime ? (
    <time dateTime={date.dateTime}>{date.label}</time>
  ) : (
    <span>{date.label}</span>
  );
}
