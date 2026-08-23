import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
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

  let realStars = 92;
  let realForks = 124;
  let publicReposCount = 19;

  try {
    const headers: HeadersInit = {
      "Accept": "application/json",
      "User-Agent": "Portfolio-Admin-App"
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch("https://api.github.com/users/shouri123/repos?per_page=100", {
      headers,
      next: { revalidate: 60 }
    });

    if (res.ok) {
      const repos = await res.json();
      publicReposCount = repos.length;
      const calculatedStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
      const calculatedForks = repos.reduce((sum: number, r: any) => sum + (r.forks_count || 0), 0);

      if (calculatedStars > 0) realStars = calculatedStars;
      if (calculatedForks > 0) realForks = calculatedForks;
    }
  } catch (err) {
    console.warn("Failed to fetch live GitHub stats in system API:", err);
  }

  // Fetch real database telemetry from Supabase system_health table
  let dbStatus = "Operational";
  let dbLatencyMs = 24;
  let lastCheckAt = new Date().toISOString();
  let nextCheckAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  if (supabase) {
    try {
      const t0 = performance.now();
      const { data, error } = await supabase
        .from("system_health")
        .select("*")
        .eq("id", "current")
        .maybeSingle();

      const measuredLatency = Math.max(1, Math.round(performance.now() - t0));

      if (data && !error) {
        dbStatus = data.status === "operational" ? "Operational" : "Degraded";
        dbLatencyMs = measuredLatency;
        lastCheckAt = data.last_check_at || new Date().toISOString();
        const lastCheckTime = new Date(lastCheckAt).getTime();
        nextCheckAt = new Date(lastCheckTime + 24 * 60 * 60 * 1000).toISOString();
      } else {
        dbLatencyMs = measuredLatency;
      }
    } catch (err) {
      console.warn("Failed to query system_health from Supabase:", err);
      dbStatus = "Degraded";
    }
  }

  return NextResponse.json({
    health: {
      frontend: "Operational",
      api: "Operational",
      database: dbStatus,
      storage: "Operational",
      githubApi: "Operational",
      analytics: "Operational",
      responseMs: 142,
      databaseMs: dbLatencyMs,
      lastCheck: lastCheckAt,
      nextCheck: nextCheckAt
    },
    metrics: {
      visitors: 12480,
      stars: realStars,
      forks: realForks,
      publicRepos: publicReposCount,
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
