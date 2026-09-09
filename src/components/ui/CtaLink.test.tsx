import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CtaLink } from "@/components/ui/CtaLink";
import type { Cta } from "@/lib/selectors";

const cta: Cta = {
  kind: "resume",
  label: "Resume",
  href: "/resume.pdf",
  external: false,
  download: true,
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
});
