import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Prose } from "@/components/Prose";
import { formatPostDate } from "@/lib/format";
import {
  getPublishedPost,
  getPublishedPosts,
  isDraft,
  isSafeSlug,
} from "@/lib/writing";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  if (posts.some(isDraft)) {
    throw new Error(
      "generateStaticParams received a draft. getPublishedPosts must exclude draft: true.",
    );
  }
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
    return { title: "Not found", robots: { index: false, follow: false } };
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
  if (!isSafeSlug(slug)) {
    notFound();
  }

  const post = await getPublishedPost(slug);
  if (!post || isDraft(post)) {
    notFound();
  }

  const { default: Content } = await import(
    `../../../../content/writing/${slug}.mdx`
  );

  return (
    <main id="main" className="fade-up">
      <nav className="mb-10">
        <Link
          href="/writing"
          className="text-sm text-muted hover:text-accent"
        >
          <span aria-hidden>← </span>Back to writing
        </Link>
      </nav>
      <article>
        <header>
          <time dateTime={post.date} className="text-sm text-muted">
            {formatPostDate(post.date)}
          </time>
          <h1 className="mt-3 font-display text-4xl tracking-tight leading-[1.15] sm:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-7 text-muted">{post.summary}</p>
        </header>
        <hr className="my-10 border-hairline" aria-hidden />
        <Prose>
          <Content />
        </Prose>
      </article>
    </main>
  );
}
