import type { ReactNode } from "react";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { PostList } from "@/components/PostList";
import { Timeline } from "@/components/Timeline";
import { intro, links, now, timeline, work } from "@/content/site";
import { formatMonthYear } from "@/lib/format";
import { getPublishedPosts } from "@/lib/writing";

export default async function Home() {
  const recent = (await getPublishedPosts()).slice(0, 3);

  return (
    <main id="main" className="fade-up">
      <header className="pt-8 sm:pt-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
          <Avatar />
          <div className="min-w-0">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
              {intro.greeting}
            </h1>
            <p className="mt-2.5 font-display text-lg italic leading-snug text-muted sm:text-xl">
              {intro.tagline}
            </p>
          </div>
        </div>
        <p className="mt-6 max-w-prose leading-7 sm:mt-8">{intro.bio}</p>
      </header>

      <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
        <aside
          id="now"
          aria-labelledby="now-heading"
          className="rounded-xl border border-hairline bg-surface px-5 py-5 sm:px-6 sm:py-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2
              id="now-heading"
              className="flex items-center gap-2.5 font-display text-xl tracking-tight"
            >
              <span className="now-live-dot" aria-hidden />
              Now
            </h2>
            <p className="text-sm text-muted">
              Updated{" "}
              <time dateTime={now.updatedAt}>
                {formatMonthYear(now.updatedAt)}
              </time>
            </p>
          </div>
          {now.items.length === 0 ? (
            <p className="mt-5 max-w-prose leading-7 text-muted">
              Nothing noted right now.
            </p>
          ) : (
            <ul className="mt-5 space-y-2.5 leading-7">
              {now.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </aside>

        <HomeSection id="work" title="Work">
          <p className="max-w-prose leading-7">
            {work.paragraph}{" "}
            <a
              href={links.linkedin}
              className="link"
              rel="me noopener noreferrer"
              target="_blank"
            >
              LinkedIn
              <span aria-hidden className="ml-0.5">
                ↗
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </HomeSection>

        <HomeSection id="timeline" title="Timeline">
          <Timeline entries={timeline} />
        </HomeSection>

        <HomeSection
          id="writing"
          title="Writing"
          action={
            <Link href="/writing" className="link text-sm">
              All writing
            </Link>
          }
        >
          <PostList posts={recent} />
        </HomeSection>
      </div>
    </main>
  );
}

function HomeSection({
  id,
  title,
  action,
  children,
}: {
  id: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={`${id}-heading`} className="font-display text-xl tracking-tight">
          {title}
        </h2>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
