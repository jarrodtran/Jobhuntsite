import type { TimelineEntry } from "@/content/site";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="space-y-8">
      {entries.map((entry, index) => (
        <li key={`${entry.year}-${index}`}>
          <p className="record-serif">{entry.text}</p>
          {/^\d{4}$/.test(entry.year) ? (
            <time
              dateTime={entry.year}
              className="mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-muted tabular-nums"
            >
              {entry.year}
            </time>
          ) : (
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted tabular-nums">
              {entry.year}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
