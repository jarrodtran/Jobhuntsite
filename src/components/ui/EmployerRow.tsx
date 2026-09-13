type Props = {
  employers: string[];
  label: string;
  className?: string;
};

/**
 * Employer strip: "Tesla · Waymo · Apple · Amazon" in text-base ink, no logos.
 * One step above the muted chip labels so recruiters scan companies before
 * figures. A real list so assistive tech announces the count; the mid-dot
 * separators are CSS, not data.
 * Hook: `data-slot="employers"`.
 */
export function EmployerRow({ employers, label, className }: Props) {
  if (employers.length === 0) return null;

  return (
    <ul
      data-slot="employers"
      aria-label={label}
      className={["flex flex-wrap items-baseline gap-x-2 text-base text-ink", className]
        .filter(Boolean)
        .join(" ")}
    >
      {employers.map((employer) => (
        <li
          key={employer}
          className="after:ml-2 after:text-muted after:content-['·'] last:after:content-none"
        >
          {employer}
        </li>
      ))}
    </ul>
  );
}
