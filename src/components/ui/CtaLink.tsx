import type { Cta } from "@/lib/selectors";

type Variant = "solid" | "ghost";

type Props = {
  cta: Cta;
  variant: Variant;
  className?: string;
};

const baseClass =
  "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold";

/** Solid = ink fill. Ghost = no border; band tint on hover. No motion. */
const variantClass: Record<Variant, string> = {
  solid: "bg-ink text-bg hover:bg-accent",
  ghost: "bg-transparent text-ink hover:bg-band",
};

/**
 * `data-cta` carries the kind (resume | linkedin | email) and `data-variant`
 * the look, so FE Designer can target either without touching markup.
 */
export function CtaLink({ cta, variant, className }: Props) {
  return (
    <a
      href={cta.href}
      data-cta={cta.kind}
      data-variant={variant}
      className={[baseClass, variantClass[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...(cta.external ? { rel: "noopener" } : {})}
      {...(cta.download ? { download: true, type: "application/pdf" } : {})}
    >
      {cta.label}
    </a>
  );
}
