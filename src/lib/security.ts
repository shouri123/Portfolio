import { NextRequest } from "next/server";

// In-memory cache for IP rate limiting
const ipCache = new Map<string, { count: number; resetTime: number }>();

/**
 * Checks if a given IP has exceeded the allowed number of requests in the window
 */
export function isRateLimited(
  ip: string,
  limit: number = 5,
  windowMs: number = 600000 // default 10 minutes
): boolean {
  const now = Date.now();
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
 * Helper to resolve the client IP from NextRequest
 */
export function getClientIp(request: Request): string {
  // If request is NextRequest, we can check headers
  const headers = request.headers;
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
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
