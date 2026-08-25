import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { fetchProjects, DEFAULT_PROJECTS, Project } from "@/lib/supabase";
import { stripHtml, validateString } from "@/lib/security";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return verifySession(session);
}

let inMemoryProjects: Project[] = [...DEFAULT_PROJECTS];

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await fetchProjects();
  return NextResponse.json(projects.length ? projects : inMemoryProjects);
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = validateString(body.title || "Untitled Project", 120, "Title");
    const description = validateString(body.description || "", 1000, "Description", true);
    const problem = validateString(body.problem || "", 1500, "Problem", true);
    const solution = validateString(body.solution || "", 1500, "Solution", true);
    const impact = validateString(body.impact || "", 1000, "Impact", true);
    const live_url = validateString(body.live_url || "", 500, "Live URL", true);
    const source_code_url = validateString(body.source_code_url || "", 500, "Source URL", true);
    
    let rawTechStack: string[] = [];
    if (Array.isArray(body.tech_stack)) {
      rawTechStack = body.tech_stack.map((t: any) => stripHtml(String(t)).slice(0, 50));
    } else if (typeof body.tech_stack === "string") {
      rawTechStack = body.tech_stack.split(",").map((s: string) => stripHtml(s.trim()).slice(0, 50));
    }

    const newProject: Project = {
      id: Date.now(),
      title: stripHtml(title),
      description: stripHtml(description),
      problem: stripHtml(problem),
      solution: stripHtml(solution),
      impact: stripHtml(impact),
      live_url: live_url.trim(),
      source_code_url: source_code_url.trim(),
      tech_stack: rawTechStack.filter(Boolean),
      theme_color: typeof body.theme_color === "string" ? body.theme_color.slice(0, 30) : "#1e1e1e",
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
      stars: 0,
      forks: 0,
      issues: 0
    };

    inMemoryProjects.unshift(newProject);
    return NextResponse.json(newProject, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invalid payload" }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    const index = inMemoryProjects.findIndex(p => p.id === body.id);
    if (index !== -1) {
      const sanitizedUpdates: Partial<Project> = {};
      if (body.title !== undefined) sanitizedUpdates.title = stripHtml(validateString(body.title, 120, "Title"));
      if (body.description !== undefined) sanitizedUpdates.description = stripHtml(validateString(body.description, 1000, "Description", true));
      if (body.problem !== undefined) sanitizedUpdates.problem = stripHtml(validateString(body.problem, 1500, "Problem", true));
      if (body.solution !== undefined) sanitizedUpdates.solution = stripHtml(validateString(body.solution, 1500, "Solution", true));
      if (body.impact !== undefined) sanitizedUpdates.impact = stripHtml(validateString(body.impact, 1000, "Impact", true));
      if (body.live_url !== undefined) sanitizedUpdates.live_url = String(body.live_url).trim().slice(0, 500);
      if (body.source_code_url !== undefined) sanitizedUpdates.source_code_url = String(body.source_code_url).trim().slice(0, 500);
      if (body.theme_color !== undefined) sanitizedUpdates.theme_color = String(body.theme_color).slice(0, 30);
      if (body.is_active !== undefined) sanitizedUpdates.is_active = Boolean(body.is_active);

      if (Array.isArray(body.tech_stack)) {
        sanitizedUpdates.tech_stack = body.tech_stack.map((t: any) => stripHtml(String(t)).slice(0, 50)).filter(Boolean);
      }

      inMemoryProjects[index] = { ...inMemoryProjects[index], ...sanitizedUpdates };
      return NextResponse.json(inMemoryProjects[index]);
    }

    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invalid payload" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  inMemoryProjects = inMemoryProjects.filter(p => String(p.id) !== String(id));
  return NextResponse.json({ success: true });
}
