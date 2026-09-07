import type { MetadataRoute } from "next";
import { origin } from "@/content/site";
import { isIndexable } from "@/lib/indexable";

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (!(await isIndexable())) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${origin}/sitemap.xml`,
  };
}
