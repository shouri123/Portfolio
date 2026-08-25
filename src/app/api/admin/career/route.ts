import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { getCareerProfile, updateCareerProfile, CareerProfile } from "@/lib/command-center-store";
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
  return NextResponse.json(getCareerProfile());
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const sanitized: Partial<CareerProfile> = {};

    if (body.headline !== undefined) sanitized.headline = stripHtml(validateString(body.headline, 200, "Headline"));
    if (body.subheadline !== undefined) sanitized.subheadline = stripHtml(validateString(body.subheadline, 500, "Subheadline", true));
    if (body.availability !== undefined) sanitized.availability = stripHtml(validateString(body.availability, 100, "Availability", true));
    if (body.isAvailable !== undefined) sanitized.isAvailable = Boolean(body.isAvailable);
    if (body.location !== undefined) sanitized.location = stripHtml(validateString(body.location, 100, "Location", true));
    if (body.bio !== undefined) sanitized.bio = stripHtml(validateString(body.bio, 2000, "Bio", true));

    if (body.portraitUrl !== undefined) {
      const url = String(body.portraitUrl).trim();
      if (url.startsWith("/") || url.startsWith("https://")) {
        sanitized.portraitUrl = url.slice(0, 500);
      }
    }

    if (body.resumeUrl !== undefined) {
      const url = String(body.resumeUrl).trim();
      if (url.startsWith("/") || url.startsWith("https://")) {
        sanitized.resumeUrl = url.slice(0, 500);
      }
    }

    if (Array.isArray(body.preferredRoles)) {
      sanitized.preferredRoles = body.preferredRoles.map((s: any) => stripHtml(String(s)).slice(0, 50)).filter(Boolean);
    }

    const updated = updateCareerProfile(sanitized);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Invalid request payload" }, { status: 400 });
  }
}
