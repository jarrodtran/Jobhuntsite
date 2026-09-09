import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ExperienceRows } from "@/components/sections/ExperienceRows";
import type { ExperienceRow } from "@/lib/selectors";

const rows: ExperienceRow[] = [
  {
    id: "row-a",
    company: "Co A",
    title: "Role A",
    start: { label: "2024", dateTime: "2024" },
    end: { label: "Present", dateTime: null },
    dateRange: "2024–Present",
    location: null,
    scopeLine: "Scope A",
    bullets: ["Bullet A"],
    defaultOpen: true,
  },
  {
    id: "row-b",
    company: "Co B",
    title: "Role B",
    start: { label: "2020", dateTime: "2020" },
    end: { label: "2023", dateTime: "2023" },
    dateRange: "2020–2023",
    location: null,
    scopeLine: "Scope B",
    bullets: ["Bullet B"],
    defaultOpen: false,
  },
];

function renderRows() {
  return render(
    <ExperienceRows rows={rows} dateRangeSeparator="–" />,
  );
}

describe("ExperienceRows accordion", () => {
  afterEach(() => {
    cleanup();
    window.history.replaceState(null, "", " ");
  });

  it("marks the default-open row as expanded and others as collapsed", () => {
    renderRows();

    expect(screen.getByRole("button", { name: /Role A/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: /Role B/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("gives closed rows a denser 44px hit target", () => {
    renderRows();
    const closed = screen.getByRole("button", { name: /Role B/ });
    expect(closed).toHaveClass("min-h-11", "py-2.5");
  });

  it("opens a closed row on click and collapses the previous one", async () => {
    const user = userEvent.setup();
    renderRows();

    await user.click(screen.getByRole("button", { name: /Role B/ }));

    expect(screen.getByRole("button", { name: /Role B/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByRole("button", { name: /Role A/ })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes the open row on Enter", async () => {
    const user = userEvent.setup();
    renderRows();
    const openBtn = screen.getByRole("button", { name: /Role A/ });

    openBtn.focus();
    await user.keyboard("{Enter}");

    expect(openBtn).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a closed row on Space", async () => {
    const user = userEvent.setup();
    renderRows();
    const closed = screen.getByRole("button", { name: /Role B/ });

    closed.focus();
    await user.keyboard(" ");

    expect(closed).toHaveAttribute("aria-expanded", "true");
  });

  it("opens the row named by a Fit / shared-URL hash", async () => {
    renderRows();

    window.location.hash = "#row-b";
    window.dispatchEvent(new HashChangeEvent("hashchange"));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Role B/ })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });
  });
});
