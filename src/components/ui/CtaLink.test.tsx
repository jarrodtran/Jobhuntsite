import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CtaLink } from "@/components/ui/CtaLink";
import type { Cta } from "@/lib/selectors";

const cta: Cta = {
  kind: "resume",
  label: "Resume",
  href: "/resume.pdf",
  external: false,
  download: false,
  newTab: true,
};

describe("CtaLink focus", () => {
  afterEach(() => {
    cleanup();
  });

  it("exposes a 2px ink focus-visible ring on CTAs", () => {
    const { container } = render(<CtaLink cta={cta} variant="solid" />);
    const link = container.querySelector("[data-cta='resume']");

    expect(link).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
      "focus-visible:outline-ink",
    );
  });

  it("presses solid and ghost to opacity 0.9 without dropping the focus ring", () => {
    const { container, rerender } = render(
      <CtaLink cta={cta} variant="solid" />,
    );
    const solid = container.querySelector("[data-variant='solid']");

    expect(solid).toHaveClass("active:opacity-90");
    expect(solid).toHaveClass("focus-visible:outline-ink");

    rerender(<CtaLink cta={cta} variant="ghost" />);
    const ghost = container.querySelector("[data-variant='ghost']");

    expect(ghost).toHaveClass("active:opacity-90");
    expect(ghost).toHaveClass("focus-visible:outline-ink");
  });

  it("opens the resume PDF in a new tab without a download attribute", () => {
    const { container } = render(<CtaLink cta={cta} variant="solid" />);
    const link = container.querySelector("[data-cta='resume']");

    expect(link).toHaveAttribute("href", "/resume.pdf");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
    expect(link).not.toHaveAttribute("download");
  });
});
