import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidToken, SESSION_COOKIE } from "@/lib/auth";

// Public admin routes that do NOT require authentication
const PUBLIC_ADMIN_API = ["/api/admin/auth", "/api/admin/logout"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip public auth endpoints — login must always be reachable
    if (PUBLIC_ADMIN_API.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // Protect the dashboard and all other admin API routes
    const needsAuth =
        pathname.startsWith("/admin/dashboard") ||
        pathname.startsWith("/api/admin/");

    if (!needsAuth) return NextResponse.next();

    const token = request.cookies.get(SESSION_COOKIE)?.value ?? "";
    const valid = await isValidToken(token);

    if (!valid) {
        if (pathname.startsWith("/api/")) {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }
        const loginUrl = new URL("/admin", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

// Next.js 16 uses "proxy" as the export name; exporting both for compatibility
export { middleware as proxy };
export default middleware;

export const config = {
    matcher: ["/admin/dashboard/:path*", "/api/admin/:path*"],
};
