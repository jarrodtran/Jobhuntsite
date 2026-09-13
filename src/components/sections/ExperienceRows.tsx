"use client";

import { useEffect, useState } from "react";
import { Bullets } from "@/components/ui/Bullets";
import { ANCHOR_OFFSET_CLASS } from "@/lib/chrome";
import {
  experienceIdFromHash,
  nextOpenExperienceId,
  rowAccessibleName,
} from "@/lib/experienceAccordion";
import { FOCUS_VISIBLE_CLASS } from "@/lib/focus";
import { withReducedMotionSnap } from "@/lib/motion";
import type { DateLabel, ExperienceRow } from "@/lib/selectors";

type Props = {
  rows: ExperienceRow[];
  dateRangeSeparator: string;
};

/**
 * Long enough for the 150ms collapse of whatever row was open to finish, so the
 * corrective scroll below measures a settled page.
 */
const SETTLE_MS = 200;

/**
 * Accordion. One row open at a time at every width; the current role is open
 * on first paint (server-rendered, so it reads correctly before hydration).
 * A `#<entry-id>` hash — from the Fit links or a shared URL — opens that row,
 * then re-scrolls it: opening the target collapses whatever was open above it,
 * which pulls the page up and can leave the row above the viewport.
 *
 * Closed rows are a list: dates, title · company as wrapping inline text, the
 * full scope line, a hairline under each, denser `py-2` / `min-h-11` so the
 * row is a 44px hit target without extra chrome. Hover washes the closed row
 * to the sheet and turns the hairline ink (150ms, no scale; snapped under
 * reduced motion). The open row is a sheet, not a floating card: 1.25rem
 * padding, the 7rem date column (`--rail`) as its left rail and the bullets
 * aligned to the title column (`tabular-nums` on the panel list). At ≥1024
 * the panel pads 1.5rem and the rail widens to 8rem (`--rail` steps in
 * globals.css, so the bullet offset below follows it). Under 640px dates stack
 * above the title. Motion is 150ms on grid rows (height), opacity, and the
 * chevron — snapped under reduced motion. The header is a real `<button>`
 * (`aria-expanded`, Enter/Space) carrying an `aria-label` in reading order, so
 * heading navigation and the panel's region name are a sentence rather than
 * "…StrategyTesla10 direct reports…".
 *
 * Hooks: `data-entry="<id>"`, `data-open`, `data-slot` on dates, title,
 * company, scope, panel, bullets.
 */
export function ExperienceRows({ rows, dateRangeSeparator }: Props) {
  const [openId, setOpenId] = useState<string | null>(
    () => rows.find((row) => row.defaultOpen)?.id ?? null,
  );
  const [hashTargetId, setHashTargetId] = useState<string | null>(null);

  useEffect(() => {
    const openFromHash = () => {
      const id = experienceIdFromHash(
        window.location.hash,
        rows.map((row) => row.id),
      );
      if (!id) return;
      setOpenId(id);
      setHashTargetId(id);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [rows]);

  useEffect(() => {
    if (!hashTargetId) return;
    const row = document.getElementById(hashTargetId);
    setHashTargetId(null);
    if (!row) return;
    // No `behavior`: the html rule already switches smooth off under
    // prefers-reduced-motion, and `scroll-mt` keeps the row clear of the rail.
    const settle = window.setTimeout(
      () => row.scrollIntoView({ block: "start" }),
      SETTLE_MS,
    );
    return () => window.clearTimeout(settle);
  }, [hashTargetId]);

  return (
    <ol className="mt-3">
      {rows.map((row) => {
        const open = openId === row.id;
        const headingId = `${row.id}-heading`;
        const panelId = `${row.id}-panel`;

        return (
          <li
            key={row.id}
            id={row.id}
            data-entry={row.id}
            data-open={open}
            className={[
              ANCHOR_OFFSET_CLASS,
              open
                ? "my-2 bg-surface first:mt-0"
                : [
                    "border-b border-hairline hover:border-ink hover:bg-surface",
                    withReducedMotionSnap(
                      "transition-colors duration-150 ease-soft",
                    ),
                  ].join(" "),
            ].join(" ")}
          >
            <article aria-labelledby={headingId}>
              <h3 id={headingId} className="text-base">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  aria-label={rowAccessibleName(row)}
                  onClick={() =>
                    setOpenId((current) => nextOpenExperienceId(current, row.id))
                  }
                  className={[
                    "group grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 text-left sm:grid-cols-[var(--rail)_1fr_auto]",
                    FOCUS_VISIBLE_CLASS,
                    open ? "p-5 lg:p-6" : "min-h-11 py-2 lg:py-3",
                  ].join(" ")}
                >
                  <span
                    data-slot="dates"
                    className="text-xs tabular-nums leading-6 text-muted"
                  >
                    <DateText date={row.start} />
                    {row.start && row.end ? dateRangeSeparator : null}
                    <DateText date={row.end} />
                  </span>
                  <Chevron open={open} />
                  <span className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                    <span
                      data-slot="title"
                      className="font-semibold leading-6 tracking-tight text-ink"
                    >
                      {row.title}
                    </span>
                    <span aria-hidden="true" className="px-1.5 text-muted">
                      ·
                    </span>
                    <span data-slot="company" className="text-sm font-semibold text-ink">
                      {row.company}
                      {row.location ? ` · ${row.location}` : null}
                    </span>
                    {row.scopeLine ? (
                      <span
                        data-slot="scope"
                        className="mt-0.5 block text-sm leading-snug text-muted"
                      >
                        {row.scopeLine}
                      </span>
                    ) : null}
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-label={`${row.title}, ${row.company}`}
                aria-hidden={!open}
                data-slot="panel"
                className={`grid ${withReducedMotionSnap("transition-[grid-template-rows,opacity] duration-150 ease-soft")}`}
                style={{
                  gridTemplateRows: open ? "1fr" : "0fr",
                  opacity: open ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 sm:pl-[calc(1.25rem+var(--rail)+1rem)] lg:px-6 lg:pb-6 lg:pl-[calc(1.5rem+var(--rail)+1rem)]">
                    <Bullets items={row.bullets} className="tabular-nums" />
                  </div>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

/** Muted chevron; rotates 180° over 150ms when the row opens (snaps if reduced motion). Decorative only. */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={[
        `self-center text-muted ${withReducedMotionSnap("transition-transform duration-150 ease-soft")} group-hover:text-ink sm:col-start-3 sm:row-start-1`,
        open ? "rotate-180" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function DateText({ date }: { date: DateLabel | null }) {
  if (!date) return null;
  return date.dateTime ? (
    <time dateTime={date.dateTime}>{date.label}</time>
  ) : (
    <span>{date.label}</span>
  );
}
