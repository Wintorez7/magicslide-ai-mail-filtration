import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/", // Redirect unauthenticated users to landing page
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Protect /dashboard and its subroutes
};
