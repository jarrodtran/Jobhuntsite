import { sectionShellClass } from "@/components/layout/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { EmployerRow } from "@/components/ui/EmployerRow";
import { ProofChips } from "@/components/ui/ProofChips";
import { heroView } from "@/lib/selectors";

/**
 * First viewport, dense left-aligned stack in this order and no other:
 * name (text-4xl) → title (text-base muted) → voice (text-sm muted, demoted)
 * → chip cards (money leads, ink border) → CTAs flush under the chips (Resume
 * solid ink, LinkedIn ghost) → quiet employer strip. Not a centered marketing
 * hero.
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
          className="text-4xl font-semibold tracking-tight"
        >
          {heroView.name}
        </h1>
        <p data-slot="title" className="mt-2 text-base font-medium text-muted">
          {heroView.title}
        </p>
      </hgroup>

      {heroView.voiceLine ? (
        <p data-slot="voice" className="mt-2 max-w-voice text-sm text-muted">
          {heroView.voiceLine}
        </p>
      ) : null}

      <ProofChips
        chips={heroView.proofChips}
        label={heroView.proofChipsLabel}
        variant="hero"
        className="mt-6"
      />

      <div data-slot="ctas" className="mt-3 flex flex-col gap-3 sm:flex-row">
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
    </section>
  );
}
