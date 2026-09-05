import type { ReactNode } from "react";
import type { SectionMeta } from "@/lib/schema";

/**
 * Shared shell for every top-level block. Single column on the responsive
 * measure (`--measure` in globals.css: full width <640, 44rem ≥640, 52rem
 * ≥1024; never past 56rem), page pad 1.25rem → 2rem at ≥768.
 *
 * Hooks: `data-section="<id>"` on the wrapper; `data-slot="section-heading"`
 * on the <h2>.
 */
export const sectionShellClass = "mx-auto w-full max-w-content px-5 md:px-8";

/** Section label: 11px, semibold, uppercase, 0.14em tracking, muted. */
export const sectionLabelClass =
  "text-label font-semibold uppercase tracking-label text-muted";

/**
 * Gap above the section. `section` is the default rhythm (`--spacing-section`:
 * 5rem, 6rem at ≥1024); `tight` (3rem, 4rem at ≥1024) is for a section that
 * directly follows the proof strip.
 */
type Spacing = "section" | "tight";

const spacingClass: Record<Spacing, string> = {
  section: "mt-section",
  tight: "mt-12 lg:mt-16",
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
