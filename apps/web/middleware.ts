import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Serve the admin SPA from /admin: static files under public/admin, client routes → index.html.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/assets/")) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/admin/") &&
    /\.[a-z0-9]+$/i.test(pathname) &&
    !pathname.endsWith("/")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/index.html";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
