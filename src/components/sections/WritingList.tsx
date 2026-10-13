import { sectionShellClass } from "@/components/layout/Section";
import { SubscribeCta } from "@/components/ui/SubscribeCta";
import { writingView } from "@/lib/selectors";

type Props = {
  /** When true, show every post. Home uses the same list while the feed is small. */
  previewLimit?: number;
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
export function WritingList({ previewLimit }: Props) {
  const headingId = `${writingView.section.id}-heading`;
  const posts =
    typeof previewLimit === "number"
      ? writingView.posts.slice(0, previewLimit)
      : writingView.posts;

  return (
    <section
      id={writingView.section.id}
      data-section={writingView.section.id}
      aria-labelledby={headingId}
      className={`${sectionShellClass} mt-section`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2
          id={headingId}
          data-slot="section-heading"
          className="text-label font-semibold uppercase tracking-label text-muted"
        >
          {writingView.heading}
        </h2>
        <SubscribeCta />
      </div>

      {posts.length === 0 ? (
        <p
          data-slot="writing-empty"
          className="mt-5 max-w-voice text-base leading-relaxed text-muted"
        >
          {writingView.empty}
        </p>
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
    </section>
  );
}
