import type { MetadataRoute } from 'next';
import { getProjects, getBlogPosts } from '@/sanity/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lantu.pro.et';
  const now = new Date();

  // Core portfolio landmark pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blogs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic projects from Sanity CMS
  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectRoutes = projects.map((p) => ({
      url: `${siteUrl}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }));
  } catch (error) {
    console.warn('Failed to load projects for sitemap:', error);
  }

  // Dynamic blogs from Sanity CMS
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogPosts();
    blogRoutes = blogs.map((b) => ({
      url: `${siteUrl}/blogs/${b.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));
  } catch (error) {
    console.warn('Failed to load blog posts for sitemap:', error);
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
