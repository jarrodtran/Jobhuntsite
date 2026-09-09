import { describe, expect, it } from "vitest";
import { shouldShowScrollRail } from "@/lib/stickyCta";

describe("shouldShowScrollRail", () => {
  it("hides the rail while the hero CTA is intersecting", () => {
    expect(shouldShowScrollRail(true)).toBe(false);
  });

  it("shows the rail once the hero CTA leaves the viewport", () => {
    expect(shouldShowScrollRail(false)).toBe(true);
  });
});
