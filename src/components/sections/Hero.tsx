import { sectionShellClass } from "@/components/layout/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { EmployerRow } from "@/components/ui/EmployerRow";
import { ProofChips } from "@/components/ui/ProofChips";
import { ResumeBar } from "@/components/ui/ResumeBar";
import { heroView } from "@/lib/selectors";

/**
 * The fold, one punch. Left-aligned stack in this order and no other:
 * name (text-5xl, tracking-tighter) → title (muted) → voice (text-sm, muted:
 * a whisper) → the $260M figure block with the secondary pair → Resume
 * (solid ink) + LinkedIn (ghost) → one muted employer line. Nothing else
 * competes with the number. Under 640px a fixed Resume bar also rides the
 * bottom edge until the hero has scrolled off.
 *
 * Hooks: `data-section="hero"`, `data-slot` on each row (name, title, voice,
 * proof-chips, ctas, employers); `data-component="resume-bar"`.
 */
export function Hero() {
  const headingId = `${heroView.section.id}-heading`;

  return (
    <section
      id={heroView.section.id}
      data-section={heroView.section.id}
      aria-labelledby={headingId}
      className={`${sectionShellClass} pt-12 sm:pt-16`}
    >
      <hgroup>
        <h1
          id={headingId}
          data-slot="name"
          className="text-5xl font-semibold leading-none tracking-tighter"
        >
          {heroView.name}
        </h1>
        <p data-slot="title" className="mt-3 text-base text-muted">
          {heroView.title}
        </p>
      </hgroup>

      {heroView.voiceLine ? (
        <p data-slot="voice" className="mt-1.5 max-w-voice text-sm text-muted">
          {heroView.voiceLine}
        </p>
      ) : null}

      <ProofChips
        chips={heroView.proofChips}
        label={heroView.proofChipsLabel}
        className="mt-8"
      />

      <div data-slot="ctas" className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-3">
        <CtaLink
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
        className="mt-5"
      />

      <ResumeBar cta={heroView.primaryCta} watchId={heroView.section.id} />
    </section>
  );
}
