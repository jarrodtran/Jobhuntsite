import { Section } from "@/components/layout/Section";
import { rolesView } from "@/lib/selectors";

/**
 * Primary seat gets the proof block (summary + first evidence line + link into
 * Experience). Adjacent seats sit under a muted "Also a fit for" list — labels
 * only, so Fit does not compete with Experience for scan time.
 *
 * Hooks: `data-section="roles"`, `data-slot="primary-fit"`, `data-slot="also"`,
 * `data-role="<id>"`.
 */
export function Fit() {
  if (!rolesView.primary) return null;

  const { primary, also, alsoLabel, primaryBadge, section } = rolesView;

  return (
    <Section meta={section}>
      <div data-slot="primary-fit" data-role={primary.id} className="mt-4 lg:mt-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-base font-semibold tracking-tight text-ink lg:text-lg">
            {primary.label}
          </h3>
          <span
            data-slot="badge"
            className="text-label font-semibold uppercase tracking-label text-muted"
          >
            {primaryBadge}
          </span>
        </div>

        {primary.summary ? (
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink lg:text-base">
            {primary.summary}
          </p>
        ) : null}

        {primary.evidence ? (
          <p className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted">
            {primary.evidence}
          </p>
        ) : null}

        {primary.href ? (
          <p className="mt-3 text-sm">
            <a href={primary.href} className="link font-medium text-ink">
              See in experience
            </a>
          </p>
        ) : null}
      </div>

      {also.length > 0 ? (
        <div
          data-slot="also"
          className="mt-6 border-t border-hairline pt-5 lg:mt-7 lg:pt-6"
        >
          <p className="text-label font-semibold uppercase tracking-label text-muted">
            {alsoLabel}
          </p>
          <ul className="mt-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-muted lg:text-base">
            {also.map((role) => (
              <li
                key={role.id}
                data-role={role.id}
                className="after:text-muted after:content-['·'] last:after:content-none"
              >
                {role.href ? (
                  <a href={role.href} className="link hover:text-ink">
                    {role.label}
                  </a>
                ) : (
                  <span>{role.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
