import { FOCUS_VISIBLE_CLASS } from "@/lib/focus";
import { ctaAnchorProps, type Cta } from "@/lib/selectors";

type Variant = "solid" | "ghost";

type Props = {
  cta: Cta;
  variant: Variant;
  className?: string;
  /** Stable id when another component needs to observe this control. */
  id?: string;
};

const baseClass = [
  "inline-flex h-11 items-center justify-center rounded-sm border px-6 text-sm font-semibold",
  "active:opacity-90",
  FOCUS_VISIBLE_CLASS,
].join(" ");

/**
 * Solid = ink fill: the Resume hit. Ghost = text link with a hairline
 * underline (Olivier), muted to ink. Press is opacity 0.9. No scale.
 */
const variantClass: Record<Variant, string> = {
  solid: "border-ink bg-ink text-bg hover:border-accent hover:bg-accent",
  ghost:
    "border-transparent bg-transparent px-0 text-muted underline decoration-rule underline-offset-4 hover:border-transparent hover:text-ink hover:decoration-ink",
};

/**
 * `data-cta` carries the kind (resume | linkedin | email) and `data-variant`
 * the look, so FE Designer can target either without touching markup.
 */
export function CtaLink({ cta, variant, className, id }: Props) {
  return (
    <a
      id={id}
      data-cta={cta.kind}
      data-variant={variant}
      className={[baseClass, variantClass[variant], className]
        .filter(Boolean)
        .join(" ")}
      {...ctaAnchorProps(cta)}
    >
      {cta.label}
    </a>
  );
}
