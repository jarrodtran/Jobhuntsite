"use client";

import { sectionShellClass } from "@/components/layout/Section";
import { FOCUS_VISIBLE_CLASS } from "@/lib/focus";
import { withReducedMotionSnap } from "@/lib/motion";
import type { Cta } from "@/lib/selectors";
import { shouldShowScrollRail } from "@/lib/stickyCta";
import { useHeroCtaVisibility } from "@/lib/useHeroCtaVisibility";

type Props = {
  cta: Cta;
  /** id of the in-hero Resume button; the rail shows only while it is off-screen. */
  watchId: string;
  wordmark: string;
  homeHref: string;
};

/** The rail's own height, so a button hidden behind it still counts as off-screen. */
const RAIL_HEIGHT_PX = 48;

/**
 * Desktop only (≥640): a fixed h-12 top bar with the name wordmark and a solid
 * Resume. Solid paper (`bg-bg` / #F7F6F3), 1px hairline, z-50 so it sits over
 * scrolled content. Same IntersectionObserver rule as the mobile sticky — it
 * shows only while the hero's own Resume button is off-screen, so the two
 * never coexist. Translate snaps under reduced motion. Server-rendered
 * hidden; the observer reveals it after hydration.
 *
 * Hooks: `data-component="scroll-rail"`, `data-cta="resume"`, `data-variant="solid"`.
 */
export function ScrollRail({ cta, watchId, wordmark, homeHref }: Props) {
  const isHeroCtaVisible = useHeroCtaVisibility(
    watchId,
    `-${RAIL_HEIGHT_PX}px 0px 0px 0px`,
  );
  const visible = shouldShowScrollRail(isHeroCtaVisible);

  return (
    <div
      data-component="scroll-rail"
      aria-hidden={!visible}
      className={[
        "fixed inset-x-0 top-0 z-50 hidden border-b border-hairline bg-bg pt-[env(safe-area-inset-top)] sm:block",
        withReducedMotionSnap("transition-transform duration-150 ease-soft"),
        visible ? "translate-y-0" : "-translate-y-full",
      ].join(" ")}
    >
      <div
        className={`${sectionShellClass} flex h-12 items-center justify-between gap-4`}
      >
        <a
          href={homeHref}
          data-slot="wordmark"
          tabIndex={visible ? undefined : -1}
          className="text-sm font-semibold tracking-tight"
        >
          {wordmark}
        </a>
        <a
          href={cta.href}
          data-cta={cta.kind}
          data-variant="solid"
          tabIndex={visible ? undefined : -1}
          className={`inline-flex h-8 min-w-24 items-center justify-center rounded-md bg-ink px-4 text-sm font-semibold text-bg hover:bg-accent active:opacity-90 ${FOCUS_VISIBLE_CLASS}`}
          {...(cta.external ? { rel: "noopener" } : {})}
          {...(cta.download ? { download: true, type: "application/pdf" } : {})}
        >
          {cta.label}
        </a>
      </div>
    </div>
  );
}
