import { internationalizationMiddleware } from '@foodify/internationalization/middleware';
import { type NextRequest, type NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

export const config = {
  // matcher tells Next.js which routes to run the middleware on.
  // This runs the middleware on all routes except for static assets and Posthog ingest
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};

const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/forgot-password"];
const DEFAULT_AUTH_REDIRECT = "/dashboard"; // where to send logged-in users
const DEFAULT_PUBLIC_REDIRECT = "/"; // where to send logged-out users

export default function middleware(request: NextRequest, _event: NextFetchEvent) {
  const i18nResponse = internationalizationMiddleware(request);
  if (i18nResponse) {
    return i18nResponse;
  }

  const token = request.cookies.get('_foodify_auth')?.value;
  const { pathname } = request.nextUrl;

  // Case 1: User IS authenticated
  if (token) {
    // Prevent access to login/register pages
    if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL(DEFAULT_AUTH_REDIRECT, request.url));
    } else {
      return NextResponse.redirect(new URL(DEFAULT_PUBLIC_REDIRECT, request.url));
    }
  }

  // Case 2: User NOT authenticated
  // Allow public routes (sign-in, sign-up, forgot password)
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Otherwise block and send to login
  return NextResponse.redirect(new URL("/sign-in", request.url));
}
