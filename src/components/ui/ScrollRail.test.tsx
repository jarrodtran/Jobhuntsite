import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScrollRail } from "@/components/ui/ScrollRail";
import type { Cta } from "@/lib/selectors";

const cta: Cta = {
  kind: "resume",
  label: "Resume",
  href: "/resume.pdf",
  external: false,
  download: true,
};

let ioCallback: IntersectionObserverCallback | undefined;

function fireIntersection(isIntersecting: boolean) {
  act(() => {
    ioCallback?.(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

function renderRail() {
  return render(
    <>
      <a id="hero-resume" href="/resume.pdf">
        In-hero Resume
      </a>
      <ScrollRail
        watchId="hero-resume"
        wordmark="Jarrod Tran"
        homeHref="#top"
        cta={cta}
      />
    </>,
  );
}

describe("ScrollRail", () => {
  beforeEach(() => {
    ioCallback = undefined;
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: IntersectionObserverCallback) {
          ioCallback = callback;
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("stays hidden while the hero CTA is intersecting", () => {
    renderRail();
    fireIntersection(true);

    const rail = document.querySelector("[data-component='scroll-rail']");
    expect(rail).toHaveAttribute("aria-hidden", "true");
    expect(rail).toHaveClass("hidden", "sm:block");
    expect(screen.getByText("In-hero Resume")).toBeInTheDocument();
  });

  it("shows the wordmark and solid Resume once the hero CTA leaves view", () => {
    renderRail();
    fireIntersection(false);

    const rail = document.querySelector("[data-component='scroll-rail']");
    expect(rail).toHaveAttribute("aria-hidden", "false");
    expect(rail).toHaveTextContent("Jarrod Tran");
    expect(
      rail.querySelector('[data-cta="resume"][data-variant="solid"]'),
    ).toHaveTextContent("Resume");
  });
});
