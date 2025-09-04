import { internationalizationMiddleware } from '@foodify/internationalization/middleware';
import { type NextRequest, type NextFetchEvent } from 'next/server';

export const config = {
  // matcher tells Next.js which routes to run the middleware on.
  // This runs the middleware on all routes except for static assets and Posthog ingest
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};

export default function middleware(request: NextRequest, _event: NextFetchEvent) {
  const i18nResponse = internationalizationMiddleware(request);
  if (i18nResponse) {
    return i18nResponse;
  }

  // You can add other middleware logic here if needed
  return;
}
