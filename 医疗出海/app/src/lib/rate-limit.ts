/**
 * Simple in-memory rate limiter.
 * Uses a sliding window per IP/key.
 * Suitable for single-instance deployments (Vercel serverless functions
 * are stateless between invocations, but this still helps within a
 * single cold-start window and for local development).
 */

interface Entry {
  timestamps: number[];
}

const store = new Map<string, Entry>();

// Clean up entries older than 1 minute every 60 seconds
const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  const cutoff = now - 60_000;
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

export interface RateLimitOptions {
  /** Max requests within the window */
  limit: number;
  /** Window in milliseconds */
  windowMs: number;
}

const DEFAULT_OPTIONS: RateLimitOptions = {
  limit: 10,
  windowMs: 60_000, // 1 minute
};

export function rateLimit(
  key: string,
  options: Partial<RateLimitOptions> = {}
): { success: boolean; remaining: number } {
  cleanup();

  const { limit, windowMs } = { ...DEFAULT_OPTIONS, ...options };
  const now = Date.now();
  const cutoff = now - windowMs;

  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(key, entry);
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.timestamps.push(now);
  return { success: true, remaining: limit - entry.timestamps.length };
}

/**
 * Get a rate-limit key from a NextRequest.
 * Uses X-Forwarded-For (Vercel sets this) or falls back to "unknown".
 */
export function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
