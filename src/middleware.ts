import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static path checks to restrict `/` access
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/login", "/signup"],
};

// import { NextResponse, NextRequest } from "next/server";
// import { isAuthenticatedState } from "./constant";

// const isAuthenticated = () => {
//   const token = localStorage.getItem("authtoken");
//   if (token) {
//     return true;
//   } else {
//     return false;
//   }
// };

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();
//   const authenticated = isAuthenticated();

//   if (authenticated) {
//     if (
//       url.pathname === "/" ||
//       url.pathname === "/login" ||
//       url.pathname === "/signup"
//     ) {
//       url.pathname = "/dashboard";
//       return NextResponse.redirect(url);
//     }
//   } else {
//     if (url.pathname !== "/login" && url.pathname !== "/signup") {
//       url.pathname = "/login";
//       return NextResponse.redirect(url);
//     }
//   }

//   // Allow the request to proceed if no redirection is needed
//   return NextResponse.next();
// }
