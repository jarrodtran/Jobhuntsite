import type { ReactNode } from "react";
import type { SectionMeta } from "@/lib/schema";

/**
 * Shared shell for every top-level block. Single column, 40rem max, page pad
 * 1.25rem → 2rem at ≥768 (see `--container-content` in globals.css).
 *
 * Hooks: `data-section="<id>"` on the wrapper; `data-slot="section-heading"`
 * on the <h2>.
 */
export const sectionShellClass = "mx-auto w-full max-w-content px-5 md:px-8";

/** Section label: text-xs uppercase, wide tracking, muted. */
export const sectionLabelClass =
  "text-xs font-medium uppercase tracking-widest text-muted";

/**
 * Gap above the section. `section` is the default rhythm (`--spacing-section`);
 * `tight` (3rem) is for a section that directly follows the proof band.
 */
type Spacing = "section" | "tight";

const spacingClass: Record<Spacing, string> = {
  section: "mt-section",
  tight: "mt-12",
};

type Props = {
  meta: SectionMeta;
  children: ReactNode;
  spacing?: Spacing;
  className?: string;
};

export function headingId(meta: SectionMeta): string {
  return `${meta.id}-heading`;
}

export function Section({
  meta,
  children,
  spacing = "section",
  className,
}: Props) {
  return (
    <section
      id={meta.id}
      data-section={meta.id}
      aria-labelledby={headingId(meta)}
      className={[sectionShellClass, spacingClass[spacing], "scroll-mt-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      <h2
        id={headingId(meta)}
        data-slot="section-heading"
        className={sectionLabelClass}
      >
        {meta.heading}
      </h2>
      {children}
    </section>
  );
}
