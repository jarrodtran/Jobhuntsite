import type { ReactNode } from "react";
import { ANCHOR_OFFSET_CLASS } from "@/lib/chrome";
import type { SectionMeta } from "@/lib/schema";

/**
 * Shared shell for every top-level block. Single column on the responsive
 * measure (`--measure` in globals.css: full width <640, 44rem ≥640, 56rem
 * ≥1024), page pad 1.25rem → 2rem at ≥768. Voice copy uses `max-w-voice` (54ch).
 *
 * Hooks: `data-section="<id>"` on the wrapper; `data-slot="section-heading"`
 * on the <h2>.
 */
export const sectionShellClass = "mx-auto w-full max-w-content px-5 md:px-8";

/** Section label: 11px, semibold, uppercase, 0.14em tracking, muted. */
export const sectionLabelClass =
  "text-label font-semibold uppercase tracking-label text-muted";

type Props = {
  meta: SectionMeta;
  children: ReactNode;
  className?: string;
};

export function headingId(meta: SectionMeta): string {
  return `${meta.id}-heading`;
}

export function Section({
  meta,
  children,
  className,
}: Props) {
  return (
    <section
      id={meta.id}
      data-section={meta.id}
      aria-labelledby={headingId(meta)}
      className={[
        sectionShellClass,
        "mt-section",
        ANCHOR_OFFSET_CLASS,
        className,
      ]
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
