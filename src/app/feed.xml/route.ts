import { absoluteUrl, intro, origin } from "@/content/site";
import { formatRfc822, publicText } from "@/lib/format";
import { getListablePosts } from "@/lib/indexable";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const posts = await getListablePosts();
  const feedUrl = absoluteUrl("/feed.xml");
  const lastBuild = posts[0]
    ? formatRfc822(posts[0].date)
    : new Date().toUTCString();
  const description = publicText(intro.tagline, `Writing · ${intro.name}`);

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/writing/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${formatRfc822(post.date)}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(intro.name)}</title>
    <link>${escapeXml(origin)}</link>
    <description>${escapeXml(description)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
