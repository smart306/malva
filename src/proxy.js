import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session;
  const role = session?.user?.role;
  const pathname = nextUrl.pathname;
  const isProfileRoute = pathname.startsWith("/profile");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminUser = role === "admin" || role === "admin-main";

  if (!isLoggedIn && (isProfileRoute || isAdminRoute)) {
    const loginUrl = new URL("/login", nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && !isAdminUser) {
    return NextResponse.redirect(new URL("/profile", nextUrl));
  }
  if (isProfileRoute && isAdminUser) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next()
})

  export const config = {
    matcher: ["/profile", "/profile/:path*", "/admin", "/admin/:path*"],
  }