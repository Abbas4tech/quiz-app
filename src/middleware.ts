import { getToken } from "next-auth/jwt";
import { MiddlewareConfig, NextMiddleware, NextResponse } from "next/server";

import { env } from "@/lib/env";

/**
 * This middleware handles route protection and redirects
 * Customize based on your application's routing structure
 */
export const middleware: NextMiddleware = async (request) => {
  const token = await getToken({
    req: request,
    secret: env.NEXT_AUTH_SECRET,
  });

  const url = request.nextUrl;

  // 🛠️ CUSTOMIZE: Public routes that should redirect authenticated users
  // Example: If user is logged in and tries to access auth pages, redirect to dashboard
  if (url.pathname === "/" && token) {
    return NextResponse.redirect(
      new URL(env.BASE_AUTHENTICATED_URL, request.url)
    );
  }

  // 🛠️ CUSTOMIZE: Protected routes that require authentication
  // Add more paths to protect specific sections of your app
  if (url.pathname.startsWith(env.BASE_AUTHENTICATED_URL) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🛠️ CUSTOMIZE: Add more route protection logic here
  // Example: Admin-only routes
  /*
  if (url.pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  */

  return NextResponse.next();
};

// 🎯 CUSTOMIZATION GUIDE: Middleware Matcher
// Configure which routes should be processed by this middleware
export const config: MiddlewareConfig = {
  matcher: [
    // 🛠️ CUSTOMIZE: Add routes you want to protect or process
    "/",
    "/dashboard/:path*",
  ],
};
