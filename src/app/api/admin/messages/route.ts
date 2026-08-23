import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { verifySession } from "@/lib/auth";
import { stripHtml, validateString } from "@/lib/security";
import { getCRMMessages, updateCRMMessage, deleteCRMMessage } from "@/lib/command-center-store";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return verifySession(session);
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(getCRMMessages());
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return NextResponse.json(getCRMMessages());
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(getCRMMessages());
  }
}

export async function PATCH(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status, admin_notes, category } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = validateString(status, 50, "Status");
    if (category !== undefined) updateData.category = category;
    if (admin_notes !== undefined) {
      const validatedNotes = validateString(admin_notes, 2000, "Admin Notes", true);
      updateData.admin_notes = stripHtml(validatedNotes);
    }

    if (supabaseAdmin) {
      try {
        const { data } = await supabaseAdmin
          .from("contact_messages")
          .update(updateData)
          .eq("id", id)
          .select();
        if (data?.[0]) return NextResponse.json(data[0]);
      } catch {
        // Fallback to store
      }
    }

    const updated = updateCRMMessage(String(id), updateData);
    return NextResponse.json(updated || { success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 });
    }

    if (supabaseAdmin) {
      try {
        await supabaseAdmin.from("contact_messages").delete().eq("id", id);
      } catch {
        // Fallback
      }
    }

    deleteCRMMessage(String(id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }
}
