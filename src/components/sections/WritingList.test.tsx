import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { WritingList } from "@/components/sections/WritingList";
import { writingView } from "@/lib/selectors";

describe("WritingList empty state", () => {
  afterEach(() => {
    cleanup();
  });

  it("shows the empty slot xor the post list, and always Subscribe", () => {
    const { container } = render(<WritingList />);
    const empty = container.querySelector("[data-slot='writing-empty']");
    const list = container.querySelector("[data-slot='writing-list']");
    if (writingView.posts.length === 0) {
      expect(empty).not.toBeNull();
      expect(empty).toHaveTextContent(writingView.empty);
      expect(list).toBeNull();
    } else {
      expect(list).not.toBeNull();
      expect(empty).toBeNull();
    }
    expect(container.querySelector("[data-cta='subscribe']")).not.toBeNull();
  });
});
