import type { ReactNode } from "react";
import { Fragment } from "react";
import { Section, sectionLabelClass } from "@/components/layout/Section";
import { FOCUS_VISIBLE_CLASS } from "@/lib/focus";
import { rolesView, type FitLane, type FitLink } from "@/lib/selectors";

/**
 * Filing sentence beside two labeled lanes. Company names in the prose are
 * the hash links; there is no chip row.
 *
 * Hooks: `data-section="roles"`, `data-slot="intro|thesis|adjacent"`,
 * `data-role="<id>"`, `data-slot="fit-links"`.
 */
export function Fit() {
  if (!rolesView.thesis) return null;

  return (
    <Section meta={rolesView.section}>
      <div className="mt-5 flex flex-col gap-10 lg:mt-6 lg:flex-row lg:items-start lg:gap-16">
        {rolesView.intro ? (
          <p
            data-slot="intro"
            className="min-w-0 flex-1 text-base leading-relaxed text-ink lg:text-lg"
          >
            {rolesView.intro}
          </p>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <FitLaneBlock lane={rolesView.thesis} slot="thesis" />
          {rolesView.adjacent ? (
            <FitLaneBlock lane={rolesView.adjacent} slot="adjacent" />
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function FitLaneBlock({
  lane,
  slot,
}: {
  lane: FitLane;
  slot: "thesis" | "adjacent";
}) {
  return (
    <div data-slot={slot} data-role={lane.id}>
      <h3 className={sectionLabelClass}>{lane.label}</h3>
      <p
        data-slot="fit-links"
        className="mt-2 text-base leading-relaxed text-ink"
      >
        {linkifyFitSummary(lane.summary, lane.links)}
      </p>
    </div>
  );
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Wrap the first occurrence of each Fit link label in the summary. */
function linkifyFitSummary(
  summary: string,
  links: readonly FitLink[],
): ReactNode {
  const usable = links.filter((link) => summary.includes(link.label));
  if (usable.length === 0) return summary;

  const sorted = [...usable].sort((a, b) => b.label.length - a.label.length);
  const pattern = new RegExp(
    `(${sorted.map((link) => escapeRegExp(link.label)).join("|")})`,
    "g",
  );
  const hrefByLabel = new Map(usable.map((link) => [link.label, link.href]));
  const seen = new Set<string>();

  return summary.split(pattern).map((part, index) => {
    const href = hrefByLabel.get(part);
    if (!href || seen.has(part)) {
      return <Fragment key={index}>{part}</Fragment>;
    }
    seen.add(part);
    return (
      <a
        key={`${href}-${index}`}
        href={href}
        className={`link text-ink ${FOCUS_VISIBLE_CLASS}`}
      >
        {part}
      </a>
    );
  });
}
