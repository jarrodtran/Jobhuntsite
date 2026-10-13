import { sectionShellClass } from "@/components/layout/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { ResumeBar } from "@/components/ui/ResumeBar";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { navView, workHeaderView } from "@/lib/selectors";

/**
 * Compact /work identity: name, title, Resume + LinkedIn.
 * Sticky Resume chrome watches #work-resume (work page only).
 */
export function WorkHeader() {
  const headingId = "work-heading";
  const resumeId = "work-resume";

  return (
    <section
      id={workHeaderView.section.id}
      data-section={workHeaderView.section.id}
      aria-labelledby={headingId}
      className={`${sectionShellClass} pt-20 sm:pt-24 lg:pt-28`}
    >
      <hgroup>
        <h1
          id={headingId}
          data-slot="name"
          className="font-display text-4xl font-normal leading-[0.95] sm:text-5xl lg:text-6xl"
        >
          {workHeaderView.name}
        </h1>
        <p
          data-slot="title"
          className="mt-5 max-w-voice text-lg leading-snug text-muted"
        >
          {workHeaderView.title}
        </p>
      </hgroup>

      {workHeaderView.mappingLine ? (
        <p
          data-slot="mapping"
          className="mt-4 max-w-voice text-base leading-relaxed text-ink lg:text-lg"
        >
          {workHeaderView.mappingLine}
        </p>
      ) : null}

      <div
        data-slot="ctas"
        className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3"
      >
        <CtaLink
          id={resumeId}
          cta={workHeaderView.primaryCta}
          variant="solid"
          className="min-w-32"
        />
        <CtaLink cta={workHeaderView.secondaryCta} variant="ghost" />
        {workHeaderView.location ? (
          <p data-slot="location" className="text-sm text-muted">
            {workHeaderView.location}
          </p>
        ) : null}
      </div>

      <ResumeBar cta={workHeaderView.primaryCta} watchId={resumeId} />
      <ScrollRail
        cta={workHeaderView.primaryCta}
        watchId={resumeId}
        wordmark={navView.wordmark}
        homeHref={navView.homeHref}
      />
    </section>
  );
}
