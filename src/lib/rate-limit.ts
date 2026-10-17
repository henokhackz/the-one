/**
 * Portfolio-Tailored In-Memory Sliding-Window Rate Limiter
 * 
 * Specifically calibrated for developer portfolios:
 * - Generous allowances for recruiters and visitors browsing multiple pages.
 * - Strict gating on sensitive actions (contact form submissions, burst API abuse).
 * - Automatic background cache cleanup to prevent memory leaks on server runtimes.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Run periodic cleanup every 5 minutes to release stale IP entries
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      // Keep only timestamps within the last 15 minutes
      const valid = record.timestamps.filter((ts) => now - ts < 15 * 60 * 1000);
      if (valid.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, { timestamps: valid });
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  /** Maximum number of allowed requests within the window */
  limit: number;
  /** Sliding time window in seconds */
  windowSeconds: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 10, windowSeconds: 60 }
): RateLimitResult {
  const now = Date.now();
  const windowMs = options.windowSeconds * 1000;
  const threshold = now - windowMs;

  const record = rateLimitStore.get(identifier) || { timestamps: [] };

  // Filter timestamps outside the sliding window
  const activeTimestamps = record.timestamps.filter((ts) => ts > threshold);

  if (activeTimestamps.length >= options.limit) {
    const oldest = activeTimestamps[0];
    const resetSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    return {
      success: false,
      limit: options.limit,
      remaining: 0,
      resetSeconds,
    };
  }

  activeTimestamps.push(now);
  rateLimitStore.set(identifier, { timestamps: activeTimestamps });

  return {
    success: true,
    limit: options.limit,
    remaining: options.limit - activeTimestamps.length,
    resetSeconds: options.windowSeconds,
  };
}

/**
 * Extracts a client IP from Next.js request headers
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || '127.0.0.1';
}
