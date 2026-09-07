import type { TimelineEntry } from "@/content/site";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="space-y-4">
      {entries.map((entry, index) => (
        <li
          key={`${entry.year}-${index}`}
          className="grid grid-cols-[5.5rem_1fr] gap-4 sm:grid-cols-[6rem_1fr]"
        >
          <span className="font-display text-muted tabular-nums">{entry.year}</span>
          <span>{entry.text}</span>
        </li>
      ))}
    </ol>
  );
}
