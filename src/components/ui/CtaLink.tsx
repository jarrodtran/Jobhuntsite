import type { Cta } from "@/lib/selectors";

type Variant = "primary" | "text";

type Props = {
  cta: Cta;
  variant?: Variant;
  className?: string;
};

const variantClass: Record<Variant, string> = {
  primary:
    "inline-flex items-center rounded-sm bg-accent px-3.5 py-2 text-meta font-medium text-accent-fg transition-opacity hover:opacity-90",
  text: "link text-meta",
};

/**
 * One link, two looks. `data-cta` carries the kind (resume | linkedin | email
 * | github) so FE Designer can target a specific CTA without touching markup.
 */
export function CtaLink({ cta, variant = "text", className }: Props) {
  return (
    <a
      href={cta.href}
      data-cta={cta.kind}
      data-variant={variant}
      className={[variantClass[variant], className].filter(Boolean).join(" ")}
      {...(cta.external ? { rel: "noopener" } : {})}
      {...(cta.kind === "resume" ? { type: "application/pdf" } : {})}
    >
      {cta.label}
    </a>
  );
}
