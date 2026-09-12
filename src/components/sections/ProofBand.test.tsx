import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProofBand } from "@/components/sections/ProofBand";

describe("ProofBand value size", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders nothing when Copy empties the strip", () => {
    const { container } = render(<ProofBand />);
    expect(
      container.querySelector("[data-component='proof-band']"),
    ).toBeNull();
  });
});
