import { getBlogPosts } from "@/sanity/lib/api";
import type { BlogPost } from "@/lib/blog-data";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lantu.pro.et";

  let posts: BlogPost[] = [];
  try {
    posts = await getBlogPosts();
  } catch {
    posts = [];
  }

  const feedItems = posts
    .map((post) => {
      const pubDate = post.date ? new Date(post.date).toUTCString() : new Date().toUTCString();
      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blogs/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blogs/${post.slug}</guid>
        <description><![CDATA[${post.summary || ""}]]></description>
        <category>${post.category || "Technology"}</category>
        <pubDate>${pubDate}</pubDate>
      </item>
    `;
    })
    .join("");

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

