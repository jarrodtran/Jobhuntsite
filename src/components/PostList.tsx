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
      <p className="max-w-prose leading-7 text-muted">
        Nothing published yet — first post soon.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-hairline">
      {posts.map((post) => (
        <li key={post.slug} className="py-4 first:pt-0 last:pb-0">
          <Link href={`/writing/${post.slug}`} className="group block">
            <p className="text-sm text-muted">{formatPostDate(post.date)}</p>
            <Title className="mt-1 font-display text-lg tracking-tight text-ink group-hover:text-accent">
              {post.title}
            </Title>
            <p className="mt-1 text-muted">{post.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
