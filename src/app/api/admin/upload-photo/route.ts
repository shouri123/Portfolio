import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { updateCareerProfile } from "@/lib/command-center-store";
import fs from "fs/promises";
import path from "path";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB Limit
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  return verifySession(session);
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const photoUrl = formData.get("photoUrl") as string | null;

    if (photoUrl) {
      const sanitizedUrl = photoUrl.trim();
      // Ensure photoUrl is a valid safe relative path or https URL
      if (!sanitizedUrl.startsWith("/") && !sanitizedUrl.startsWith("https://")) {
        return NextResponse.json({ error: "Invalid photo URL format. Must start with '/' or 'https://'" }, { status: 400 });
      }
      updateCareerProfile({ portraitUrl: sanitizedUrl });
      return NextResponse.json({ success: true, portraitUrl: sanitizedUrl });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 1. Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: "File size exceeds the 5MB limit" }, { status: 400 });
    }

    // 2. Validate MIME Type
    if (!ALLOWED_MIME_TYPES.has(file.type.toLowerCase())) {
      return NextResponse.json({ error: "Unsupported file type. Only JPEG, PNG, WebP, and AVIF images are allowed." }, { status: 400 });
    }

    // 3. Validate File Extension
    const rawExt = path.extname(file.name).toLowerCase();
    const ext = ALLOWED_EXTENSIONS.has(rawExt) ? rawExt : (file.type === "image/png" ? ".png" : file.type === "image/webp" ? ".webp" : ".jpg");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Safe Filename Construction
    const filename = `developer_portrait_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${ext}`;
    const targetPath = path.join(process.cwd(), "public", filename);

    await fs.writeFile(targetPath, buffer);
    const publicUrl = `/${filename}`;

    updateCareerProfile({ portraitUrl: publicUrl });

    return NextResponse.json({ success: true, portraitUrl: publicUrl });
  } catch (err) {
    console.error("Upload photo error:", err);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
