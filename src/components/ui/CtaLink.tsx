import type { Cta } from "@/lib/selectors";

type Variant = "solid" | "outline";

type Props = {
  cta: Cta;
  variant: Variant;
  className?: string;
};

const baseClass =
  "inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-medium";

/** Solid = accent fill. Outline = hairline border that turns ink on hover. No motion. */
const variantClass: Record<Variant, string> = {
  solid: "border-accent bg-accent text-bg hover:border-ink hover:bg-ink",
  outline: "border-hairline bg-transparent text-ink hover:border-ink",
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
