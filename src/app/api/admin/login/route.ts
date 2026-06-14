import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timingSafeEqual, createHash } from "crypto";
import { signSession } from "@/lib/auth";
import { isRateLimited, getClientIp, validateString } from "@/lib/security";

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting check
    const ip = getClientIp(request);
    if (isRateLimited(ip, 5, 10 * 60 * 1000)) { // Max 5 attempts per 10 minutes
      return NextResponse.json(
        { error: "TOO MANY LOGIN ATTEMPTS. CONSOLE LOCKED FOR 10 MINUTES." },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Request Payload
    let passwordInput: any;
    try {
      const body = await request.json();
      passwordInput = body.password;
    } catch {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    let password = "";
    try {
      password = validateString(passwordInput, 100, "Password");
    } catch (valErr: any) {
      return NextResponse.json({ error: valErr.message }, { status: 400 });
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      console.error("ADMIN_PASSWORD env var is not set");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    // Constant-time password comparison to prevent timing attacks
    const pwdHash = createHash("sha256").update(password).digest();
    const adminHash = createHash("sha256").update(adminPassword).digest();
    const isMatch = timingSafeEqual(pwdHash, adminHash);

    if (!isMatch) {
      // Artificial delay to slow brute-force attempts
      await new Promise((r) => setTimeout(r, 800));
      return NextResponse.json(
        { error: "ACCESS DENIED: INVALID DECRYPTION PASSWORD KEY." },
        { status: 401 }
      );
    }

    // Issue a secure HTTP-only signed session cookie — never exposed to JS
    const cookieStore = await cookies();
    cookieStore.set("admin_session", signSession(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Login API route crash:", err);
    return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
  }
}

