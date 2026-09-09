import { describe, expect, it } from "vitest";
import {
  experienceIdFromHash,
  nextOpenExperienceId,
} from "@/lib/experienceAccordion";

describe("nextOpenExperienceId", () => {
  it("opens the toggled row when it is closed", () => {
    expect(nextOpenExperienceId("tesla-ai", "apple-india")).toBe("apple-india");
  });

  it("closes the row when it is already open", () => {
    expect(nextOpenExperienceId("tesla-ai", "tesla-ai")).toBe(null);
  });
});

describe("experienceIdFromHash", () => {
  const ids = ["tesla-ai", "tesla-4680", "apple-india"] as const;

  it("opens the row named by the hash (Fit / shared URL)", () => {
    expect(experienceIdFromHash("#tesla-4680", ids)).toBe("tesla-4680");
  });

  it("ignores hashes that are not experience ids", () => {
    expect(experienceIdFromHash("#nope", ids)).toBe(null);
  });
});
