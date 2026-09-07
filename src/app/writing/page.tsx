import type { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { getPublishedPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and essays by Jarrod Tran.",
  alternates: {
    canonical: "/writing",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

function EmptyWriting() {
  return (
    <div className="max-w-prose">
      <p className="font-display text-xl tracking-tight">No essays yet</p>
      <p className="mt-3 leading-7 text-muted">
        Published writing will show up here, newest first. Drafts stay off this
        list, the RSS feed, and the sitemap until they are ready.
      </p>
    </div>
  );
}

export default async function WritingIndex() {
  const posts = await getPublishedPosts();

  return (
    <main id="main" className="fade-up">
      <header>
        <h1 className="font-display text-4xl tracking-tight">Writing</h1>
        <p className="mt-3 max-w-prose text-lg text-muted">
          Notes and essays.
        </p>
      </header>
      <div className="mt-10">
        {posts.length === 0 ? <EmptyWriting /> : <PostList posts={posts} />}
      </div>
    </main>
  );
}
