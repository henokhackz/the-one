import { BLOG_POSTS } from "@/lib/blog-data";

export async function GET() {
  const siteUrl = "https://lantu.pro.et";

  const feedItems = BLOG_POSTS.map((post) => {
    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blogs/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blogs/${post.slug}</guid>
        <description><![CDATA[${post.summary}]]></description>
        <category>${post.category}</category>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      </item>
    `;
  }).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lantumo Birhanu — Engineering Journal</title>
    <link>${siteUrl}</link>
    <description>Technical essays on Next.js, React Server Components, WebGL, and Fullstack Architecture.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
