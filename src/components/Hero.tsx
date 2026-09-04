import { profile, targetingLine } from "@/content";
import { asset } from "@/lib/asset";

export function Hero() {
  return (
    <section className="mx-auto max-w-[720px] px-6 pt-8" aria-labelledby="name">
      <h1
        id="name"
        className="font-serif text-[2.125rem] leading-[1.15] tracking-tight sm:text-[2.5rem]"
      >
        {profile.name}
      </h1>
      <p className="mt-2 text-lg text-foreground">{profile.primaryTitle}</p>
      <p className="mt-4 max-w-[65ch]">{profile.positioning}</p>
      <p className="mt-3 text-[0.95rem] text-muted">{targetingLine}</p>
      <p className="mt-5 text-[0.95rem] text-foreground">
        {profile.employers.join(" · ")}
      </p>
      <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <a
          href={asset(profile.resumePdf)}
          className="rounded-sm bg-accent px-3.5 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          Resume
        </a>
        <a
          href={profile.linkedin}
          className="text-sm text-foreground underline decoration-rule underline-offset-4 hover:decoration-foreground"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="text-sm text-foreground underline decoration-rule underline-offset-4 hover:decoration-foreground"
        >
          Email
        </a>
      </p>
    </section>
  );
}
