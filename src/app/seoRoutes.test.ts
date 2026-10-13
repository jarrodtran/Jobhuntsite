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
  it("lists home, Writing, and Work with trailing slashes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    expect(urls).toEqual([
      "https://jarrodtran.com/",
      "https://jarrodtran.com/writing/",
      "https://jarrodtran.com/work/",
    ]);
    expect(entries[0].url).toBe(seoView.siteUrl.href);
    expect(entries[0].priority).toBe(1);
  });
});
