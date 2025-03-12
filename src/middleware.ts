import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/log-in",
    newUser: "/sign-up",
    verifyRequest: "/verify",
  },
});

export const config = {
  matcher: ["/friends/:path*", "/conversations/:path*"],
};
