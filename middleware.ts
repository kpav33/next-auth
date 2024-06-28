export { default } from "next-auth/middleware";

// Url of the pages we want to protect from unauthenticated users
export const config = {
  matcher: ["/UserPost/:path*"],
};
