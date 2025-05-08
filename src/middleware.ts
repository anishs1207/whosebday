import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// Allow public access to these routes (including the home page)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();

  // Protect non-public routes
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // If the user is logged in and tries to visit sign-in or sign-up, redirect them to /dashboard
  const isAuthPage = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);
  if (userId && isAuthPage(req)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Avoid matching static files or Next.js internals
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always match API and TRPC routes
    '/(api|trpc)(.*)',
  ],
};
