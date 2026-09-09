/** Same rule as the mobile Resume bar: rail only while the hero CTA is off-screen. */
export function shouldShowScrollRail(isHeroCtaVisible: boolean): boolean {
  return !isHeroCtaVisible;
}

/**
 * Mobile Resume bar: hide while the hero CTA is on-screen or `#contact` is
 * intersecting, so the sticky control never covers email / footer LinkedIn.
 */
export function shouldShowResumeBar(
  isHeroCtaVisible: boolean,
  isContactVisible: boolean,
): boolean {
  return !isHeroCtaVisible && !isContactVisible;
}
