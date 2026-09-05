import { sectionShellClass } from "@/components/layout/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { EmployerRow } from "@/components/ui/EmployerRow";
import { ProofChips } from "@/components/ui/ProofChips";
import { heroView } from "@/lib/selectors";

/**
 * First viewport, in reading order: name → title → voice line → proof chips →
 * employers → CTAs. This is the recruiter's five-second scan; nothing else
 * belongs here.
 *
 * Hooks: `data-section="hero"`, `data-slot` on each row (name, title, voice,
 * proof-chips, employers, ctas).
 */
export function Hero() {
  const headingId = `${heroView.section.id}-heading`;

  return (
    <section
      id={heroView.section.id}
      data-section={heroView.section.id}
      aria-labelledby={headingId}
      className={`${sectionShellClass} pt-8`}
    >
      <hgroup>
        <h1
          id={headingId}
          data-slot="name"
          className="font-serif text-display tracking-tight sm:text-display-lg"
        >
          {heroView.name}
        </h1>
        <p data-slot="title" className="mt-2 text-h3 text-foreground">
          {heroView.title}
        </p>
      </hgroup>

      {heroView.voiceLine ? (
        <p data-slot="voice" className="mt-4 max-w-measure">
          {heroView.voiceLine}
        </p>
      ) : null}

      <ProofChips
        chips={heroView.proofChips}
        label={heroView.proofChipsLabel}
        className="mt-5"
      />

      <EmployerRow
        employers={heroView.employers}
        label={heroView.employersLabel}
        className="mt-5"
      />

      <div
        data-slot="ctas"
        className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2"
      >
        {heroView.ctas.map((cta, index) => (
          <CtaLink
            key={cta.kind}
            cta={cta}
            variant={index === 0 ? "primary" : "text"}
          />
        ))}
      </div>
    </section>
  );
}
