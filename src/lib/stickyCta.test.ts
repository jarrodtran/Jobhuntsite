import { describe, expect, it } from "vitest";
import { shouldShowResumeBar, shouldShowScrollRail } from "@/lib/stickyCta";

describe("shouldShowScrollRail", () => {
  it("hides the rail while the hero CTA is intersecting", () => {
    expect(shouldShowScrollRail(true)).toBe(false);
  });

  it("shows the rail once the hero CTA leaves the viewport", () => {
    expect(shouldShowScrollRail(false)).toBe(true);
  });
});

describe("shouldShowResumeBar", () => {
  it("hides the bar while the hero CTA is intersecting", () => {
    expect(shouldShowResumeBar(true, false)).toBe(false);
  });

  it("shows the bar once the hero CTA leaves and contact is off-screen", () => {
    expect(shouldShowResumeBar(false, false)).toBe(true);
  });

  it("hides the bar when #contact intersects the viewport", () => {
    expect(shouldShowResumeBar(false, true)).toBe(false);
  });
});
