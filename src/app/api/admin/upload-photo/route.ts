import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import { updateCareerProfile } from "@/lib/command-center-store";
import fs from "fs/promises";
import path from "path";

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
      updateCareerProfile({ portraitUrl: photoUrl });
      return NextResponse.json({ success: true, portraitUrl: photoUrl });
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".jpg";
    const filename = `developer_portrait_custom_${Date.now()}${ext}`;
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
