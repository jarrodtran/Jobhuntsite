"use client";

import { useEffect, useState } from "react";
import type { Cta } from "@/lib/selectors";

type Props = {
  cta: Cta;
  /** id of the in-hero Resume button; the bar shows only while it is off-screen. */
  watchId: string;
};

/** The bar's own height, so a button hidden behind it still counts as off-screen. */
const BAR_HEIGHT_PX = 48;

/**
 * Mobile only (<640): a fixed h-12 solid-ink Resume bar along the bottom edge.
 * It shows only while the hero's own Resume button is off-screen — below the
 * fold on a short phone, or scrolled away into Experience — so the two never
 * coexist. Server-rendered hidden; the observer reveals it after hydration when
 * the button is not in view.
 *
 * Hooks: `data-component="resume-bar"`, `data-cta="resume"`,
 * `data-variant="bar"`.
 */
export function ResumeBar({ cta, watchId }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: `0px 0px -${BAR_HEIGHT_PX}px 0px` },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId]);

  return (
    <div
      data-component="resume-bar"
      aria-hidden={!visible}
      className={[
        "fixed inset-x-0 bottom-0 z-40 bg-ink pb-[env(safe-area-inset-bottom)] transition-transform duration-150 ease-soft sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <a
        href={cta.href}
        data-cta={cta.kind}
        data-variant="bar"
        tabIndex={visible ? undefined : -1}
        className="flex h-12 items-center justify-center text-sm font-semibold text-bg"
        {...(cta.external ? { rel: "noopener" } : {})}
        {...(cta.download ? { download: true, type: "application/pdf" } : {})}
      >
        {cta.label}
      </a>
    </div>
  );
}
