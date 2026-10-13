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
      className={`${sectionShellClass} pt-16 sm:pt-20 lg:pt-24`}
    >
      <h1
        id="home-name"
        data-slot="name"
        className="font-display text-6xl font-normal leading-[0.92] tracking-tight lg:text-7xl"
      >
        {homeView.name}
      </h1>
      <p data-slot="title" className="mt-4 text-base text-muted lg:text-lg">
        {homeView.title}
      </p>
      <div
        id={nowView.section.id}
        data-section={nowView.section.id}
        className="mt-8 max-w-voice lg:mt-10"
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
          className="mt-3 text-base leading-relaxed text-ink lg:text-lg"
        >
          {nowView.body}
        </p>
      </div>
    </section>
  );
}
