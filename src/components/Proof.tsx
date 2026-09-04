import { proof } from "@/content";

export function Proof() {
  return (
    <section
      className="mx-auto mt-12 max-w-[720px] px-6"
      aria-label="Proof points"
    >
      <dl className="grid grid-cols-1 gap-8 border-t border-rule pt-8 sm:grid-cols-3 sm:gap-6">
        {proof.map((point) => (
          <div key={point.metric + point.label}>
            <dt className="font-sans text-[1.75rem] font-medium leading-none tabular-nums tracking-tight">
              {point.metric}
            </dt>
            <dd className="mt-2 text-sm leading-snug text-muted">
              {point.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
