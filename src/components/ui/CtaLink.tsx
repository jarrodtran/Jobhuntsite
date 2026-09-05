import type { Cta } from "@/lib/selectors";

type Variant = "solid" | "ghost";

type Props = {
  cta: Cta;
  variant: Variant;
  className?: string;
};

const baseClass =
  "inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-semibold";

/**
 * Solid = ink fill, black on hover: the inevitable button. Ghost = no border,
 * muted text that goes ink on hover with a 5% ink wash. No motion.
 */
const variantClass: Record<Variant, string> = {
  solid: "bg-ink text-bg hover:bg-accent",
  ghost: "bg-transparent text-muted hover:bg-ink/5 hover:text-ink",
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
