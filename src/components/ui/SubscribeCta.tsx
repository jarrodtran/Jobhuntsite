import { CtaLink } from "@/components/ui/CtaLink";
import { writingView } from "@/lib/selectors";

/** External Subscribe control → Substack. */
export function SubscribeCta({ className }: { className?: string }) {
  return (
    <CtaLink
      cta={writingView.subscribe}
      variant="solid"
      className={className ?? "min-w-28"}
    />
  );
}
