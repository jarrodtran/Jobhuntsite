import { sectionShellClass } from "@/components/layout/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { EmployerRow } from "@/components/ui/EmployerRow";
import { ProofChips } from "@/components/ui/ProofChips";
import { heroView } from "@/lib/selectors";

/**
 * First viewport, tight left-aligned stack in this order and no other:
 * name → title → voice → chips → CTAs (Resume solid, LinkedIn outline) →
 * employer strip. Not a centered marketing hero.
 *
 * Hooks: `data-section="hero"`, `data-slot` on each row (name, title, voice,
 * proof-chips, ctas, employers).
 */
export function Hero() {
  const headingId = `${heroView.section.id}-heading`;

  return (
    <section
      id={heroView.section.id}
      data-section={heroView.section.id}
      aria-labelledby={headingId}
      className={`${sectionShellClass} pt-10`}
    >
      <hgroup>
        <h1
          id={headingId}
          data-slot="name"
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {heroView.name}
        </h1>
        <p data-slot="title" className="mt-2 text-lg font-medium text-muted">
          {heroView.title}
        </p>
      </hgroup>

      {heroView.voiceLine ? (
        <p data-slot="voice" className="mt-4 max-w-voice text-base">
          {heroView.voiceLine}
        </p>
      ) : null}

      <ProofChips
        chips={heroView.proofChips}
        label={heroView.proofChipsLabel}
        className="mt-6"
      />

      <div data-slot="ctas" className="mt-6 flex flex-col gap-2 sm:flex-row">
        <CtaLink cta={heroView.primaryCta} variant="solid" />
        <CtaLink cta={heroView.secondaryCta} variant="outline" />
      </div>

      <EmployerRow
        employers={heroView.employers}
        label={heroView.employersLabel}
        className="mt-6"
      />
    </section>
  );
}
