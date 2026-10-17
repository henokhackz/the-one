import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);

  // 1. Rate limiting on API routes to prevent automated flooding/scraping
  if (pathname.startsWith('/api/')) {
    // 30 requests per minute per IP for general APIs
    const apiLimit = rateLimit(`api_${ip}`, {
      limit: 30,
      windowSeconds: 60,
    });

    if (!apiLimit.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please throttle your requests.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(apiLimit.resetSeconds),
            'X-RateLimit-Limit': String(apiLimit.limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }
  }

  // 2. Initialize response with standard Next.js continuation
  const response = NextResponse.next();

  // 3. Essential Portfolio Security Headers
  // - Protects against clickjacking, MIME sniffing, and unsolicited hardware access
  // - Specifically calibrated so it never breaks WebGL shaders, Canvas, or Sanity Studio
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  );

  // 4. Protect Studio CMS route from being indexed by search engines
  if (pathname.startsWith('/studio')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest
     * - static image formats in public/ (.png, .jpg, .svg, .gif, .pdf, .woff, .woff2)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|woff|woff2)$).*)',
  ],
};
