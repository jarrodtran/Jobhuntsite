import { sectionShellClass } from "@/components/layout/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { EmployerRow } from "@/components/ui/EmployerRow";
import { ProofChips } from "@/components/ui/ProofChips";
import { ResumeBar } from "@/components/ui/ResumeBar";
import { heroView } from "@/lib/selectors";

/**
 * The fold: name → market seat → optional edge → voice → proof block →
 * Resume + LinkedIn → employers. Seat (not the current job title) is the
 * routing signal; the lead chip carries the ops proof. Padding is tight on
 * short viewports so seat + lead figure + Resume stay inside ~700px.
 *
 * Hooks: `data-section="hero"`, `data-slot` on each row (name, seat, edge,
 * voice, proof-chips, ctas, employers); `data-component="resume-bar"`.
 */
export function Hero() {
  const headingId = `${heroView.section.id}-heading`;
  const heroResumeId = `${heroView.section.id}-resume`;

  return (
    <section
      id={heroView.section.id}
      data-section={heroView.section.id}
      aria-labelledby={headingId}
      className={`${sectionShellClass} pt-8 sm:pt-12 lg:pt-16`}
    >
      <hgroup>
        <p
          data-slot="name"
          className="text-4xl font-semibold leading-none tracking-tighter sm:text-5xl"
        >
          {heroView.name}
        </p>
        <h1
          id={headingId}
          data-slot="seat"
          className="mt-2.5 text-lg font-semibold leading-snug tracking-tight text-ink sm:mt-3 sm:text-xl lg:text-2xl"
        >
          {heroView.seat}
        </h1>
      </hgroup>

      {heroView.edge ? (
        <p
          data-slot="edge"
          className="mt-1 text-sm text-muted sm:mt-1.5 lg:text-base"
        >
          {heroView.edge}
        </p>
      ) : null}

      {heroView.voiceLine ? (
        <p
          data-slot="voice"
          className="mt-2 max-w-voice text-sm text-muted lg:mt-2.5 lg:text-base"
        >
          {heroView.voiceLine}
        </p>
      ) : null}

      <ProofChips
        chips={heroView.proofChips}
        label={heroView.proofChipsLabel}
        className="mt-5 sm:mt-7 lg:mt-8"
      />

      <div
        data-slot="ctas"
        className="mt-3.5 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:gap-3 lg:mt-5"
      >
        <CtaLink
          id={heroResumeId}
          cta={heroView.primaryCta}
          variant="solid"
          className="w-full sm:w-auto"
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
        className="mt-4 sm:mt-5"
      />

      <ResumeBar cta={heroView.primaryCta} watchId={heroResumeId} />
    </section>
  );
}
