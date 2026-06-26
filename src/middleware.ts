import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js middleware for route protection.
 * Checks for session cookies to protect authenticated routes.
 * Note: Does NOT import db.ts (incompatible with Edge runtime).
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Public routes (no auth required)
  const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/error", "/api/auth"];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // API health check is always public
  if (pathname === "/api/health") {
    return NextResponse.next();
  }

  // Public routes pass through
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, check for NextAuth session cookie
  const token = request.cookies.get("next-auth.session-token");
  const secureToken = request.cookies.get("__Secure-next-auth.session-token");

  if (!token && !secureToken) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!_next/static|_next/image|favicon.ico|auth/login|auth/register|auth/error|api/auth|api/health).*)",
  ],
};