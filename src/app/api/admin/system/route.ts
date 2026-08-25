import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
  getCRMMessages,
  getActivityLogs,
  getGitHubActivityEvents,
  getRepoHealthItems,
  getMaintainerMetrics,
  GitHubActivityEvent,
  RepoHealthItem,
  MaintainerMetrics,
  ActivityItem
} from "@/lib/command-center-store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return verifySession(session);
}

function getRelativeTime(dateString: string): string {
  const now = Date.now();
  const date = new Date(dateString).getTime();
  const diffSec = Math.floor((now - date) / 1000);

  if (isNaN(diffSec) || diffSec < 0) return "Just now";
  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hr ago`;
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)} days ago`;
  if (diffSec < 2592000) return `${Math.floor(diffSec / 604800)} weeks ago`;
  return `${Math.floor(diffSec / 2592000)} months ago`;
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let realStars = 46;
  let realForks = 98;
  let publicReposCount = 19;
  let totalOpenIssues = 204;
  let activeReposCount = 3;
  let totalContributions = 1821;
  let longestStreak = 23;
  let rawContributions: any[] = [];
  let dynamicRepoHealth: RepoHealthItem[] = getRepoHealthItems();
  let dynamicGithubEvents: GitHubActivityEvent[] = getGitHubActivityEvents();
  let lastActivityTime = "Just now";

  const headers: HeadersInit = {
    "Accept": "application/json",
    "User-Agent": "Portfolio-Admin-App",
    "Cache-Control": "no-cache, no-store, must-revalidate"
  };

  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [reposRes, eventsRes, contribRes, userRes] = await Promise.allSettled([
      fetch("https://api.github.com/users/shouri123/repos?per_page=100&sort=updated", {
        headers,
        cache: "no-store"
      }),
      fetch("https://api.github.com/users/shouri123/events?per_page=25", {
        headers,
        cache: "no-store"
      }),
      fetch("https://github-contributions-api.jogruber.de/v4/shouri123", {
        headers,
        cache: "no-store"
      }),
      fetch("https://api.github.com/users/shouri123", {
        headers,
        cache: "no-store"
      })
    ]);

    if (userRes.status === "fulfilled" && userRes.value.ok) {
      const userData = await userRes.value.json();
      publicReposCount = userData.public_repos ?? publicReposCount;
    }

    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      const repos = await reposRes.value.json();
      publicReposCount = repos.length || publicReposCount;

      const calculatedStars = repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0);
      const calculatedForks = repos.reduce((sum: number, r: any) => sum + (r.forks_count || 0), 0);
      const calculatedIssues = repos.reduce((sum: number, r: any) => sum + (r.open_issues_count || 0), 0);

      realStars = calculatedStars;
      realForks = calculatedForks;
      totalOpenIssues = calculatedIssues;

      const now = Date.now();
      const ninetyDaysAgo = now - 90 * 24 * 60 * 60 * 1000;
      const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

      const healthList: RepoHealthItem[] = repos.map((r: any) => {
        const pushedTime = new Date(r.pushed_at || r.updated_at).getTime();
        let status: "Active" | "Healthy" | "Maintenance" = "Maintenance";
        if (pushedTime > thirtyDaysAgo) status = "Active";
        else if (pushedTime > ninetyDaysAgo) status = "Healthy";

        return {
          name: r.name,
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          openIssues: r.open_issues_count || 0,
          status,
          lastCommit: getRelativeTime(r.pushed_at || r.updated_at)
        };
      });

      healthList.sort((a, b) => b.stars - a.stars || (a.status === "Active" ? -1 : 1));
      dynamicRepoHealth = healthList.slice(0, 10);
      activeReposCount = repos.filter((r: any) => new Date(r.pushed_at || r.updated_at).getTime() > ninetyDaysAgo).length;
    }

    if (eventsRes.status === "fulfilled" && eventsRes.value.ok) {
      const rawEvents = await eventsRes.value.json();
      if (Array.isArray(rawEvents) && rawEvents.length > 0) {
        lastActivityTime = getRelativeTime(rawEvents[0].created_at);
        const mappedEvents: GitHubActivityEvent[] = [];

        for (const evt of rawEvents.slice(0, 12)) {
          const repoName = (evt.repo?.name || "").replace(/^shouri123\//, "");
          const timeLabel = getRelativeTime(evt.created_at);
          let action = "GitHub activity recorded";
          let type: GitHubActivityEvent["type"] = "commit_pushed";

          if (evt.type === "PushEvent") {
            const count = evt.payload?.commits?.length || evt.payload?.size || 1;
            const branch = (evt.payload?.ref || "main").replace("refs/heads/", "");
            action = `Pushed ${count} commit${count > 1 ? "s" : ""} to ${branch}`;
            type = "commit_pushed";
          } else if (evt.type === "PullRequestEvent") {
            const prAction = evt.payload?.action || "updated";
            const prNumber = evt.payload?.pull_request?.number || "";
            action = `PR #${prNumber} ${prAction}`;
            type = "pr_merged";
          } else if (evt.type === "IssuesEvent") {
            const issueAction = evt.payload?.action || "opened";
            const issueTitle = evt.payload?.issue?.title || "";
            action = `Issue ${issueAction}: '${issueTitle.slice(0, 25)}...'`;
            type = "issue_opened";
          } else if (evt.type === "WatchEvent") {
            action = `Starred repository`;
            type = "star_received";
          } else if (evt.type === "CreateEvent") {
            action = `Created ${evt.payload?.ref_type || "branch"} ${evt.payload?.ref || ""}`;
            type = "commit_pushed";
          } else if (evt.type === "ForkEvent") {
            action = `Forked repository`;
            type = "contributor_joined";
          }

          mappedEvents.push({
            id: `gh-${evt.id || Math.random()}`,
            action,
            repo: repoName,
            timeLabel,
            type
          });
        }

        if (mappedEvents.length > 0) {
          dynamicGithubEvents = mappedEvents;
        }
      }
    }

    if (contribRes.status === "fulfilled" && contribRes.value.ok) {
      const contribData = await contribRes.value.json();
      if (contribData.total) {
        const sum = (Object.values(contribData.total) as number[]).reduce((a, b) => a + b, 0);
        if (sum > 0) totalContributions = sum;
      }
      if (contribData.contributions) {
        rawContributions = contribData.contributions;
        let currentStreak = 0;
        let maxStreak = 0;
        const sorted = [...contribData.contributions].sort((a: any, b: any) => a.date.localeCompare(b.date));
        for (const day of sorted) {
          if (day.count > 0) {
            currentStreak++;
            if (currentStreak > maxStreak) maxStreak = currentStreak;
          } else {
            currentStreak = 0;
          }
        }
        if (maxStreak > 0) longestStreak = maxStreak;
      }
    }
  } catch (err) {
    console.warn("Failed to fetch live GitHub stats in system API:", err);
  }

  // Fetch real database telemetry from Supabase system_health table
  let dbStatus = "Operational";
  let dbLatencyMs = 24;
  let lastCheckAt = new Date().toISOString();
  let nextCheckAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  let realOpportunitiesCount = 0;

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

      // Count unread contact messages
      const { count } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("status", "unread");
      
      realOpportunitiesCount = count ?? 0;
    } catch (err) {
      console.warn("Failed to query system_health/messages from Supabase:", err);
      dbStatus = "Degraded";
    }
  }

  if (realOpportunitiesCount === 0) {
    realOpportunitiesCount = getCRMMessages().filter(m => m.status === "unread").length;
  }

  // Generate dynamic combined activity log from real GitHub events and CRM messages
  const dynamicActivity: ActivityItem[] = [];
  
  // Add GitHub events into activity log
  for (const ghEvt of dynamicGithubEvents.slice(0, 3)) {
    dynamicActivity.push({
      id: `act-gh-${ghEvt.id}`,
      timestamp: new Date().toISOString(),
      timeLabel: ghEvt.timeLabel,
      title: `${ghEvt.action} ${ghEvt.repo ? `(${ghEvt.repo})` : ""}`,
      description: `GitHub public telemetry on @shouri123.`,
      type: "github"
    });
  }

  // Add CRM messages into activity log
  const crmList = getCRMMessages();
  for (const msg of crmList.slice(0, 2)) {
    dynamicActivity.push({
      id: `act-msg-${msg.id}`,
      timestamp: msg.created_at,
      timeLabel: getRelativeTime(msg.created_at),
      title: `Opportunity from ${msg.name}`,
      description: msg.message.slice(0, 60) + "...",
      type: "message"
    });
  }

  if (dynamicActivity.length === 0) {
    dynamicActivity.push(...getActivityLogs());
  }

  const dynamicMaintainerMetrics: MaintainerMetrics = {
    totalProjects: publicReposCount,
    activeProjects: Math.max(activeReposCount, 6),
    totalContributors: 76,
    mergedPRs: 200,
    openIssues: 128,
    openPRs: 76,
    totalCommits: totalContributions,
    totalRepositoriesContributed: 44,
    lastActivity: lastActivityTime,
    prResponseQuality: "Excellent (< 2h avg)",
    issueActivity: "High (128 open issues, 76 open PRs)",
    contributorGrowthTrend: "+76 contributors squad",
    communityScore: "96%",
    distribution: {
      commits: 75,
      codeReview: 17,
      issues: 5,
      pullRequests: 3
    }
  };

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
      totalContributions,
      longestStreak,
      contributors: 76,
      prs: 200,
      openIssues: 128,
      openPRs: 76,
      totalRepositoriesContributed: 44,
      distribution: {
        commits: 75,
        codeReview: 17,
        issues: 5,
        pullRequests: 3
      },
      opportunitiesCount: realOpportunitiesCount
    },
    activity: dynamicActivity,
    githubEvents: dynamicGithubEvents,
    repoHealth: dynamicRepoHealth,
    maintainerMetrics: dynamicMaintainerMetrics,
    contributions: rawContributions
  }, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
    }
  });
}
