import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { addActivityLog } from "@/lib/command-center-store";

export const dynamic = "force-dynamic";

async function isCronAuthorized(request: Request): Promise<boolean> {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // 1. Bearer token check for Vercel Cron / GitHub Actions
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    return true;
  }

  // 2. Admin session verification for Command Center manual triggers
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;
    if (session && verifySession(session)) {
      return true;
    }
  } catch {}

  // 3. Local development fallback only if not in production and no cron secret configured
  if (process.env.NODE_ENV !== "production" && !cronSecret) {
    return true;
  }

  return false;
}

export async function GET(request: Request) {
  try {
    // 1. Fail-closed Authorization check
    if (!(await isCronAuthorized(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();

    // 2. Handle mock mode if Supabase credentials are not configured
    if (!supabase) {
      addActivityLog({
        title: "System Health Verified (Local Mock)",
        description: "Scheduled health check ran in local environment.",
        type: "system"
      });

      return NextResponse.json({
        success: true,
        status: "operational",
        mode: "mock",
        latency_ms: 18,
        projects_count: 10,
        unread_messages_count: 0,
        last_check_at: now.toISOString(),
        next_check_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
      });
    }

    // 3. Real Supabase Database Check & Latency Measurement
    const startTime = performance.now();

    const [projectsRes, messagesRes] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("status", "unread")
    ]);

    const latencyMs = Math.max(1, Math.round(performance.now() - startTime));
    const projectsCount = projectsRes.count ?? 0;
    const unreadMessagesCount = messagesRes.count ?? 0;

    // 4. Upsert telemetry record into Supabase system_health table
    const { error: upsertError } = await supabase
      .from("system_health")
      .upsert({
        id: "current",
        last_check_at: now.toISOString(),
        status: "operational",
        latency_ms: latencyMs,
        projects_count: projectsCount,
        unread_messages_count: unreadMessagesCount,
        metadata: {
          runtime: "Next.js App Router",
          environment: process.env.NODE_ENV || "production",
          checked_by: "scheduled_cron_maintenance"
        }
      });

    if (upsertError) {
      console.warn("[Health Check] Telemetry upsert warning:", upsertError.message);
    }

    // 5. Add event to Command Center activity stream
    addActivityLog({
      title: "Automated Maintenance Run",
      description: `DB verified (Latency: ${latencyMs}ms, ${projectsCount} projects, ${unreadMessagesCount} unread msgs).`,
      type: "system"
    });

    return NextResponse.json({
      success: true,
      status: "operational",
      mode: "live",
      latency_ms: latencyMs,
      projects_count: projectsCount,
      unread_messages_count: unreadMessagesCount,
      last_check_at: now.toISOString(),
      next_check_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
    });
  } catch (error: any) {
    console.error("[Health Check Cron Route Exception]:", error);
    return NextResponse.json(
      {
        success: false,
        status: "degraded",
        error: error.message || "Unknown health check error",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
