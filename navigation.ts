import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "kr"] as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

// import {
//   createLocalizedPathnamesNavigation,
//   Pathnames,
// } from "next-intl/navigation";

// export const locales = ["en", "kr"] as const;
// // The `pathnames` object holds pairs of internal
// // and external paths, separated by locale.
// export const pathnames = {
//   // If all locales use the same pathname, a
//   // single external path can be provided.
//   "/": "/home",
//   "/onboarding": "/onboarding",
//   "/sign-in": "/sign-in",
//   "/sign-out": "/sign-out",
//   "/sign-up": "/sign-up",
//   "/blog": "/blog",
//   "/home": "/home",
//   "/search": "/search",
//   "/activity": "/activity",
//   "/thread/[...id]": "/thread/[...id]",
//   "/create-thread": "/create-thread",
//   "/communities": "/communities",
//   "/communities/[...id]": "/communities/[...id]",
//   "/profile": "/profile",
//   "/profile/[...id]": "/profile/[...id]",
//   "/profile/edit": "/profile/edit",
//   // If locales use different paths, you can
//   // specify each external path per locale.
//   // '/about': {
//   //   en: '/about',
//   //   kr: '/ueber-uns'
//   // },

//   // // Dynamic params are supported via square brackets
//   // '/news/[articleSlug]-[articleId]': {
//   //   en: '/news/[articleSlug]-[articleId]',
//   //   kr: '/neuigkeiten/[articleSlug]-[articleId]'
//   // },

//   // // Also (optional) catch-all segments are supported
//   // '/categories/[...slug]': {
//   //   en: '/categories/[...slug]',
//   //   kr: '/kategorien/[...slug]'
//   // }
// } satisfies Pathnames<typeof locales>;
// export const { Link, redirect, usePathname, useRouter, getPathname } =
//   createLocalizedPathnamesNavigation({ locales, pathnames });
