import { NextRequest, NextResponse } from "next/server";
import { internationalizationMiddleware } from "@foodify/internationalization/middleware";
import jwt from "jsonwebtoken"; // or jose
import { serverApi } from "@foodify/api/lib/server-client";
import { TDataSingle, TUserMe } from "./types/base";

export const config = {
  matcher: ["/((?!_next/static|_next/image|ingest|favicon.ico).*)"],
};

const PUBLIC_ROUTES = ["/sign-in", "/sign-up", "/forgot-password"];
const DEFAULT_AUTH_REDIRECT = "/dashboard";
const DEFAULT_PUBLIC_REDIRECT = "/";

// Map routes to required resource/action
const ROUTE_PERMISSIONS: Record<string, { resource: string; actions: string[] }> = {
  "/workers": { resource: "user", actions: ["read"] },
  "/ingredient": { resource: "ingredient", actions: ["read"] },
  "/sections/storages": { resource: "storage", actions: ["read"] },
  // add more routes here...
};

function hasPermission(userPermissions: any[], resource: string, requiredActions: string[]) {
  const permission = userPermissions.find(
    (perm) => perm.permission.toLowerCase() === resource.toLowerCase()
  );
  if (!permission) return false;
  return requiredActions.every((action) => permission.actions.includes(action));
}

export default async function middleware(request: NextRequest) {
  const i18nResponse = internationalizationMiddleware(request);
  if (i18nResponse) return i18nResponse;

  const token = request.cookies.get("_foodify_auth")?.value;
  const { pathname } = request.nextUrl;

  // Case 1: User authenticated
  if (token) {
    const { data } = await serverApi<TDataSingle<TUserMe>>({
      functionName: "get/me",
      method: "GET",
      token: token,
    });
    const user = data?.data;
    try {
      if (!user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Prevent access to auth pages
    if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL(DEFAULT_AUTH_REDIRECT, request.url));
    }

    // 🔒 Permission checkpoint
    const routeConfig = Object.entries(ROUTE_PERMISSIONS).find(([route]) =>
      pathname.startsWith(route)
    );
    if (routeConfig) {
      const { resource, actions } = routeConfig[1];
      if (hasPermission(user?.permissions ?? [], resource, actions)) {
        // ❌ If user has "read", block them
        return NextResponse.redirect(new URL("/403", request.url));
      }
    }

    return NextResponse.next();
  }

  // Case 2: Not authenticated
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/sign-in", request.url));
}
