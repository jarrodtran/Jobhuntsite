import type { MetadataRoute } from "next";
import { seoView } from "@/lib/selectors";

/** `output: export` needs this on a metadata route. */
export const dynamic = "force-static";

/**
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
