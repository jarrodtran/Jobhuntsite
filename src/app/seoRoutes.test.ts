import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { seoView } from "@/lib/selectors";

describe("robots.txt", () => {
  it("lets crawlers in and points at the sitemap", () => {
    // Recruiters find this page by searching his name; both files were 404.
    expect(seoView.indexable).toBe(true);
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://jarrodtran.com/sitemap.xml",
    });
  });
});

describe("sitemap.xml", () => {
  it("lists the canonical homepage once, with a trailing slash", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(1);
    expect(entries[0].url).toBe("https://jarrodtran.com/");
    expect(entries[0].url).toBe(seoView.siteUrl.href);
  });
});
