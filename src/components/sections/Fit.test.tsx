import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Fit } from "@/components/sections/Fit";

describe("Fit thesis", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a filing sentence and two labeled lanes", () => {
    const { container } = render(<Fit />);
    const intro = container.querySelector("[data-slot='intro']");
    const thesis = container.querySelector("[data-slot='thesis']");
    const adjacent = container.querySelector("[data-slot='adjacent']");

    expect(intro).toHaveTextContent("Manager, AI & Factory Strategy");
    expect(intro).toHaveTextContent("Strategy & Operations");
    expect(intro).toHaveTextContent("Technical Program Manager");
    expect(intro).toHaveTextContent("AI adoption");
    expect(intro).not.toHaveTextContent("Houston");
    expect(intro).not.toHaveTextContent(/reloc/i);

    expect(thesis).toHaveTextContent("AI adoption");
    expect(thesis).toHaveTextContent(
      "I run AI enablement across Tesla Energy Manufacturing for 10,000 employees, then hand the program to a sustaining team. A forward-deployed applied AI team does the custom buildouts.",
    );
    expect(adjacent).toHaveTextContent("Strategy & Operations");
    expect(adjacent).toHaveTextContent("I led the factory cost-down at Tesla Energy Manufacturing");
    expect(adjacent).toHaveTextContent("4680");
    expect(adjacent).toHaveTextContent("Waymo");

    expect(container.querySelector("[data-slot='badge']")).toBeNull();
    expect(container.querySelector("[data-slot='thesis'] ul")).toBeNull();
    expect(container.querySelector("[data-slot='adjacent'] ul")).toBeNull();
    expect(container.textContent).not.toMatch(/VC Platform/);
    expect(container.textContent).not.toMatch(/Chief of Staff/);
    expect(container.textContent).not.toMatch(/Primary target/);
    expect(container.textContent).not.toMatch(/as-is to to-be/);
    expect(container.textContent).not.toMatch(/Enablement plus custom buildouts/);
    expect(container.textContent).not.toMatch(/executable operating cadence/);
    expect(container.textContent).not.toMatch(/\bFDE\b/);
    expect(container.textContent).not.toMatch(/Director/);
  });

  it("links company names inside the lane copy", () => {
    const { container } = render(<Fit />);
    const thesisHrefs = [
      ...container.querySelectorAll(
        "[data-slot='thesis'] [data-slot='fit-links'] a",
      ),
    ].map((link) => link.getAttribute("href"));
    const adjacentHrefs = [
      ...container.querySelectorAll(
        "[data-slot='adjacent'] [data-slot='fit-links'] a",
      ),
    ].map((link) => link.getAttribute("href"));

    expect(thesisHrefs).toEqual(["#tesla-ai"]);
    expect(adjacentHrefs).toEqual([
      "#tesla-ai",
      "#apple-india",
      "#tesla-4680",
      "#waymo",
    ]);
    expect(
      container.querySelector("[data-slot='thesis'] [data-slot='fit-links'] a"),
    ).toHaveTextContent("Tesla Energy Manufacturing");
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
