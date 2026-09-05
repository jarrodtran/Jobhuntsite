"use client";

import { useEffect, useState } from "react";
import { Bullets } from "@/components/ui/Bullets";
import { bleedCardClass, cardClass } from "@/components/ui/card";
import type { DateLabel, ExperienceRow } from "@/lib/selectors";

type Props = {
  rows: ExperienceRow[];
  dateRangeSeparator: string;
};

/**
 * Accordion. One row open at a time at every width; the current role is open
 * on first paint (server-rendered, so it reads correctly before hydration).
 * A `#<entry-id>` hash — from the Fit links or a shared URL — opens that row.
 *
 * Closed rows are a list: dates, title, company, scope, a hairline under each,
 * no padding beyond the column. The open row is the product panel: white card,
 * 1.25rem padding, the 7rem date column (`--rail`) as its left rail and the
 * bullets aligned to the title column. Under 640px the panel runs edge to edge
 * and dates stack above the title. Motion is 150ms on grid rows (height),
 * opacity, and the chevron.
 *
 * Hooks: `data-entry="<id>"`, `data-open`, `data-slot` on dates, title,
 * company, scope, panel, bullets.
 */
export function ExperienceRows({ rows, dateRangeSeparator }: Props) {
  const [openId, setOpenId] = useState<string | null>(
    () => rows.find((row) => row.defaultOpen)?.id ?? null,
  );

  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && rows.some((row) => row.id === id)) setOpenId(id);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [rows]);

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
              "scroll-mt-8",
              open
                ? `${cardClass} ${bleedCardClass} my-2 first:mt-0`
                : "border-b border-hairline",
            ].join(" ")}
          >
            <article aria-labelledby={headingId}>
              <h3 id={headingId} className="text-base">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : row.id)}
                  className={[
                    "group grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-0.5 text-left sm:grid-cols-[var(--rail)_1fr_auto]",
                    open ? "p-5" : "py-3.5",
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
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span
                        data-slot="title"
                        className="font-semibold leading-6 tracking-tight text-ink"
                      >
                        {row.title}
                      </span>
                      <span data-slot="company" className="text-sm text-muted">
                        {row.company}
                        {row.location ? ` · ${row.location}` : null}
                      </span>
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
                aria-labelledby={headingId}
                aria-hidden={!open}
                data-slot="panel"
                className="grid transition-[grid-template-rows,opacity] duration-150 ease-soft"
                style={{
                  gridTemplateRows: open ? "1fr" : "0fr",
                  opacity: open ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 sm:pl-[calc(1.25rem+var(--rail)+1rem)]">
                    <Bullets items={row.bullets} />
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

/** Muted chevron; rotates 180° over 150ms when the row opens. Decorative only. */
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
        "mt-1 self-start text-muted transition-transform duration-150 ease-soft group-hover:text-ink sm:col-start-3 sm:row-start-1",
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
