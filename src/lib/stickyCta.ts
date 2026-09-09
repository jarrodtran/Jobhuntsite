/** Same rule as the mobile Resume bar: rail only while the hero CTA is off-screen. */
export function shouldShowScrollRail(isHeroCtaVisible: boolean): boolean {
  return !isHeroCtaVisible;
}
