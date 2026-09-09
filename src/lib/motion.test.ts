import { describe, expect, it } from "vitest";
import { withReducedMotionSnap } from "@/lib/motion";

describe("withReducedMotionSnap", () => {
  it("keeps the 150ms animated classes for users who allow motion", () => {
    expect(
      withReducedMotionSnap("transition-transform duration-150 ease-soft"),
    ).toContain("duration-150");
  });

  it("adds motion-reduce:transition-none so reduced-motion users snap", () => {
    expect(
      withReducedMotionSnap("transition-transform duration-150 ease-soft"),
    ).toContain("motion-reduce:transition-none");
  });
});
