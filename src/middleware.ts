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

  // 🛠️ PUBLIC ROUTES: Allow unauthenticated access to quiz pages
  // These routes are accessible to everyone without login
  const publicQuizRoutes = ["/quizzes", "/quiz"];

  const isPublicQuizRoute = publicQuizRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // If it's a public quiz route, allow access without authentication
  if (isPublicQuizRoute) {
    return NextResponse.next();
  }

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

  // 🛠️ CUSTOMIZE: Admin-only routes
  // Check if user has admin role for admin panel access
  if (url.pathname.startsWith("/admin") && token) {
    // If user doesn't have admin role, redirect to unauthorized or home
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // Protect admin routes if no token
  if (url.pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

// 🎯 CUSTOMIZATION GUIDE: Middleware Matcher
// Configure which routes should be processed by this middleware
export const config: MiddlewareConfig = {
  matcher: [
    // 🛠️ CUSTOMIZE: Add routes you want to protect or process
    "/",
    "/dashboard/:path*",
    "/admin/:path*", // Protect all admin routes
    "/quizzes/:path*", // Process quiz listing (public)
    "/quiz/:path*", // Process individual quiz pages (public)
  ],
};
