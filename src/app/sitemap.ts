import type { MetadataRoute } from "next";
import { absoluteUrl, now } from "@/content/site";
import { getListablePosts, isIndexable } from "@/lib/indexable";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!(await isIndexable())) {
    return [];
  }

  const posts = await getListablePosts();
  const latestPost = posts[0]?.date;

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now.updatedAt,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/writing"),
      lastModified: latestPost ?? now.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/writing/${post.slug}`),
      lastModified: post.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
