import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Fit } from "@/components/sections/Fit";

describe("Fit links focus", () => {
  afterEach(() => {
    cleanup();
  });

  it("exposes a 2px ink focus-visible ring on each Fit link", () => {
    const { container } = render(<Fit />);
    const links = container.querySelectorAll("[data-slot='role-chips'] a");

    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveClass(
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-ink",
      );
    }
  });
});
