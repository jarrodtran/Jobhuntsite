import { Section } from "@/components/layout/Section";
import { rolesView } from "@/lib/selectors";

/**
 * "Where I fit", demoted to one compact row of role chips. Primary role first
 * with the only badge. Summaries and evidence are not rendered — proof lives
 * in the Experience bullets.
 *
 * Hooks: `data-section="roles"`, `data-slot="role-chips"`, `data-role="<id>"`,
 * `data-primary="true|false"`, `data-slot="badge"`.
 */
export function Fit() {
  if (rolesView.chips.length === 0) return null;

  return (
    <Section meta={rolesView.section}>
      <ul data-slot="role-chips" className="mt-4 flex flex-wrap gap-2">
        {rolesView.chips.map((chip) => (
          <li
            key={chip.id}
            data-role={chip.id}
            data-primary={chip.primary}
            className="inline-flex items-center gap-x-2 rounded-md border border-hairline px-3 py-2 text-sm text-ink hover:border-ink"
          >
            <span>{chip.label}</span>
            {chip.primary ? (
              <span
                data-slot="badge"
                className="rounded-sm bg-accent px-1.5 py-0.5 text-xs font-medium text-bg"
              >
                {rolesView.primaryBadge}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
