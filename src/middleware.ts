import { getToken } from "next-auth/jwt";
import { NextMiddleware, NextResponse } from "next/server";

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

  // Public quiz routes
  const publicQuizRoutes = ["/quizzes", "/quiz"];
  const isPublicQuizRoute = publicQuizRoutes.some((route) =>
    url.pathname.startsWith(route)
  );

  // If user is authenticated admin on public routes, redirect to admin panel
  if (isPublicQuizRoute && token && token.role === "admin") {
    return NextResponse.redirect(
      new URL(env.BASE_AUTHENTICATED_URL, request.url)
    );
  }

  // Allow public access for non-admin or unauthenticated users
  if (isPublicQuizRoute) {
    return NextResponse.next();
  }

  // Rest of the middleware remains the same...
  if (url.pathname === "/" && token) {
    if (token.role === "admin") {
      return NextResponse.redirect(
        new URL(env.BASE_AUTHENTICATED_URL, request.url)
      );
    }
    return NextResponse.next();
  }

  if (url.pathname.startsWith(env.BASE_AUTHENTICATED_URL) && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (url.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
};
