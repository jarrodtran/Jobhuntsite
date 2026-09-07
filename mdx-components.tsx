import type { MDXComponents } from "mdx/types";

const prose = {
  h1: "mt-12 font-display text-4xl leading-tight tracking-[-0.03em] text-ink first:mt-0",
  h2: "mt-12 font-display text-3xl leading-tight tracking-[-0.03em] text-ink first:mt-0",
  h3: "mt-9 font-display text-2xl leading-tight tracking-[-0.02em] text-ink first:mt-0",
  p: "record-serif mt-6 text-ink first:mt-0",
  a: "link",
  ul: "record-serif mt-6 list-disc space-y-2 pl-5",
  ol: "record-serif mt-6 list-decimal space-y-2 pl-5",
  li: "pl-1",
  blockquote:
    "record-serif mt-8 border-l border-accent pl-5 text-muted italic",
  code: "rounded-sm bg-code-bg px-1.5 py-0.5 font-sans text-[0.84em]",
  pre: "mdx-pre mt-8 overflow-x-auto border border-hairline bg-code-bg p-5 font-mono text-sm leading-6",
  hr: "my-12 border-hairline",
  table: "mt-8 w-full text-left text-sm",
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
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="font-display italic">{children}</em>,
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
