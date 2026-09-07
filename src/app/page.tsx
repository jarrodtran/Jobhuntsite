import type { ReactNode } from "react";
import Link from "next/link";
import { PostList } from "@/components/PostList";
import { Timeline } from "@/components/Timeline";
import { intro, links, now, timeline, work } from "@/content/site";
import { formatMonthYear, isPlaceholder } from "@/lib/format";
import { getPublishedPosts } from "@/lib/writing";

export default async function Home() {
  const recent = (await getPublishedPosts()).slice(0, 3);
  const nowItems = now.items.filter((item) => !isPlaceholder(item));
  const lifeEvents = timeline.filter(
    (entry) => !isPlaceholder(entry.year) && !isPlaceholder(entry.text),
  );
  const hasTagline = !isPlaceholder(intro.tagline);
  const hasBio = !isPlaceholder(intro.bio);

  return (
    <main id="main" tabIndex={-1} className="record-flow pb-4 pt-12 md:pt-20">
      <section className="record-section hero-enter">
        <p className="record-label">Personal record</p>
        <div className="record-body">
          <h1 className="max-w-[12ch] font-display text-[clamp(3rem,8vw,4.75rem)] leading-[0.98] tracking-[-0.045em]">
            {intro.greeting}
          </h1>
          {hasTagline ? (
            <p className="record-serif mt-6 max-w-[30rem] italic text-muted">
              {intro.tagline}
            </p>
          ) : null}
          {hasBio ? (
            <p className="record-serif mt-7 max-w-[34rem]">{intro.bio}</p>
          ) : null}
        </div>
      </section>

      <div className="mt-24 space-y-24 md:mt-32 md:space-y-28">
        {nowItems.length > 0 ? (
          <RecordSection
            id="now"
            label="Now"
            meta={
              <time dateTime={now.updatedAt}>
                Updated {formatMonthYear(now.updatedAt)}
              </time>
            }
          >
            <ul className="record-serif divide-y divide-hairline">
              {nowItems.map((item) => (
                <li key={item} className="py-3 first:pt-0 last:pb-0">
                  {item}
                </li>
              ))}
            </ul>
          </RecordSection>
        ) : null}

        <RecordSection
          id="writing"
          label="Writing"
          action={
            recent.length > 0 ? (
              <Link href="/writing" className="link text-sm">
                All writing
              </Link>
            ) : null
          }
        >
          <PostList posts={recent} />
        </RecordSection>

        {lifeEvents.length > 0 ? (
          <RecordSection id="timeline" label="Timeline">
            <Timeline entries={lifeEvents} />
          </RecordSection>
        ) : null}

        <RecordSection id="elsewhere" label="Elsewhere">
          <p className="record-serif max-w-[34rem]">
            {work.paragraph}{" "}
            <a
              href={links.linkedin}
              className="link"
              rel="me noopener noreferrer"
              target="_blank"
            >
              LinkedIn
              <span aria-hidden> ↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </RecordSection>
      </div>
    </main>
  );
}

function RecordSection({
  id,
  label,
  meta,
  action,
  children,
}: {
  id: string;
  label: string;
  meta?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="record-section">
      <div className="record-label">
        <h2 id={`${id}-heading`}>{label}</h2>
        {meta ? <p className="mt-1 normal-case tracking-normal">{meta}</p> : null}
      </div>
      <div className="record-body">
        {action ? <div className="mb-4 flex justify-end">{action}</div> : null}
        {children}
      </div>
    </section>
  );
}
