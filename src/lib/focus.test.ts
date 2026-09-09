import { describe, expect, it } from "vitest";
import { FOCUS_VISIBLE_CLASS } from "@/lib/focus";

describe("FOCUS_VISIBLE_CLASS", () => {
  it("is a 2px ink ring with 2px offset for :focus-visible", () => {
    expect(FOCUS_VISIBLE_CLASS).toContain("focus-visible:outline-2");
    expect(FOCUS_VISIBLE_CLASS).toContain("focus-visible:outline-offset-2");
    expect(FOCUS_VISIBLE_CLASS).toContain("focus-visible:outline-ink");
  });
});
