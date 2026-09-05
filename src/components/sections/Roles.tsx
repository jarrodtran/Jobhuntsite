import { Section } from "@/components/layout/Section";
import { Bullets } from "@/components/ui/Bullets";
import { rolesView, type RoleView } from "@/lib/selectors";

/**
 * "Where I fit": the primary target role first, at full weight, then the
 * secondary roles grouped under "Also a fit for". Each role links back to the
 * experience entries that back it.
 *
 * Hooks: `data-section="roles"`, `data-role="<id>"`, `data-primary="true|false"`,
 * `data-slot="primary-role" | "secondary-roles"`.
 */
export function Roles() {
  const { primary, secondary } = rolesView;

  return (
    <Section meta={rolesView.section}>
      <div data-slot="primary-role" className="mt-6">
        <RoleCard role={primary} headingLevel={3} />
      </div>

      {secondary.length > 0 ? (
        <div data-slot="secondary-roles" className="mt-block">
          <h3
            id="roles-secondary-heading"
            className="text-meta font-medium uppercase tracking-wide text-muted"
          >
            {rolesView.secondaryHeading}
          </h3>
          <ol aria-labelledby="roles-secondary-heading" className="mt-2">
            {secondary.map((role) => (
              <li key={role.id}>
                <RoleCard role={role} headingLevel={4} />
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </Section>
  );
}

type RoleCardProps = {
  role: RoleView;
  headingLevel: 3 | 4;
};

function RoleCard({ role, headingLevel }: RoleCardProps) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  const headingId = `${role.anchorId}-heading`;

  return (
    <article
      id={role.anchorId}
      data-role={role.id}
      data-primary={role.primary}
      aria-labelledby={headingId}
      className="border-t border-rule py-6"
    >
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Heading
          id={headingId}
          data-slot="role-label"
          className="font-serif text-h3 tracking-tight"
        >
          {role.label}
        </Heading>
        {role.primary ? (
          <span
            data-slot="badge"
            className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent"
          >
            {rolesView.primaryBadge}
          </span>
        ) : null}
      </header>

      {role.summary ? (
        <p data-slot="role-summary" className="mt-2 max-w-measure">
          {role.summary}
        </p>
      ) : null}

      <Bullets items={role.evidence} className="mt-3" />

      {role.backedBy.length > 0 ? (
        <p data-slot="backed-by" className="mt-3 text-meta text-muted">
          <span>{rolesView.backedByLabel}: </span>
          {role.backedBy.map((anchor, index) => (
            <span key={anchor.href}>
              {index > 0 ? ", " : null}
              <a href={anchor.href} className="link">
                {anchor.label}
              </a>
            </span>
          ))}
        </p>
      ) : null}
    </article>
  );
}
