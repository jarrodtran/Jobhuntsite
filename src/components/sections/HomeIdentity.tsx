import { sectionShellClass } from "@/components/layout/Section";
import { homeView } from "@/lib/selectors";

/** Brand-first home identity. Name owns the first viewport with title under it. */
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
    </section>
  );
}