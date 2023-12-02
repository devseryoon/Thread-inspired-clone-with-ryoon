import {
  createLocalizedPathnamesNavigation,
  Pathnames,
} from "next-intl/navigation";

export const locales = ["en", "kr"] as const;
export const localePrefix = "always";

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",
  "/onboarding": "/onboarding",
  "/activity": "/activity",
  "/communities": "communities",
  "/communities/[id]": "/communities/[id]",
  "/create-thread": "/create-thread",
  "/profile": "/profile",
  "/profile/[id]": "/profile/[id]",
  "/profile/edit": "/profile/edit",
  "/search": "/search",
  "/thread": "/thread",
  "/thread/[id]": "/thread/[id]",

  // Also (optional) catch-all segments are supported
  "/sign-in/[...slug]": "/sign-in/[...slug]",
  "/sign-up/[...slug]": "/sign-up/[...slug]",
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
