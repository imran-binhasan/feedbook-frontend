import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAuthenticated = false;

    if (pathname === "/") {
        return NextResponse.redirect(
            new URL(isAuthenticated ? "/feed" : "/login", request.url)
        );
    }

    if (pathname === "/login" || pathname === "/register") {
        return isAuthenticated
            ? NextResponse.redirect(new URL("/feed", request.url))
            : NextResponse.next();
    }

    if (pathname.startsWith("/feed")) {
        return isAuthenticated
            ? NextResponse.next()
            : NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/feed/:path*"],
};