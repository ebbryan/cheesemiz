import dayjs from "dayjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Define your route access rules
export const privateRoutes = ["/dashboard"];
export const publicRoutes = ["/"];

const isTokenValid = (token?: string): boolean => {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = dayjs().unix();

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      console.warn("Token expired.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  const hasValidAccessToken = isTokenValid(token);

  const isPrivateRoute = privateRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  // Handle private routes
  if (isPrivateRoute && !hasValidAccessToken) {
    const redirectTarget = token ? "/dashboard" : "/";
    console.log("Redirecting from public route >", redirectTarget);
    return NextResponse.redirect(new URL(redirectTarget, request.nextUrl));
  }

  // Prevent logged-in users from accessing public routes
  if (isPublicRoute && hasValidAccessToken) {
    console.log("Already authenticated > Redirecting to /");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
