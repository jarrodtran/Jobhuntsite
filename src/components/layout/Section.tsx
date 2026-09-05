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

type Props = {
  meta: SectionMeta;
  children: ReactNode;
  className?: string;
};

export function headingId(meta: SectionMeta): string {
  return `${meta.id}-heading`;
}

export function Section({ meta, children, className }: Props) {
  return (
    <section
      id={meta.id}
      data-section={meta.id}
      aria-labelledby={headingId(meta)}
      className={[sectionShellClass, "mt-section scroll-mt-8", className]
        .filter(Boolean)
        .join(" ")}
    >
      <h2
        id={headingId(meta)}
        data-slot="section-heading"
        className="text-sm font-medium text-muted"
      >
        {meta.heading}
      </h2>
      {children}
    </section>
  );
}
