import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Fit } from "@/components/sections/Fit";

describe("Fit thesis", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the primary thesis and one adjacent StratOps lane", () => {
    const { container } = render(<Fit />);
    const thesis = container.querySelector("[data-slot='thesis']");
    const adjacent = container.querySelector("[data-slot='adjacent']");

    expect(thesis).toHaveTextContent(
      "I run AI adoption in large manufacturing orgs: as-is to to-be, ship, then hand off to a sustaining team. Enablement plus custom buildouts.",
    );
    expect(adjacent).toHaveTextContent("Strategy & Operations");
    expect(container.querySelector("[data-slot='badge']")).toBeNull();
    expect(container.textContent).not.toMatch(/VC Platform/);
    expect(container.textContent).not.toMatch(/Chief of Staff/);
    expect(container.textContent).not.toMatch(/Primary target/);
  });

  it("links each lane into the experience rows that back it", () => {
    const { container } = render(<Fit />);
    const thesisLink = container.querySelector(
      "[data-slot='thesis'] [data-slot='fit-links'] a",
    );
    const adjacentHrefs = [
      ...container.querySelectorAll(
        "[data-slot='adjacent'] [data-slot='fit-links'] a",
      ),
    ].map((link) => link.getAttribute("href"));

    expect(thesisLink).toHaveAttribute("href", "#tesla-ai");
    expect(adjacentHrefs).toEqual(["#tesla-ai", "#waymo", "#apple-india"]);
  });

  it("exposes a 2px ink focus-visible ring on each Fit link", () => {
    const { container } = render(<Fit />);
    const links = container.querySelectorAll("[data-slot='fit-links'] a");

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
