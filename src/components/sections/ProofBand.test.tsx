import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProofBand } from "@/components/sections/ProofBand";

describe("ProofBand value size", () => {
  afterEach(() => {
    cleanup();
  });

  it("sizes proof values at text-base, including at desktop", () => {
    const { container } = render(<ProofBand />);
    const metrics = container.querySelectorAll(
      "[data-component='proof-band'] [data-slot='metric']",
    );

    expect(metrics.length).toBeGreaterThan(0);
    for (const metric of metrics) {
      expect(metric).toHaveClass("text-base");
      expect(metric).not.toHaveClass("text-xl");
      expect(metric).not.toHaveClass("lg:text-xl");
    }
  });

  it("leaves proof labels on the 11px caps scale", () => {
    const { container } = render(<ProofBand />);
    const labels = container.querySelectorAll(
      "[data-component='proof-band'] [data-slot='chip-label']",
    );

    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(label).toHaveClass("text-label");
    }
  });
});
