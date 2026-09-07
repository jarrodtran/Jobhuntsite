import Link from "next/link";
import type { ReactNode } from "react";
import { formatPostDate } from "@/lib/format";
import type { Post } from "@/lib/writing";

export function PostList({
  posts,
  empty,
}: {
  posts: Post[];
  empty?: ReactNode;
}) {
  if (posts.length === 0) {
    return (
      empty ?? <p className="text-muted">No published writing yet.</p>
    );
  }

  return (
    <ul className="divide-y divide-hairline">
      {posts.map((post) => (
        <li key={post.slug} className="py-4 first:pt-0 last:pb-0">
          <article>
            <Link href={`/writing/${post.slug}`} className="group block">
              <time dateTime={post.date} className="text-sm text-muted">
                {formatPostDate(post.date)}
              </time>
              <p className="mt-1 font-display text-lg tracking-tight text-ink group-hover:text-accent">
                {post.title}
              </p>
              <p className="mt-1 text-muted">{post.summary}</p>
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
