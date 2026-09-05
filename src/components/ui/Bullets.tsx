type Props = {
  items: string[];
  className?: string;
};

/** Outcome bullets under a role or experience entry. Hook: `data-slot="bullets"`. */
export function Bullets({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <ul
      data-slot="bullets"
      className={["list-disc space-y-1 pl-5 text-small", className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
