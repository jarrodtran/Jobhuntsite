import Link from "next/link";
import { formatPostDate } from "@/lib/format";
import type { Post } from "@/lib/writing";

export function PostList({
  posts,
  titleAs: Title = "h3",
}: {
  posts: Post[];
  titleAs?: "h2" | "h3";
}) {
  if (posts.length === 0) {
    return (
      <p className="record-serif max-w-[30rem] text-muted">
        No essays yet. This is where longer notes will live.
      </p>
    );
  }

  return (
    <ul className="space-y-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/writing/${post.slug}`} className="group block">
            <time
              dateTime={post.date}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
            >
              {formatPostDate(post.date)}
            </time>
            <Title className="mt-2 font-display text-2xl leading-tight tracking-[-0.025em] text-ink decoration-accent-soft underline-offset-4 group-hover:underline">
              {post.title}
            </Title>
            <p className="mt-2 max-w-[32rem] text-muted">{post.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
