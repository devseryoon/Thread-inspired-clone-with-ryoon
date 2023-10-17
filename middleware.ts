import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { locales } from "./navigation";
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "always",

  // localePrefix: "always",
  // pathnames: pathnames,
});

export default authMiddleware({
  beforeAuth(request) {
    return intlMiddleware(request);
  },
  // afterAuth(auth, req, evt) {
  //   // handle users who aren't authenticated
  //   if (!auth.userId && !auth.isPublicRoute) {
  //     return redirectToSignIn({ returnBackUrl: req.url });
  //   }
  //   // redirect them to organization selection page
  //   if (
  //     auth.userId &&
  //     !auth.orgId &&
  //     req.nextUrl.pathname !== "/org-selection"
  //   ) {
  //     const orgSelection = new URL("/org-selection", req.url);
  //     return NextResponse.redirect(orgSelection);
  //   }
  // },
  // Ensure that locale-specific sign in pages are public

  publicRoutes: ["/:locale", "/:locale/sign-in"],
});
export const config = {
  // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/(kr|en)/:path*",
  ],
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
    responseLimit: "4mb",
  },
};
