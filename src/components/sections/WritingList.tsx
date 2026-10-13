import { sectionShellClass } from "@/components/layout/Section";
import { SubscribeCta } from "@/components/ui/SubscribeCta";
import { writingView } from "@/lib/selectors";

type Props = {
  /** When set, show at most this many posts (home preview). */
  previewLimit?: number;
  /** Full Writing route uses page heading (h1); home keeps a section h2. */
  asPage?: boolean;
};

function formatDate(iso: string): string | null {
  if (!iso) return null;
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return iso;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(ms));
}

/** Substack posts from build-time JSON. Empty feed shows copy + Subscribe. */
export function WritingList({ previewLimit, asPage = false }: Props) {
  const headingId = `${writingView.section.id}-heading`;
  const posts =
    typeof previewLimit === "number"
      ? writingView.posts.slice(0, previewLimit)
      : writingView.posts;
  const HeadingTag = asPage ? "h1" : "h2";
  const showIndexLink = typeof previewLimit === "number" && !asPage;

  return (
    <section
      id={writingView.section.id}
      data-section={writingView.section.id}
      aria-labelledby={headingId}
      className={`${sectionShellClass} ${asPage ? "pt-16 sm:pt-20 lg:pt-24" : "mt-section"}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <HeadingTag
          id={headingId}
          data-slot="section-heading"
          className={
            asPage
              ? "font-display text-5xl font-normal tracking-tight lg:text-6xl"
              : "text-label font-semibold uppercase tracking-label text-muted"
          }
        >
          {writingView.heading}
        </HeadingTag>
        <SubscribeCta />
      </div>

      {posts.length === 0 ? (
        <div data-slot="writing-empty" className="mt-5 max-w-voice">
          <p className="text-base leading-relaxed text-muted">
            {writingView.empty}
          </p>
          <p className="mt-3 text-sm">
            <a
              href={writingView.publicationUrl}
              target="_blank"
              rel="noopener"
              className="link text-ink"
              data-cta="substack"
            >
              {writingView.openSubstackLabel}
            </a>
          </p>
        </div>
      ) : (
        <ul data-slot="writing-list" className="mt-6 divide-y divide-hairline">
          {posts.map((post) => {
            const date = formatDate(post.publishedAt);
            return (
              <li key={post.url} data-entry={post.url} className="py-5">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener"
                  className="group block"
                >
                  <h3
                    data-slot="title"
                    className="font-display text-2xl font-normal tracking-tight text-ink group-hover:underline group-hover:decoration-ink group-hover:underline-offset-4 lg:text-3xl"
                  >
                    {post.title}
                  </h3>
                  {date ? (
                    <p
                      data-slot="dates"
                      className="mt-1 text-xs tabular-nums text-muted"
                    >
                      <time dateTime={post.publishedAt}>{date}</time>
                    </p>
                  ) : null}
                  {post.excerpt ? (
                    <p
                      data-slot="excerpt"
                      className="mt-2 max-w-voice text-sm leading-relaxed text-muted lg:text-base"
                    >
                      {post.excerpt}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm font-semibold text-ink">
                    {writingView.readLabel}
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {showIndexLink ? (
        <p className="mt-6 text-sm">
          <a
            href={writingView.indexHref}
            className="link text-ink"
            data-cta="writing-index"
          >
            {writingView.allWritingLabel}
          </a>
        </p>
      ) : null}
    </section>
  );
}
