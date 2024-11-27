import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /admin to /admin/dashboard
  if (pathname === "/admin") {
    return NextResponse.rewrite(new URL("/admin/dashboard", request.url));
  }

  // Redirect /vendor to /vendor/dashboard
  if (pathname === "/vendor") {
    return NextResponse.rewrite(new URL("/vendor/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/vendor"],
};
