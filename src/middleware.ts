import { getToken } from "next-auth/jwt";
import { MiddlewareConfig, NextMiddleware, NextResponse } from "next/server";

import { env } from "@/lib/env";

/**
 * This middleware handles route protection and redirects
 * Logged-in users are automatically redirected to their dashboard from any route
 */
export const middleware: NextMiddleware = async (request) => {
  const token = await getToken({
    req: request,
    secret: env.NEXT_AUTH_SECRET,
  });

  const url = request.nextUrl;

  // 🛠️ PUBLIC ROUTES: Allow unauthenticated access to quiz pages
  const publicQuizRoutes = ["/quizzes", "/quiz"];
  const isPublicQuizRoute = publicQuizRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // 🔄 REDIRECT LOGGED-IN USERS TO DASHBOARD (from any route)
  if (token) {
    // Allow access to dashboard routes
    if (url.pathname.startsWith("/dashboard")) {
      return NextResponse.next();
    }

    // Redirect from any other route to appropriate dashboard
    if (token.role === "admin") {
      return NextResponse.redirect(
        new URL(env.BASE_AUTHENTICATED_URL, request.url)
      );
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 🔒 UNAUTHENTICATED USERS
  // Allow public routes
  if (isPublicQuizRoute || url.pathname === "/") {
    return NextResponse.next();
  }

  // Block protected routes for unauthenticated users
  if (url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

// 🎯 Middleware Matcher
export const config: MiddlewareConfig = {
  matcher: ["/", "/dashboard/:path*", "/quizzes/:path*", "/quiz/:path*"],
};
