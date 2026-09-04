import { primaryRole, secondaryRoles, type Role } from "@/content";
import { experienceByIds, hasText } from "@/lib/content";

export function Roles() {
  const ordered = [primaryRole, ...secondaryRoles];

  return (
    <section
      id="roles"
      className="mx-auto mt-16 max-w-[720px] px-6"
      aria-labelledby="roles-heading"
    >
      <h2
        id="roles-heading"
        className="font-serif text-xl tracking-tight sm:text-2xl"
      >
        Where I fit
      </h2>
      <ol className="mt-6">
        {ordered.map((role) => (
          <RoleSection key={role.id} role={role} />
        ))}
      </ol>
    </section>
  );
}

function RoleSection({ role }: { role: Role }) {
  const evidence = role.evidence.filter(hasText);
  const related = experienceByIds(role.experienceIds);
  const headingId = `role-${role.id}`;

  return (
    <li
      id={headingId}
      className="border-t border-rule py-6 last:pb-0"
      aria-labelledby={`${headingId}-heading`}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3
          id={`${headingId}-heading`}
          className="font-serif text-lg tracking-tight"
        >
          {role.label}
        </h3>
        {role.primary ? (
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
            Primary target
          </span>
        ) : null}
      </div>
      {hasText(role.summary) ? (
        <p className="mt-2 max-w-[65ch]">{role.summary}</p>
      ) : null}
      {evidence.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-[0.95rem]">
          {evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {related.length > 0 ? (
        <p className="mt-3 text-sm text-muted">
          <span>Backed by: </span>
          {related.map((entry, index) => (
            <span key={entry.id}>
              {index > 0 ? ", " : null}
              <a
                href={`#${entry.id}`}
                className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
              >
                {entry.company}
              </a>
            </span>
          ))}
        </p>
      ) : null}
    </li>
  );
}
