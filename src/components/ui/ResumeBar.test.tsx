import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResumeBar } from "@/components/ui/ResumeBar";
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

function renderBar() {
  return render(
    <>
      <a id="hero-resume" href="/resume.pdf">
        In-hero Resume
      </a>
      <ResumeBar watchId="hero-resume" cta={cta} />
    </>,
  );
}

describe("ResumeBar chrome", () => {
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

  it("pads the bottom with the iOS safe-area inset and keeps the control h-12", () => {
    renderBar();
    fireIntersection(false);

    const bar = document.querySelector("[data-component='resume-bar']");
    const control = bar?.querySelector("[data-cta='resume']");

    expect(bar?.className).toContain("env(safe-area-inset-bottom)");
    expect(control).toHaveClass("h-12");
  });
});
