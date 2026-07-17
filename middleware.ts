import { NextResponse, type NextRequest } from "next/server";

const PROTOTYPE_PATH = "/prototype/clinical-document-workspace";
const STATIC_ASSET_PREFIX = "/_next/static/";

function securityHeaders(response: NextResponse) {
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'"
  );
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

function notFound() {
  return securityHeaders(
    new NextResponse("Not found\n", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8"
      }
    })
  );
}

function hasAllowedQuery(request: NextRequest, isStaticAsset: boolean) {
  if (request.nextUrl.searchParams.size === 0) return true;
  if (!isStaticAsset || request.nextUrl.searchParams.size !== 1) return false;

  const developmentVersion = request.nextUrl.searchParams.get("v");
  return developmentVersion !== null && /^\d+$/.test(developmentVersion);
}

export function middleware(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") return notFound();

  const pathname = request.nextUrl.pathname;
  const isPrototype = pathname === PROTOTYPE_PATH || pathname === `${PROTOTYPE_PATH}/`;
  const isStaticAsset = pathname.startsWith(STATIC_ASSET_PREFIX);

  if ((!isPrototype && !isStaticAsset) || !hasAllowedQuery(request, isStaticAsset)) {
    return notFound();
  }

  return securityHeaders(NextResponse.next());
}

export const config = {
  matcher: "/:path*"
};
