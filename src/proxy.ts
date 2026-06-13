import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (but NOT /admin/login or /api/admin/login)
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname.startsWith("/api/admin");

  if (isLoginApi || isLoginPage) {
    return NextResponse.next();
  }

  if (isAdminRoute) {
    const session = request.cookies.get("admin_session");
    const isAuthenticated = session?.value === "authenticated";

    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
