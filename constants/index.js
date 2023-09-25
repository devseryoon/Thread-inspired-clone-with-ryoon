export const sidebarLinks = [
  {
    imgURL: {
      white: "/assets/new/white/Home.svg",
      dark: "/assets/new/dark/Home.svg",
    },
    route: "/",
    label: "Home",
  },
  {
    imgURL: {
      white: "/assets/new/white/Search.svg",
      dark: "/assets/new/dark/Search.svg",
    },
    route: "/search",
    label: "Search",
  },
  {
    imgURL: {
      white: "/assets/new/white/Heart.svg",
      dark: "/assets/new/dark/Heart.svg",
    },
    route: "/activity",
    label: "Activity",
  },
  {
    imgURL: {
      white: "/assets/new/white/Create.svg",
      dark: "/assets/new/dark/Create.svg",
    },
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    imgURL: {
      white: "/assets/new/white/community.svg",
      dark: "/assets/new/dark/community.svg",
    },
    route: "/communities",
    label: "Communities",
  },
  {
    imgURL: {
      white: "/assets/new/white/Profile.svg",
      dark: "/assets/new/dark/Profile.svg",
    },
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/new/dark/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/new/dark/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/new/dark/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/new/dark/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/new/dark/members.svg" },
  {
    value: "requests",
    label: "Requests",
    icon: "/assets/new/dark/request.svg",
  },
];
