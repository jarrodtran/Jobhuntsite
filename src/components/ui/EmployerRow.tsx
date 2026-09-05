type Props = {
  employers: string[];
  label: string;
  className?: string;
};

/**
 * Pedigree row: employer names as a real list so assistive tech announces the
 * count. Visual separators come from CSS, not from the data.
 * Hook: `data-slot="employers"`.
 */
export function EmployerRow({ employers, label, className }: Props) {
  if (employers.length === 0) return null;

  return (
    <ul
      data-slot="employers"
      aria-label={label}
      className={[
        "flex flex-wrap items-baseline gap-x-2 text-small text-foreground",
        className,
      ]
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
