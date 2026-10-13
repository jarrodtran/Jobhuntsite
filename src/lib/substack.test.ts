import { describe, expect, it } from "vitest";
import {
  normalizeFeedFile,
  parseSubstackRss,
  stripHtml,
} from "@/lib/substack";

const SAMPLE_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Jarrod Tran</title>
    <item>
      <title><![CDATA[First note]]></title>
      <link>https://jarrodtran.substack.com/p/first-note</link>
      <pubDate>Mon, 01 Jan 2024 12:00:00 GMT</pubDate>
      <description><![CDATA[<p>Hello <em>world</em> about AI enablement.</p>]]></description>
    </item>
    <item>
      <title>Second note</title>
      <link>https://jarrodtran.substack.com/p/second</link>
      <description>Plain excerpt</description>
    </item>
  </channel>
</rss>`;

const EMPTY_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Jarrod Tran</title></channel></rss>`;

describe("stripHtml", () => {
  it("removes tags and collapses space", () => {
    expect(stripHtml("<p>Hello <b>there</b></p>")).toBe("Hello there");
  });
});

describe("parseSubstackRss", () => {
  it("returns an empty list when the channel has no items", () => {
    expect(parseSubstackRss(EMPTY_FEED)).toEqual([]);
  });

  it("maps title, link, date, and stripped excerpt", () => {
    const posts = parseSubstackRss(SAMPLE_FEED);
    expect(posts).toHaveLength(2);
    expect(posts[0]).toEqual({
      title: "First note",
      url: "https://jarrodtran.substack.com/p/first-note",
      publishedAt: "2024-01-01T12:00:00.000Z",
      excerpt: "Hello world about AI enablement.",
    });
    expect(posts[1].title).toBe("Second note");
    expect(posts[1].excerpt).toBe("Plain excerpt");
  });
});

describe("normalizeFeedFile", () => {
  it("treats missing or invalid JSON as an empty feed", () => {
    expect(normalizeFeedFile(null).posts).toEqual([]);
    expect(normalizeFeedFile({ posts: [{ title: "x" }] }).posts).toEqual([]);
  });

  it("keeps well-formed posts", () => {
    const file = normalizeFeedFile({
      fetchedAt: "2024-01-01T00:00:00.000Z",
      source: "https://jarrodtran.substack.com/feed",
      posts: [
        {
          title: "A",
          url: "https://example.com/a",
          publishedAt: "2024-01-01T00:00:00.000Z",
          excerpt: "hi",
        },
      ],
    });
    expect(file.posts).toHaveLength(1);
    expect(file.posts[0].title).toBe("A");
  });
});
