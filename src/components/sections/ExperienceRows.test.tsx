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
    const open = screen.getByRole("button", { name: /Role A/ });

    expect(closed).toHaveClass("min-h-11", "py-2");
    expect(closed).not.toHaveClass("py-2.5");
    expect(open).toHaveClass("p-5", "lg:p-6");
    expect(open).not.toHaveClass("py-2");
  });

  it("sets closed-row title and company in semibold ink, with a mid-dot, scope clamped", () => {
    renderRows();
    const closed = screen.getByRole("button", { name: /Role B/ });
    const title = closed.querySelector("[data-slot='title']");
    const company = closed.querySelector("[data-slot='company']");
    const scope = closed.querySelector("[data-slot='scope']");
    const line = title?.parentElement;

    expect(title).toHaveClass("font-semibold", "text-ink");
    expect(company).toHaveClass("font-semibold", "text-ink");
    expect(company).toHaveTextContent("Co B");
    expect(line).toHaveTextContent("Role B");
    expect(line).toHaveTextContent("·");
    expect(line).toHaveTextContent("Co B");
    expect(scope).toHaveClass("line-clamp-1", "text-muted");
  });

  it("keeps a long closed-row title intact and the company name untruncated", () => {
    render(
      <ExperienceRows
        dateRangeSeparator="–"
        rows={[
          {
            id: "apple-india",
            company: "Apple",
            title: "Strategic Operations Program Manager",
            start: { label: "Jun 2021", dateTime: "2021-06" },
            end: { label: "Jun 2022", dateTime: "2022-06" },
            dateRange: "Jun 2021–Jun 2022",
            location: null,
            scopeLine: "iPhone India launch",
            bullets: ["Ship the ramp"],
            defaultOpen: false,
          },
        ]}
      />,
    );

    const closed = screen.getByRole("button", {
      name: /Strategic Operations Program Manager/,
    });
    const title = closed.querySelector("[data-slot='title']");
    const company = closed.querySelector("[data-slot='company']");
    const line = title?.parentElement;

    expect(closed).toHaveAttribute("aria-expanded", "false");
    expect(title).toHaveTextContent("Strategic Operations Program Manager");
    expect(company).toHaveTextContent("Apple");
    expect(company).not.toHaveClass("truncate");
    expect(line).not.toHaveClass("flex");
    expect(line).toHaveTextContent("Strategic Operations Program Manager");
    expect(line).toHaveTextContent("·");
    expect(line).toHaveTextContent("Apple");
  });

  it("exposes a 2px ink focus-visible ring on accordion buttons", () => {
    renderRows();
    const closed = screen.getByRole("button", { name: /Role B/ });

    expect(closed).toHaveClass(
      "focus-visible:outline-2",
      "focus-visible:outline-offset-2",
      "focus-visible:outline-ink",
    );
  });

  it("washes a closed row white and turns the hairline ink on hover, 150ms, no scale", () => {
    renderRows();
    const closed = document.querySelector("[data-entry='row-b']");

    expect(closed).toHaveClass("hover:bg-white", "hover:border-ink");
    expect(closed).toHaveClass("duration-150");
    expect(closed).toHaveClass("motion-reduce:transition-none");
    expect(closed?.className).not.toMatch(/scale/);
  });

  it("uses tabular-nums on the open panel bullet list", () => {
    renderRows();
    const bullets = document.querySelector(
      "[data-open='true'] [data-slot='bullets']",
    );

    expect(bullets).toHaveClass("tabular-nums");
  });

  it("snaps accordion height and chevron under reduced motion", () => {
    renderRows();
    const closed = screen.getByRole("button", { name: /Role B/ });
    const panel = document.getElementById("row-b-panel");
    const chevron = closed.querySelector("svg");

    expect(panel).toHaveClass("motion-reduce:transition-none");
    expect(chevron).toHaveClass("motion-reduce:transition-none");
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
