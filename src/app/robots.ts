import type { MetadataRoute } from "next";
import { seoView } from "@/lib/selectors";

/** `output: export` needs this on a metadata route. */
export const dynamic = "force-static";

/**
 * Static-exported to `/robots.txt`. Recruiters find this page by name search,
 * so being crawlable is the whole point of it existing.
 *
 * Follows the same gate as the `robots` meta tag: while `siteIndexable` is off
 * or placeholder copy remains, nothing is allowed. Otherwise crawl everything
 * and point at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  if (!seoView.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("sitemap.xml", seoView.siteUrl).href,
  };
}
