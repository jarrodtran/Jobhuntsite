import { sectionShellClass } from "@/components/layout/Section";
import { nowView } from "@/lib/selectors";

/** What’s going on. Homepage lead after the name. */
export function Now() {
  const headingId = `${nowView.section.id}-heading`;

  return (
    <section
      id={nowView.section.id}
      data-section={nowView.section.id}
      aria-labelledby={headingId}
      className={`${sectionShellClass} mt-10 lg:mt-12`}
    >
      <h2
        id={headingId}
        data-slot="section-heading"
        className="text-label font-semibold uppercase tracking-label text-muted"
      >
        {nowView.heading}
      </h2>
      <p
        data-slot="now-body"
        className="mt-3 max-w-voice text-base leading-relaxed text-ink lg:text-lg"
      >
        {nowView.body}
      </p>
    </section>
  );
}
