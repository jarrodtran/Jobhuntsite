import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate } from "@/lib/format";
import { getPublishedPost, getPublishedPosts } from "@/lib/writing";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) {
    return { title: "Not found" };
  }
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function WritingPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) {
    notFound();
  }

  const { default: Content } = await import(
    `../../../../content/writing/${slug}.mdx`
  );

  return (
    <main id="main" tabIndex={-1} className="record-flow pb-4 pt-12 md:pt-20">
      <article className="record-section">
        <div className="record-label">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </div>
        <div className="record-body">
          <Link href="/writing" className="link text-sm">
            ← Writing
          </Link>
          <header className="mt-8">
            <h1 className="max-w-[13ch] font-display text-[clamp(2.75rem,7vw,4.25rem)] leading-[1.02] tracking-[-0.04em]">
              {post.title}
            </h1>
            <p className="record-serif mt-5 text-muted">{post.summary}</p>
          </header>
          <div className="mt-12">
            <Content />
          </div>
        </div>
      </article>
    </main>
  );
}
