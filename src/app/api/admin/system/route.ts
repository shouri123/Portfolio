import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import {
  getActivityLogs,
  getGitHubActivityEvents,
  getRepoHealthItems,
  getMaintainerMetrics
} from "@/lib/command-center-store";

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
    health: {
      frontend: "Operational",
      api: "Operational",
      database: "Operational",
      storage: "Operational",
      githubApi: "Operational",
      analytics: "Operational",
      responseMs: 142,
      databaseMs: 23
    },
    metrics: {
      visitors: 12480,
      stars: 92,
      forks: 124,
      contributors: 50,
      prs: 200,
      opportunitiesCount: 4
    },
    activity: getActivityLogs(),
    githubEvents: getGitHubActivityEvents(),
    repoHealth: getRepoHealthItems(),
    maintainerMetrics: getMaintainerMetrics()
  });
}
