import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { getArticles, saveArticle, ContentArticle } from "@/lib/command-center-store";
import { stripHtml, validateString } from "@/lib/security";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return verifySession(session);
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getArticles());
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = validateString(body.title, 150, "Title");
    const summary = validateString(body.summary || "", 500, "Summary", true);
    const readTime = validateString(body.readTime || "5 min read", 30, "Read Time", true);
    const publishedAt = validateString(body.publishedAt || new Date().toISOString().split("T")[0], 30, "Published Date", true);
    const category = body.category && ["Article", "Case Study", "Note", "Announcement"].includes(body.category)
      ? body.category
      : "Article";
    const status: ContentArticle["status"] = body.status && ["Published", "Draft", "Archived"].includes(body.status)
      ? body.status
      : "Published";

    const saved = saveArticle({
      title: stripHtml(title),
      summary: stripHtml(summary),
      readTime: stripHtml(readTime),
      publishedAt: stripHtml(publishedAt),
      category,
      status,
      content: typeof body.content === "string" ? body.content.slice(0, 10000) : ""
    });
    
    return NextResponse.json(saved, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invalid body payload" }, { status: 400 });
  }
}
