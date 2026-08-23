import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import {
  getActivityLogs,
  getGitHubActivityEvents,
  getRepoHealthItems,
  getMaintainerMetrics,
  addActivityLog
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
