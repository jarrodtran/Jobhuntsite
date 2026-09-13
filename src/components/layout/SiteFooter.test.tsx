import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { footerView } from "@/lib/selectors";

describe("SiteFooter", () => {
  afterEach(() => {
    cleanup();
  });

  it("puts Contact in the heading outline, not just on the landmark", () => {
    // Chrome's accessibility tree ran h1 → Experience → Where I fit → nothing.
    // The heading was only an aria-label on the footer, so a reader browsing by
    // headings never reached Contact at all.
    render(<SiteFooter />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: footerView.section.heading,
    });

    expect(heading).toBeVisible();
    expect(screen.getByRole("contentinfo")).toHaveAttribute(
      "aria-labelledby",
      heading.id,
    );
  });

  it("carries the same anchor offset as every other #hash target", () => {
    const { container } = render(<SiteFooter />);
    const footer = container.querySelector("footer");

    expect(footer).toHaveAttribute("id", "contact");
    expect(footer).toHaveClass("scroll-mt-8", "sm:scroll-mt-20");
  });

  it("still reads as an address block with email, LinkedIn, and the city", () => {
    const { container } = render(<SiteFooter />);

    expect(container.querySelector("address")).toBeInTheDocument();
    expect(container.querySelector("[data-cta='email']")).toBeInTheDocument();
    expect(container.querySelector("[data-cta='linkedin']")).toBeInTheDocument();
    expect(container.querySelector("[data-slot='location']")).toHaveTextContent(
      "Houston",
    );
  });
});
