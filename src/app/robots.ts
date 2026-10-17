import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lantu.pro.et';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/work',
          '/work/*',
          '/blogs',
          '/blogs/*',
          '/contact',
          '/services',
        ],
        disallow: [
          '/studio',
          '/studio/*',
          '/api/*',
          '/dashboard',
          '/dashboard/*',
          '/profile',
          '/_next/*',
        ],
      },
      // Ensure friendly AI search engines (Perplexity, ChatGPT bot) index projects cleanly
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: ['/', '/work/*', '/blogs/*'],
        disallow: ['/studio', '/api/*'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
