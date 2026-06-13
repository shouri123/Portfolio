import HomeClient from "@/components/HomeClient";
import { fetchProjects } from "@/lib/supabase";

export default async function Home() {
  // CR fix: wrap in try/catch — Supabase failures return [] fallback instead of crashing
  let projects: Awaited<ReturnType<typeof fetchProjects>> = [];
  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
  }

  return <HomeClient initialProjects={projects} />;
}
