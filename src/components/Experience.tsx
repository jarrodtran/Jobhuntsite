import { experience } from "@/content";
import { hasText, joinMeta } from "@/lib/content";

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto mt-16 max-w-[720px] px-6"
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        className="font-serif text-xl tracking-tight sm:text-2xl"
      >
        Experience
      </h2>
      <ol className="mt-6">
        {experience.map((entry) => {
          const dates = joinMeta([entry.start, entry.end], "–");
          const meta = joinMeta([dates, entry.location]);
          const bullets = entry.bullets.filter(hasText);

          return (
            <li
              key={entry.id}
              id={entry.id}
              className="border-t border-rule py-6 last:pb-0"
            >
              {hasText(meta) ? (
                <p className="text-sm text-muted">{meta}</p>
              ) : null}
              <h3 className="mt-1 font-serif text-lg tracking-tight">
                {entry.title}
              </h3>
              <p>
                {hasText(entry.url) ? (
                  <a
                    href={entry.url}
                    className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
                  >
                    {entry.company}
                  </a>
                ) : (
                  entry.company
                )}
              </p>
              {hasText(entry.scopeLine) ? (
                <p className="mt-2 text-sm text-muted">{entry.scopeLine}</p>
              ) : null}
              {bullets.length > 0 ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.95rem]">
                  {bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
