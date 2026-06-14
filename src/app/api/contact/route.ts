import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { isRateLimited, getClientIp, stripHtml, validateString } from "@/lib/security";

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = getClientIp(request);
    if (isRateLimited(ip, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Too many message submissions. Please try again in 10 minutes." },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Request Payload
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const { name: rawName, email: rawEmail, message: rawMessage } = body;

    let name = "";
    let email = "";
    let message = "";

    try {
      name = validateString(rawName, 100, "Name");
      email = validateString(rawEmail, 100, "Email");
      message = validateString(rawMessage, 2000, "Message");
    } catch (valErr: any) {
      return NextResponse.json({ error: valErr.message }, { status: 400 });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 3. Sanitization
    const sanitizedName = stripHtml(name);
    const sanitizedMessage = stripHtml(message);

    // Double check that we didn't end up with completely empty values after stripping HTML
    if (!sanitizedName) {
      return NextResponse.json({ error: "Name cannot be empty after sanitization." }, { status: 400 });
    }
    if (!sanitizedMessage) {
      return NextResponse.json({ error: "Message cannot be empty after sanitization." }, { status: 400 });
    }

    if (supabase) {
      const { error } = await supabase
        .from("contact_messages")
        .insert([{ name: sanitizedName, email, message: sanitizedMessage, status: "unread" }]);

      if (error) {
        console.error("Supabase error during message insertion:", error);
        return NextResponse.json(
          { error: "Could not submit your message. Database error." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    } else {
      // Mock mode fallback for local development
      console.log("[Mock Contact API] Received submission:", { name: sanitizedName, email, message: sanitizedMessage });
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate DB network delay

      return NextResponse.json({
        success: true,
        mock: true,
        data: {
          id: "mock-uuid-1234",
          created_at: new Date().toISOString(),
          name: sanitizedName,
          email,
          message: sanitizedMessage,
          status: "unread"
        }
      });
    }
  } catch (error) {
    console.error("Contact API route crash:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
