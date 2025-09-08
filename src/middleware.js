// src/middleware.js
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Tell Next.js which routes need Clerk
export const config = {
  matcher: [
    // Protect these paths
    "/dashboard/:path*",
    "/upload/:path*",
    "/analyze/:path*",
    "/api/:path*"
  ]
};
