import { experience } from "@/content";

export function Experience() {
  return (
    <section
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
        {experience.map((role) => (
          <li
            key={`${role.company}-${role.start}`}
            className="border-t border-rule py-6 last:pb-0"
          >
            <p className="text-sm text-muted">
              {`${role.start}–${role.end}`}
              <span aria-hidden="true"> · </span>
              {role.location}
            </p>
            <h3 className="mt-1 font-serif text-lg tracking-tight">
              {role.title}
            </h3>
            <p>
              {role.url ? (
                <a
                  href={role.url}
                  className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
                >
                  {role.company}
                </a>
              ) : (
                role.company
              )}
            </p>
            <p className="mt-2 text-sm text-muted">{role.scopeLine}</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.95rem]">
              {role.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
