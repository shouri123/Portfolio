import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { getAIServices } from "@/lib/command-center-store";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return verifySession(session);
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    services: getAIServices(),
    metrics: {
      activeAgents: 3,
      totalPromptsServed: 1420,
      averageLatencyMs: 184,
      systemStatus: "Operational"
    }
  });
}
