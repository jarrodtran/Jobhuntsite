import type { ReactNode } from "react";
import type { SectionMeta } from "@/lib/schema";

/**
 * Shared shell for every top-level section. Owns the container width, gutter,
 * and vertical rhythm so FE Designer changes them once (see `--container-content`,
 * `--spacing-gutter`, `--spacing-section` in globals.css).
 *
 * Hooks: `data-section="<id>"` on the wrapper; `data-slot="section-heading"`
 * on the <h2>.
 */
export const sectionShellClass =
  "mx-auto w-full max-w-content px-gutter";

type Props = {
  meta: SectionMeta;
  as?: "section" | "footer";
  children: ReactNode;
  className?: string;
};

export function headingId(meta: SectionMeta): string {
  return `${meta.id}-heading`;
}

export function Section({ meta, as: Tag = "section", children, className }: Props) {
  return (
    <Tag
      id={meta.id}
      data-section={meta.id}
      aria-labelledby={headingId(meta)}
      className={[sectionShellClass, "mt-section", className]
        .filter(Boolean)
        .join(" ")}
    >
      <h2
        id={headingId(meta)}
        data-slot="section-heading"
        className="font-serif text-h2 tracking-tight"
      >
        {meta.heading}
      </h2>
      {children}
    </Tag>
  );
}
