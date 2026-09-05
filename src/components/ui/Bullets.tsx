type Props = {
  items: string[];
  className?: string;
};

/** Locked outcome bullets inside an expanded experience row. Hook: `data-slot="bullets"`. */
export function Bullets({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <ul
      data-slot="bullets"
      className={["list-disc space-y-2 pl-5 text-sm text-ink", className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
