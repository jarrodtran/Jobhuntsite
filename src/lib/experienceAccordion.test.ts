import { describe, expect, it } from "vitest";
import {
  experienceIdFromHash,
  nextOpenExperienceId,
  rowAccessibleName,
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

describe("rowAccessibleName", () => {
  it("reads role, company, tenure, then scope — not the raw child order", () => {
    expect(
      rowAccessibleName({
        title: "Manager, AI & Factory Strategy",
        company: "Tesla",
        dateRange: "Aug 2023–Present",
        scopeLine: "10 direct reports.",
      }),
    ).toBe(
      "Manager, AI & Factory Strategy. Tesla. Aug 2023–Present. 10 direct reports.",
    );
  });

  it("never runs title into company the way the aria-hidden mid-dot did", () => {
    const name = rowAccessibleName({
      title: "Strategy & Operations Manager",
      company: "Waymo (Alphabet)",
      dateRange: "Oct 2022–May 2023",
      scopeLine: null,
    });

    expect(name).not.toMatch(/ManagerWaymo/);
    expect(name).toBe(
      "Strategy & Operations Manager. Waymo (Alphabet). Oct 2022–May 2023",
    );
  });

  it("drops a blank scope line instead of trailing a separator", () => {
    expect(
      rowAccessibleName({
        title: "Operations Area Manager",
        company: "Amazon",
        dateRange: "Mar 2017–Apr 2018",
        scopeLine: "   ",
      }),
    ).toBe("Operations Area Manager. Amazon. Mar 2017–Apr 2018");
  });
});
