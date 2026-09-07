import type { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { getPublishedPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and essays by Jarrod Tran.",
  alternates: { canonical: "/writing" },
};

export default async function WritingIndex() {
  const posts = await getPublishedPosts();

  return (
    <main id="main" tabIndex={-1} className="record-flow pb-4 pt-12 md:pt-20">
      <section className="record-section hero-enter">
        <p className="record-label">Index</p>
        <div className="record-body">
          <h1 className="font-display text-[clamp(3rem,8vw,4.75rem)] leading-[0.98] tracking-[-0.045em]">
            Writing
          </h1>
          <p className="record-serif mt-6 max-w-[30rem] text-muted">
            Essays and notes, newest first.
          </p>
        </div>
      </section>
      <section
        aria-label="Published writing"
        className="record-section mt-24 md:mt-32"
      >
        <p className="record-label">{posts.length} published</p>
        <div className="record-body">
          <PostList posts={posts} titleAs="h2" />
        </div>
      </section>
    </main>
  );
}
