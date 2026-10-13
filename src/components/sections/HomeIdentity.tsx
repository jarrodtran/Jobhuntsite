import { sectionShellClass } from "@/components/layout/Section";
import { homeView, nowView } from "@/lib/selectors";

/**
 * First viewport: brand name, title, and Now as the supporting paragraph.
 * One composition — not a dashboard.
 */
export function HomeIdentity() {
  return (
    <section
      data-section="home"
      aria-labelledby="home-name"
      className={`${sectionShellClass} pt-20 sm:pt-24 lg:pt-28`}
    >
      <h1
        id="home-name"
        data-slot="name"
        className="font-display text-5xl font-normal leading-[0.95] sm:text-6xl lg:text-7xl"
      >
        {homeView.name}
      </h1>
      <p
        data-slot="title"
        className="mt-5 max-w-voice text-lg leading-snug text-muted sm:text-xl"
      >
        {homeView.title}
      </p>
      <div
        id={nowView.section.id}
        data-section={nowView.section.id}
        className="mt-10 max-w-voice border-t border-hairline pt-8 lg:mt-12"
      >
        <h2
          id={`${nowView.section.id}-heading`}
          data-slot="section-heading"
          className="text-label font-semibold uppercase tracking-label text-muted"
        >
          {nowView.heading}
        </h2>
        <p
          data-slot="now-body"
          className="mt-3 text-base leading-relaxed text-ink sm:text-lg"
        >
          {nowView.body}
        </p>
      </div>
    </section>
  );
}
