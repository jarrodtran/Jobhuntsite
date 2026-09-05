import { Section } from "@/components/layout/Section";
import { rolesView } from "@/lib/selectors";

/**
 * "Where I fit" as one line of text links, not chips. Each role links to the
 * experience row that backs it (the accordion opens that row on hash change).
 * Primary role first, set in ink with the badge as an 11px caps aside; the
 * rest are muted. Summaries and evidence are not rendered — proof lives in the
 * Experience bullets.
 *
 * Hooks: `data-section="roles"`, `data-slot="role-chips"`, `data-role="<id>"`,
 * `data-primary="true|false"`, `data-slot="badge"`.
 */
export function Fit() {
  if (rolesView.chips.length === 0) return null;

  return (
    <Section meta={rolesView.section}>
      <ul
        data-slot="role-chips"
        className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-base lg:mt-4 lg:gap-x-4 lg:text-lg"
      >
        {rolesView.chips.map((chip) => {
          const linkClass = [
            "link",
            chip.primary ? "font-semibold text-ink" : "text-muted hover:text-ink",
          ].join(" ");

          return (
            <li
              key={chip.id}
              data-role={chip.id}
              data-primary={chip.primary}
              className="flex items-baseline gap-x-3 after:text-muted after:content-['·'] last:after:content-none lg:gap-x-4"
            >
              {chip.href ? (
                <a href={chip.href} className={linkClass}>
                  {chip.label}
                </a>
              ) : (
                <span className={linkClass}>{chip.label}</span>
              )}
              {chip.primary ? (
                <span
                  data-slot="badge"
                  className="text-label font-semibold uppercase tracking-label text-muted"
                >
                  {rolesView.primaryBadge}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
