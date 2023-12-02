import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";
import { locales, localePrefix, pathnames } from "./navigation";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
  localePrefix,
  locales,
  pathnames,
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth(request) {
    // console.log("beforeAuth==", request);
    return intlMiddleware(request);
  },
  // debug: true,
  // afterAuth(auth, req, evt) {
  //   // handle users who aren't authenticated
  //   console.log("afterAuth");
  //   console.log("auth:", auth);
  //   console.log("req:", req);
  //   console.log("evt:", evt);
  //   if (!auth.userId && !auth.isPublicRoute) {
  //     console.log("redirectToSignIn");
  //     console.log("req.url", req.url);
  //     return redirectToSignIn({ returnBackUrl: req.url });
  //   }
  //   // redirect them to organization selection page
  //   if (
  //     auth.userId &&
  //     !auth.orgId &&
  //     req.nextUrl.pathname !== "/:locale/sign-in"
  //   ) {
  //     console.log("NextResponse.redirect");
  //     console.log("req.url", req.url);
  //     const orgSelection = new URL("/:locale/sign-in", req.url);
  //     console.log("rorgSelection", orgSelection);
  //     return NextResponse.redirect(orgSelection);
  //   }
  // },
  // Ensure that locale-specific sign in pages are public
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)"],
  publicRoutes: ["/", "/:locale", "/:locale/sign-in", "/:locale/sign-up"],
});
export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/(en)/:path*",
    "/(kr)/:path*",
  ],
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
    responseLimit: "4mb",
  },
};
