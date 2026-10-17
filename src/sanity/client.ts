import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { projectId, dataset, apiVersion, useCdn, isSanityConfigured } from './env';

const token =
  typeof window === 'undefined'
    ? process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_KEY
    : undefined;

export const client = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: token ? false : useCdn,
      perspective: 'published',
      token,
    })
  : null;

// Image URL builder for Sanity assets
const imageBuilder = isSanityConfigured()
  ? createImageUrlBuilder({
      projectId,
      dataset,
    })
  : null;

/**
 * Helper to build optimized image URLs from Sanity image objects or strings.
 * Returns null if Sanity is not configured or source is invalid.
 */
export function urlForImage(source: any) {
  if (!imageBuilder || !source) return null;
  try {
    return imageBuilder.image(source).auto('format').fit('max');
  } catch (error) {
    console.warn('Failed to build Sanity image URL:', error);
    return null;
  }
}

/**
 * Robust fetch wrapper for Sanity GROQ queries with ISR revalidation.
 * Gracefully returns null if Sanity is unconfigured or fetch fails.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T | null> {
  if (!client || !isSanityConfigured()) {
    return null;
  }

  try {
    const fetchOptions: any = {};
    if (typeof revalidate === 'number') {
      fetchOptions.next = { revalidate, tags };
    } else if (revalidate === false) {
      fetchOptions.cache = 'no-store';
    }

    return await client.fetch<T>(query, params, fetchOptions);
  } catch (error) {
    console.warn(`[Sanity] Query failed, falling back to local data:`, error);
    return null;
  }
}
