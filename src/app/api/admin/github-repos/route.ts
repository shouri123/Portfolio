import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { fetchProjects } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return verifySession(session);
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const headers: HeadersInit = {
      "Accept": "application/json",
      "User-Agent": "Portfolio-Admin-App",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch all public repos for user shouri123
    const res = await fetch("https://api.github.com/users/shouri123/repos?per_page=100&sort=updated", {
      headers,
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}`);
    }

    const reposData = await res.json();

    // Fetch currently imported projects to check which repos are already added
    const existingProjects = await fetchProjects();
    const importedUrls = new Set(
      existingProjects
        .map(p => p.source_code_url?.toLowerCase().trim())
        .filter(Boolean)
    );

    const formattedRepos = reposData.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description || "Open-source GitHub repository by Shouri Chakraborty.",
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      open_issues: repo.open_issues_count || 0,
      language: repo.language || "TypeScript",
      topics: repo.topics || [],
      html_url: repo.html_url,
      homepage: repo.homepage || repo.html_url,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      is_imported: importedUrls.has(repo.html_url?.toLowerCase().trim())
    }));

    // Calculate aggregated stats
    const totalStars = formattedRepos.reduce((sum: number, r: any) => sum + r.stars, 0);
    const totalForks = formattedRepos.reduce((sum: number, r: any) => sum + r.forks, 0);

    return NextResponse.json({
      repos: formattedRepos,
      totalRepos: formattedRepos.length,
      totalStars,
      totalForks
    });
  } catch (err: any) {
    console.error("Error fetching GitHub repositories:", err);
    return NextResponse.json({ error: err.message || "Failed to fetch GitHub repos" }, { status: 500 });
  }
}
