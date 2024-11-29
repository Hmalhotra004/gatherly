import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/log-in",
    newUser: "/sign-up",
  },
});

export const config = {
  matcher: ["/friends/:path*", "/conversations/:path*"],
};
