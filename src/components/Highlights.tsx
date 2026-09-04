import { highlights } from "@/content";

export function Highlights() {
  return (
    <section
      className="mx-auto mt-16 max-w-[720px] px-6"
      aria-labelledby="highlights-heading"
    >
      <h2
        id="highlights-heading"
        className="font-serif text-xl tracking-tight sm:text-2xl"
      >
        Selected impact
      </h2>
      <ol className="mt-6">
        {highlights.map((item, index) => (
          <li
            key={item.outcome}
            className="border-t border-rule py-6 last:pb-0"
          >
            <p className="text-xs tabular-nums text-muted">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 font-medium">{item.outcome}</p>
            <p className="mt-2 text-sm text-muted">{item.scope}</p>
            <p className="mt-1 text-sm">{item.how}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
