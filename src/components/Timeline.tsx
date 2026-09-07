import type { TimelineEntry } from "@/content/site";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="max-w-prose leading-7 text-muted">
        No notes on the timeline yet.
      </p>
    );
  }

  return (
    <ol>
      {entries.map((entry, index) => (
        <li
          key={`${entry.year}-${index}`}
          className="group grid grid-cols-[0.75rem_minmax(0,1fr)] gap-x-4 pb-7 last:pb-0 sm:gap-x-5"
        >
          <span className="relative flex justify-center" aria-hidden>
            <span className="absolute top-2 bottom-0 w-px bg-hairline group-last:hidden" />
            <span className="relative z-10 mt-2 size-1.5 shrink-0 rounded-full bg-muted" />
          </span>
          <div className="min-w-0">
            <p className="break-words font-display text-sm tracking-tight text-muted">
              {entry.year}
            </p>
            <p className="mt-1 max-w-prose leading-7">{entry.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
