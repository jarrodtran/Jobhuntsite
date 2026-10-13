import type { MetadataRoute } from "next";
import { seoView } from "@/lib/selectors";

/** `output: export` needs this on a metadata route. */
export const dynamic = "force-static";

/**
 * Static-exported to `/sitemap.xml`. One page, so this is short — but without it
 * Search Console has nothing to submit and no lastmod signal after a copy pass.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seoView.siteUrl.href,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
