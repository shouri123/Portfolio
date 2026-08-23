import { NextRequest } from "next/server";

// In-memory cache for IP rate limiting
const ipCache = new Map<string, { count: number; resetTime: number }>();
const MAX_CACHE_SIZE = 10000;

/**
 * Periodically purges expired IP entries from memory
 */
function cleanupIpCache() {
  const now = Date.now();
  for (const [ip, record] of ipCache.entries()) {
    if (now > record.resetTime) {
      ipCache.delete(ip);
    }
  }
  // Hard limit memory growth if overflowed
  if (ipCache.size > MAX_CACHE_SIZE) {
    ipCache.clear();
  }
}

/**
 * Checks if a given IP has exceeded the allowed number of requests in the window
 */
export function isRateLimited(
  ip: string,
  limit: number = 5,
  windowMs: number = 600000 // default 10 minutes
): boolean {
  const now = Date.now();

  // Perform memory cleanup on every rate limit check
  if (Math.random() < 0.1) {
    cleanupIpCache();
  }

  const record = ipCache.get(ip);
  
  if (!record) {
    ipCache.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
    return false;
  }
  
  record.count++;
  return record.count > limit;
}

/**
 * Helper to resolve the client IP from Request or NextRequest, handling Cloudflare,
 * proxy headers (X-Real-IP), and multi-hop X-Forwarded-For safely.
 */
export function getClientIp(request: Request | NextRequest): string {
  const headers = request.headers;

  // 1. Cloudflare connecting IP
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  // 2. Standard X-Real-IP
  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  // 3. Multi-hop X-Forwarded-For (take the leftmost original client IP)
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const clientIp = xForwardedFor.split(",")[0].trim();
    if (clientIp) return clientIp;
  }

  return "127.0.0.1";
}

/**
 * Strips all HTML/XML tags from a string to prevent XSS injection
 */
export function stripHtml(text: string): string {
  if (typeof text !== "string") return "";
  return text.replace(/<[^>]*>/g, "").trim();
}

/**
 * Validates type, presence, and length constraints on an input string
 */
export function validateString(
  value: any,
  maxLength: number,
  fieldName: string,
  allowEmpty: boolean = false
): string {
  if (typeof value !== "string") {
    throw new Error(`${fieldName} must be a valid text string.`);
  }
  const trimmed = value.trim();
  if (!allowEmpty && trimmed.length === 0) {
    throw new Error(`${fieldName} cannot be empty.`);
  }
  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} cannot exceed ${maxLength} characters.`);
  }
  return trimmed;
}
