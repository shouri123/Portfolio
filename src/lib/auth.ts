import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD || "shouri-portfolio-fallback-secret-key-123456";

/**
 * Generates a signed session string: "session:expiry_timestamp.signature_hex"
 */
export function signSession(): string {
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const data = `session:${expires}`;
  const hmac = createHmac("sha256", SECRET).update(data).digest("hex");
  return `${data}.${hmac}`;
}

/**
 * Verifies the signed session cookie and returns true if valid and unexpired
 */
export function verifySession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  
  const parts = cookieValue.split(".");
  if (parts.length !== 2) return false;
  
  const [data, signature] = parts;
  
  // Verify structure
  const match = data.match(/^session:(\d+)$/);
  if (!match) return false;
  
  // Verify expiration
  const expires = parseInt(match[1], 10);
  if (Date.now() > expires) return false;
  
  // Verify signature using timing-safe comparison to prevent timing attacks
  const expectedHmac = createHmac("sha256", SECRET).update(data).digest("hex");
  
  try {
    return timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedHmac, "hex")
    );
  } catch {
    return false;
  }
}
