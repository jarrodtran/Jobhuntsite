import type { Metadata } from "next";
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
    <main id="main" tabIndex={-1} className="fade-up">
      <article>
        <p className="text-sm text-muted">{formatPostDate(post.date)}</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">
          {post.title}
        </h1>
        <p className="mt-3 text-lg text-muted">{post.summary}</p>
        <div className="mt-10">
          <Content />
        </div>
      </article>
    </main>
  );
}
