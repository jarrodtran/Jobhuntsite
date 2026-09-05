"use client";

import { useEffect, useState } from "react";
import type { Cta } from "@/lib/selectors";

type Props = {
  cta: Cta;
  /** id of the element whose visibility keeps the bar on screen (the hero). */
  watchId: string;
};

/**
 * Mobile only (<640): a fixed h-12 solid-ink Resume bar along the bottom edge.
 * It is on screen while any of the hero is, so the CTA is in the fold on every
 * phone, and slides away once the reader has scrolled past the hero into
 * Experience. Server-rendered visible so it is there before hydration.
 *
 * Hooks: `data-component="resume-bar"`, `data-cta="resume"`,
 * `data-variant="bar"`.
 */
export function ResumeBar({ cta, watchId }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
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
