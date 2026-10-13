import type { MetadataRoute } from "next";
import { seoView } from "@/lib/selectors";

/** `output: export` needs this on a metadata route. */
export const dynamic = "force-static";

/**
 * Static-exported to `/sitemap.xml`. Publisher routes: home, Writing, Work.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = seoView.siteUrl.origin;
  const lastModified = new Date();

  return [
    {
      url: `${origin}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${origin}/writing/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${origin}/work/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
