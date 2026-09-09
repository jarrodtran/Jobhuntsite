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

const ioById = new Map<string, IntersectionObserverCallback>();

function fireIntersection(id: string, isIntersecting: boolean) {
  act(() => {
    ioById.get(id)?.(
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
      <footer id="contact">Contact</footer>
      <ResumeBar watchId="hero-resume" cta={cta} />
    </>,
  );
}

describe("ResumeBar chrome", () => {
  beforeEach(() => {
    ioById.clear();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        #callback: IntersectionObserverCallback;
        constructor(callback: IntersectionObserverCallback) {
          this.#callback = callback;
        }
        observe(target: Element) {
          if (target.id) ioById.set(target.id, this.#callback);
        }
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
    fireIntersection("hero-resume", false);

    const bar = document.querySelector("[data-component='resume-bar']");
    const control = bar?.querySelector("[data-cta='resume']");

    expect(bar?.className).toContain("env(safe-area-inset-bottom)");
    expect(control).toHaveClass("h-12");
  });

  it("hides the bar when #contact intersects and the hero CTA is off-screen", () => {
    renderBar();
    fireIntersection("hero-resume", false);
    fireIntersection("contact", false);

    const bar = document.querySelector("[data-component='resume-bar']");
    expect(bar?.className).toContain("translate-y-0");

    fireIntersection("contact", true);
    expect(bar?.className).toContain("translate-y-full");
  });
});
