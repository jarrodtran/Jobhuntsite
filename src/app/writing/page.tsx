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
    <main id="main" className="fade-up">
      <h1 className="font-display text-4xl tracking-tight">Writing</h1>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </main>
  );
}
