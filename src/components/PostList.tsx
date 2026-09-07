import Link from "next/link";
import { formatPostDate } from "@/lib/format";
import type { Post } from "@/lib/writing";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-muted">Nothing published yet — first post soon.</p>
    );
  }

  return (
    <ul className="divide-y divide-hairline">
      {posts.map((post) => (
        <li key={post.slug} className="py-4 first:pt-0 last:pb-0">
          <Link href={`/writing/${post.slug}`} className="group block">
            <p className="text-sm text-muted">{formatPostDate(post.date)}</p>
            <p className="mt-1 font-display text-lg tracking-tight text-ink group-hover:text-accent">
              {post.title}
            </p>
            <p className="mt-1 text-muted">{post.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
