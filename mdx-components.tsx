import type { MDXComponents } from "mdx/types";

const prose = {
  h1: "mt-10 font-display text-3xl tracking-tight text-ink first:mt-0",
  h2: "mt-8 font-display text-2xl tracking-tight text-ink first:mt-0",
  h3: "mt-6 font-display text-xl tracking-tight text-ink first:mt-0",
  p: "mt-4 text-base leading-7 text-ink first:mt-0",
  a: "link",
  ul: "mt-4 list-disc space-y-2 pl-5 leading-7",
  ol: "mt-4 list-decimal space-y-2 pl-5 leading-7",
  li: "pl-1",
  blockquote:
    "mt-4 border-l-2 border-accent pl-4 text-muted italic leading-7",
  code: "rounded bg-surface px-1 py-0.5 text-[0.9em] font-medium",
  pre: "mt-4 overflow-x-auto rounded-lg bg-surface p-4 text-sm leading-6 ring-1 ring-hairline",
  hr: "my-8 border-hairline",
  table: "mt-4 w-full text-left text-sm",
  th: "border-b border-hairline py-2 pr-4 font-medium",
  td: "border-b border-hairline py-2 pr-4",
} as const;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className={prose.h1}>{children}</h1>,
    h2: ({ children }) => <h2 className={prose.h2}>{children}</h2>,
    h3: ({ children }) => <h3 className={prose.h3}>{children}</h3>,
    p: ({ children }) => <p className={prose.p}>{children}</p>,
    a: ({ href, children }) => (
      <a href={href} className={prose.a}>
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className={prose.ul}>{children}</ul>,
    ol: ({ children }) => <ol className={prose.ol}>{children}</ol>,
    li: ({ children }) => <li className={prose.li}>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className={prose.blockquote}>{children}</blockquote>
    ),
    code: ({ children }) => <code className={prose.code}>{children}</code>,
    pre: ({ children }) => <pre className={prose.pre}>{children}</pre>,
    hr: () => <hr className={prose.hr} />,
    table: ({ children }) => (
      <div className="mt-4 overflow-x-auto">
        <table className={prose.table}>{children}</table>
      </div>
    ),
    th: ({ children }) => <th className={prose.th}>{children}</th>,
    td: ({ children }) => <td className={prose.td}>{children}</td>,
    ...components,
  };
}
