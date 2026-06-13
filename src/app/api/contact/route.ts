import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (supabase) {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([{ name, email, message, status: "unread" }])
        .select();

      if (error) {
        console.error("Supabase error during message insertion:", error);
        return NextResponse.json(
          { error: "Could not submit your message. Database error." },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data });
    } else {
      // Mock mode fallback for local development
      console.log("[Mock Contact API] Received submission:", { name, email, message });
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate DB network delay

      return NextResponse.json({
        success: true,
        mock: true,
        data: {
          id: "mock-uuid-1234",
          created_at: new Date().toISOString(),
          name,
          email,
          message,
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
