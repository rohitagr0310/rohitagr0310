import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req }); // Fetch user token
  const url = req.nextUrl.pathname; // Get current page

  // Define accessible routes for each role
  const rolePages = {
    user: [
      "/user",
      "/user/select-course",
      "/user/change-password",
      "/user/profile"
    ],
    consultant: [
      "/consultant",
      "/consultant/tickets",
      "/consultant/popup-tickets",
      "/consultant/change-password",
      "/consultant/profile"
    ],
    admin: [
      "/admin",
      "/admin/add-university",
      "/admin/manage-university",
      "/admin/manage-consultant",
      "/admin/tickets-list",
      "/admin/popup-tickets-list",
      "/admin/add-consultant",
      "/admin/change-password",
      "/admin/profile"
    ]
  };

  // Common routes for all
  const publicRoutes = ["/", "/login", "/register", "/unauthorized"];

  // If user is not logged in, redirect to login page
  if (!token && !publicRoutes.includes(url)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If user is logged in, check if they have access
  if (token && !publicRoutes.includes(url)) {
    const userRole = token.role || "user"; // Get user role

    if (!rolePages[userRole]?.includes(url)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirect unauthorized users
    }
  }

  return NextResponse.next(); // Allow request
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/user/:path*", "/consultant/:path*", "/admin/:path*"] // Protect all role-based pages
};
