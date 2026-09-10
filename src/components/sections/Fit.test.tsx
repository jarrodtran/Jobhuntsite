import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Fit } from "@/components/sections/Fit";

describe("Fit links focus", () => {
  afterEach(() => {
    cleanup();
  });

  it("sets the primary Fit link in semibold ink and leaves siblings muted", () => {
    const { container } = render(<Fit />);
    const list = container.querySelector("[data-slot='role-chips']");
    const primaryItem = container.querySelector("[data-primary='true']");
    const primaryLink = primaryItem?.querySelector("a");
    const siblingLinks = container.querySelectorAll("[data-primary='false'] a");

    expect(list).toHaveClass("flex", "flex-wrap");
    expect(list?.className).not.toMatch(/rounded-card|bg-surface|shadow-card/);
    expect(primaryLink).toHaveTextContent("AI Enablement");
    expect(primaryLink).toHaveClass("font-semibold", "text-ink");
    expect(primaryLink).not.toHaveClass("text-muted");
    expect(primaryItem?.querySelector("[data-slot='badge']")).toHaveTextContent(
      "Primary target",
    );
    expect(siblingLinks.length).toBeGreaterThan(0);
    for (const link of siblingLinks) {
      expect(link).toHaveClass("text-muted");
      expect(link).not.toHaveClass("font-semibold");
    }
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
