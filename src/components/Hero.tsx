import { contact, hero, targetingLine } from "@/content";
import { asset } from "@/lib/asset";
import { hasText } from "@/lib/content";
import { ProofChips } from "@/components/ProofChips";

export function Hero() {
  const employers = hero.employers.filter(hasText);

  return (
    <section className="mx-auto max-w-[720px] px-6 pt-8" aria-labelledby="name">
      <h1
        id="name"
        className="font-serif text-[2.125rem] leading-[1.15] tracking-tight sm:text-[2.5rem]"
      >
        {hero.name}
      </h1>
      <p className="mt-2 text-lg text-foreground">{hero.title}</p>
      <p className="mt-4 max-w-[65ch]">{hero.voiceLine}</p>
      {hasText(targetingLine) ? (
        <p className="mt-3 text-[0.95rem] text-muted">{targetingLine}</p>
      ) : null}
      <ProofChips chips={hero.proofChips} className="mt-5" />
      {employers.length > 0 ? (
        <p className="mt-5 text-[0.95rem] text-foreground">
          {employers.join(" · ")}
        </p>
      ) : null}
      <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <a
          href={asset(contact.resumePdf)}
          className="rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          Resume
        </a>
        <a
          href={contact.linkedin}
          className="text-sm text-foreground underline decoration-rule underline-offset-4 hover:decoration-foreground"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${contact.email}`}
          className="text-sm text-foreground underline decoration-rule underline-offset-4 hover:decoration-foreground"
        >
          Email
        </a>
      </p>
    </section>
  );
}
