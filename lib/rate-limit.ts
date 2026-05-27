const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export const RATE_LIMITS = {
  contact: { maxRequests: 5, windowMs: 60 * 60 * 1000 } as RateLimitConfig,
  application: { maxRequests: 3, windowMs: 60 * 60 * 1000 } as RateLimitConfig,
  certificateVerify: { maxRequests: 10, windowMs: 60 * 60 * 1000 } as RateLimitConfig,
  eventRegistration: { maxRequests: 10, windowMs: 60 * 60 * 1000 } as RateLimitConfig,
  adminLogin: { maxRequests: 5, windowMs: 15 * 60 * 1000 } as RateLimitConfig,
  newsletter: { maxRequests: 3, windowMs: 60 * 60 * 1000 } as RateLimitConfig,
  general: { maxRequests: 100, windowMs: 15 * 60 * 1000 } as RateLimitConfig,
};

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  return '127.0.0.1';
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
    return { allowed: true, remaining: config.maxRequests - 1, resetIn: config.windowMs };
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  };
}

export function rateLimitResponse(resetIn: number): Response {
  const retryAfter = Math.ceil(resetIn / 1000);
  return new Response(
    JSON.stringify({
      error: 'Too many requests. Please try again later.',
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
      },
    }
  );
}

// Cleanup old entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    rateLimitStore.forEach((entry, key) => {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    });
  }, 60 * 1000);
}
