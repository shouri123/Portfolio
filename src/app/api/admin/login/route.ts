import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timingSafeEqual, createHash } from "crypto";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
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

    // Issue a secure HTTP-only session cookie — never exposed to JS
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

