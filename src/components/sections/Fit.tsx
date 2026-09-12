import { Section } from "@/components/layout/Section";
import { FOCUS_VISIBLE_CLASS } from "@/lib/focus";
import { rolesView, type FitLane } from "@/lib/selectors";

/**
 * Primary thesis plus one adjacent lane. Hash links open the backing
 * experience row.
 *
 * Hooks: `data-section="roles"`, `data-slot="thesis|adjacent"`,
 * `data-role="<id>"`, `data-slot="fit-links"`.
 */
export function Fit() {
  if (!rolesView.thesis) return null;

  return (
    <Section meta={rolesView.section}>
      <div className="mt-3 flex flex-col gap-4 text-base lg:mt-4 lg:text-lg">
        <FitParagraph lane={rolesView.thesis} slot="thesis" />
        {rolesView.adjacent ? (
          <FitParagraph lane={rolesView.adjacent} slot="adjacent" />
        ) : null}
      </div>
    </Section>
  );
}

function FitParagraph({
  lane,
  slot,
}: {
  lane: FitLane;
  slot: "thesis" | "adjacent";
}) {
  return (
    <div data-slot={slot} data-role={lane.id}>
      {slot === "adjacent" ? (
        <p className="text-ink">
          <span className="font-semibold">{lane.label}. </span>
          <span className="text-muted">{lane.summary}</span>
        </p>
      ) : (
        <p className="text-ink">{lane.summary}</p>
      )}
      {lane.links.length > 0 ? (
        <ul
          data-slot="fit-links"
          className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-muted lg:text-base"
        >
          {lane.links.map((link) => (
            <li
              key={link.href}
              className="after:text-muted after:content-['·'] last:after:content-none"
            >
              <a
                href={link.href}
                className={`link text-muted hover:text-ink ${FOCUS_VISIBLE_CLASS}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
