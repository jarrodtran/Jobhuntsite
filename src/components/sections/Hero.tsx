import { sectionShellClass } from "@/components/layout/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { EmployerRow } from "@/components/ui/EmployerRow";
import { ProofChips } from "@/components/ui/ProofChips";
import { ResumeBar } from "@/components/ui/ResumeBar";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { heroView, navView } from "@/lib/selectors";

/**
 * The fold: name, Tesla title, mapping line, voice, Houston, proof, CTAs,
 * employers. Sticky Resume chrome follows the hero CTA out of view.
 *
 * Hooks: `data-section="hero"`, `data-slot` on each row (name, title, mapping,
 * voice, location, proof-chips, ctas, employers); `data-component="resume-bar|scroll-rail"`.
 */
export function Hero() {
  const headingId = `${heroView.section.id}-heading`;
  const heroResumeId = `${heroView.section.id}-resume`;

  return (
    <section
      id={heroView.section.id}
      data-section={heroView.section.id}
      aria-labelledby={headingId}
      className={`${sectionShellClass} pt-12 sm:pt-16 lg:pt-20`}
    >
      <hgroup>
        <h1
          id={headingId}
          data-slot="name"
          className="text-5xl font-semibold leading-none tracking-tighter"
        >
          {heroView.name}
        </h1>
        <p data-slot="title" className="mt-3 text-base text-muted lg:text-lg">
          {heroView.title}
        </p>
      </hgroup>

      {heroView.mappingLine ? (
        <p
          data-slot="mapping"
          className="mt-3 max-w-voice text-base text-ink lg:text-lg"
        >
          {heroView.mappingLine}
        </p>
      ) : null}

      {heroView.voiceLine ? (
        <p
          data-slot="voice"
          className="mt-1.5 max-w-voice text-sm text-muted lg:text-base"
        >
          {heroView.voiceLine}
        </p>
      ) : null}

      {heroView.location ? (
        <p data-slot="location" className="mt-1.5 text-sm text-muted">
          {heroView.location}
        </p>
      ) : null}

      <ProofChips
        chips={heroView.proofChips}
        label={heroView.proofChipsLabel}
        className="mt-8 lg:mt-10"
      />

      <div
        data-slot="ctas"
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-5"
      >
        <CtaLink
          id={heroResumeId}
          cta={heroView.primaryCta}
          variant="solid"
          className="w-full sm:min-w-36 sm:w-auto"
        />
        <CtaLink
          cta={heroView.secondaryCta}
          variant="ghost"
          className="w-full sm:w-auto"
        />
      </div>

      <EmployerRow
        employers={heroView.employers}
        label={heroView.employersLabel}
        className="mt-5"
      />

      <ResumeBar cta={heroView.primaryCta} watchId={heroResumeId} />
      <ScrollRail
        cta={heroView.primaryCta}
        watchId={heroResumeId}
        wordmark={navView.wordmark}
        homeHref={navView.homeHref}
      />
    </section>
  );
}
