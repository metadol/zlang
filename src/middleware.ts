import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/buttons"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (userId && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/learn", req.url));
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Run this middleware on all routes except:
    // - Next.js internal routes (_next)
    // - Static files (css, js, images, fonts, etc.)
    // This improves performance by avoiding unnecessary middleware execution.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run middleware for Clerk authentication-related routes
    '/__clerk/:path*',

    // Always run middleware for API and tRPC routes
    '/(api|trpc)(.*)',
  ],
};