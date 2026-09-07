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
    <ol className="border-l border-hairline">
      {entries.map((entry, index) => (
        <li
          key={`${entry.year}-${index}`}
          className="py-4 pl-5 first:pt-0 last:pb-0 sm:pl-6"
        >
          <p className="min-w-0 break-words font-display text-sm tracking-tight text-muted">
            {entry.year}
          </p>
          <p className="mt-1 max-w-prose leading-7">{entry.text}</p>
        </li>
      ))}
    </ol>
  );
}
