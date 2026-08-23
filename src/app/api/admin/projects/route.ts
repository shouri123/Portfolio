import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { fetchProjects, DEFAULT_PROJECTS, Project } from "@/lib/supabase";

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
    const newProject: Project = {
      id: Date.now(),
      title: body.title || "Untitled Project",
      description: body.description || "",
      problem: body.problem || "",
      solution: body.solution || "",
      impact: body.impact || "",
      live_url: body.live_url || "",
      source_code_url: body.source_code_url || "",
      tech_stack: Array.isArray(body.tech_stack) ? body.tech_stack : (body.tech_stack || "").split(",").map((s: string) => s.trim()),
      theme_color: body.theme_color || "#1e1e1e",
      is_active: body.is_active !== undefined ? body.is_active : true,
      stars: 0,
      forks: 0,
      issues: 0
    };

    inMemoryProjects.unshift(newProject);
    return NextResponse.json(newProject, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
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
      inMemoryProjects[index] = { ...inMemoryProjects[index], ...body };
      return NextResponse.json(inMemoryProjects[index]);
    }

    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
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
