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
    <main id="main" tabIndex={-1} className="fade-up">
      <section className="pt-6 sm:pt-10">
        <Avatar />
        <h1 className="mt-6 font-display text-4xl tracking-tight sm:text-5xl">
          {intro.greeting}
        </h1>
        <p className="mt-3 text-lg text-muted">{intro.tagline}</p>
        <p className="mt-5 max-w-prose leading-7">{intro.bio}</p>
      </section>

      <section className="mt-16 rounded-xl border border-hairline bg-surface p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-xl tracking-tight">Now</h2>
          <p className="text-sm text-muted">
            Updated {formatMonthYear(now.updatedAt)}
          </p>
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7">
          {now.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-xl tracking-tight">Work</h2>
        <p className="mt-4 leading-7">
          {work.paragraph}{" "}
          <a href={links.linkedin} className="link">
            LinkedIn
          </a>
          .
        </p>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-xl tracking-tight">Timeline</h2>
        <div className="mt-5">
          <Timeline entries={timeline} />
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-display text-xl tracking-tight">Writing</h2>
          <Link href="/writing" className="link text-sm">
            All writing
          </Link>
        </div>
        <div className="mt-5">
          <PostList posts={recent} />
        </div>
      </section>
    </main>
  );
}
