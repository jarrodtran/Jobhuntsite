type Props = {
  employers: string[];
  label: string;
  className?: string;
};

/**
 * Employer strip: "Tesla · Waymo · Apple · Amazon". A real list so assistive
 * tech announces the count; the dot separators are CSS, not data.
 * Hook: `data-slot="employers"`.
 */
export function EmployerRow({ employers, label, className }: Props) {
  if (employers.length === 0) return null;

  return (
    <ul
      data-slot="employers"
      aria-label={label}
      className={["flex flex-wrap items-baseline gap-x-2 text-sm text-muted", className]
        .filter(Boolean)
        .join(" ")}
    >
      {employers.map((employer) => (
        <li
          key={employer}
          className="after:ml-2 after:content-['·'] last:after:content-none"
        >
          {employer}
        </li>
      ))}
    </ul>
  );
}
