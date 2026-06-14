import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/json',
      'User-Agent': 'Portfolio-App'
    };
    
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }

    // 1. Fetch user profile for public repo count
    let publicRepos = 12; // Fallback value
    try {
      const userRes = await fetch("https://api.github.com/users/shouri123", { 
        headers,
        next: { revalidate: 3600 }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        publicRepos = userData.public_repos ?? publicRepos;
      }
    } catch (e) {
      console.warn("Failed to fetch GitHub user profile in API route:", e);
    }

    // 2. Fetch contribution data
    let totalContributions = 1462; // Fallback value
    let longestStreak = 23; // Fallback value
    try {
      const contribRes = await fetch("https://github-contributions-api.jogruber.de/v4/shouri123", {
        headers,
        next: { revalidate: 3600 }
      });
      if (contribRes.ok) {
        const data = await contribRes.json();
        
        // Sum total contributions across all years
        if (data.total) {
          const sum = (Object.values(data.total) as number[]).reduce((a: number, b: number) => a + b, 0);
          totalContributions = typeof sum === 'number' && sum > 0 ? sum : totalContributions;
        }
        
        // Compute streaks from contributions history
        if (data.contributions) {
          let currentStreak = 0;
          let calculatedLongestStreak = 0;
          
          const sorted = [...data.contributions].sort((a: { date: string; count: number }, b: { date: string; count: number }) => a.date.localeCompare(b.date));
          for (const day of sorted) {
            if (day.count > 0) {
              currentStreak++;
              if (currentStreak > calculatedLongestStreak) {
                calculatedLongestStreak = currentStreak;
              }
            } else {
              currentStreak = 0;
            }
          }
          longestStreak = calculatedLongestStreak > 0 ? calculatedLongestStreak : longestStreak;
        }
      }
    } catch (e) {
      console.warn("Failed to fetch contribution history in API route:", e);
    }

    return NextResponse.json({
      totalContributions,
      longestStreak,
      publicRepos
    });
  } catch (err) {
    console.error("Error in github-stats route:", err);
    return NextResponse.json({
      totalContributions: 1462,
      longestStreak: 23,
      publicRepos: 12
    });
  }
}
