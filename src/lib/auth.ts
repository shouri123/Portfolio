import { createHmac, timingSafeEqual } from "crypto";

/**
 * Resolves the HMAC signing secret from process.env.
 * FAILS CLOSED: Never falls back to a hard-coded repository string.
 */
function getSigningSecret(): string {
  const secret = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) {
    console.error(
      "[SECURITY FATAL] Neither JWT_SECRET nor ADMIN_PASSWORD is set in environment variables. Refusing to sign or verify sessions."
    );
    throw new Error("Authentication signing secret is missing from server environment.");
  }
  return secret;
}

/**
 * Generates a signed session string: "session:expiry_timestamp.signature_hex"
 */
export function signSession(): string {
  const secret = getSigningSecret();
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const data = `session:${expires}`;
  const hmac = createHmac("sha256", secret).update(data).digest("hex");
  return `${data}.${hmac}`;
}

/**
 * Verifies the signed session cookie and returns true if valid and unexpired
 */
export function verifySession(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  
  let secret: string;
  try {
    secret = getSigningSecret();
  } catch {
    // Fail closed if server secret is missing
    return false;
  }
  
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
  const expectedHmac = createHmac("sha256", secret).update(data).digest("hex");
  
  try {
    return timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedHmac, "hex")
    );
  } catch {
    return false;
  }
}
