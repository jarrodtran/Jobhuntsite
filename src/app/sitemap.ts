import type { MetadataRoute } from "next";
import { origin } from "@/content/site";
import { getPublishedPosts } from "@/lib/writing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();
  const now = new Date();

  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${origin}/writing`,
      lastModified: posts[0] ? new Date(posts[0].date) : now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${origin}/writing/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
