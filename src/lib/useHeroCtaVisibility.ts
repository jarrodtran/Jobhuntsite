"use client";

import { useEffect, useState } from "react";

/**
 * True while `#watchId` intersects the viewport (after applying rootMargin).
 * Starts true so sticky chrome is hidden until the observer reports otherwise —
 * the in-hero Resume and the rail never coexist on first paint.
 */
export function useHeroCtaVisibility(
  watchId: string,
  rootMargin: string,
): boolean {
  const [isHeroCtaVisible, setIsHeroCtaVisible] = useState(true);

  useEffect(() => {
    const target = document.getElementById(watchId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroCtaVisible(entry.isIntersecting),
      { threshold: 0, rootMargin },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [watchId, rootMargin]);

  return isHeroCtaVisible;
}
