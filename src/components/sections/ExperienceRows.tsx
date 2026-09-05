"use client";

import { useState } from "react";
import { Bullets } from "@/components/ui/Bullets";
import type { DateLabel, ExperienceRow } from "@/lib/selectors";

type Props = {
  rows: ExperienceRow[];
  dateRangeSeparator: string;
};

/**
 * Accordion. One row open at a time at every width; the current role is open
 * on first paint (server-rendered, so it reads correctly before hydration).
 *
 * Layout: <640 dates stack above the title; ≥640 a 7rem date rail sits left of
 * the content (`--rail` in globals.css). Motion is 150ms on grid rows (height)
 * and opacity only; the +/− indicator swaps without animating.
 *
 * Hooks: `data-entry="<id>"`, `data-open`, `data-slot` on dates, title,
 * company, scope, panel, bullets.
 */
export function ExperienceRows({ rows, dateRangeSeparator }: Props) {
  const [openId, setOpenId] = useState<string | null>(
    () => rows.find((row) => row.defaultOpen)?.id ?? null,
  );

  return (
    <ol className="mt-4 border-y border-hairline divide-y divide-hairline">
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
            className="scroll-mt-8"
          >
            <article aria-labelledby={headingId}>
              <h3 id={headingId} className="text-base">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : row.id)}
                  className="grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-5 text-left sm:grid-cols-[var(--rail)_1fr_auto]"
                >
                  <span
                    data-slot="dates"
                    className="text-sm tabular-nums text-muted"
                  >
                    <DateText date={row.start} />
                    {row.start && row.end ? dateRangeSeparator : null}
                    <DateText date={row.end} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="row-span-1 self-start text-sm text-muted sm:col-start-3 sm:row-start-1"
                  >
                    {open ? "−" : "+"}
                  </span>
                  <span className="col-span-2 min-w-0 sm:col-span-1 sm:col-start-2 sm:row-start-1">
                    <span
                      data-slot="title"
                      className="block font-medium leading-snug text-ink"
                    >
                      {row.title}
                    </span>
                    <span
                      data-slot="company"
                      className="block text-sm text-muted"
                    >
                      {row.company}
                      {row.location ? ` · ${row.location}` : null}
                    </span>
                    {row.scopeLine ? (
                      <span
                        data-slot="scope"
                        className="mt-1 block text-sm text-muted"
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
                  <div className="pb-5 sm:pl-[calc(var(--rail)+1rem)]">
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

function DateText({ date }: { date: DateLabel | null }) {
  if (!date) return null;
  return date.dateTime ? (
    <time dateTime={date.dateTime}>{date.label}</time>
  ) : (
    <span>{date.label}</span>
  );
}
