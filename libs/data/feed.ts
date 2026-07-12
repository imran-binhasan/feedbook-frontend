export type ExploreItem = {
  label: string;
  href: string;
  icon: string;
  isNew?: boolean;
};

export const EXPLORE_ITEMS: ExploreItem[] = [
  { label: "Learning", href: "#", icon: "learning", isNew: true },
  { label: "Insights", href: "#", icon: "insights" },
  { label: "Find friends", href: "/friends", icon: "findFriends" },
  { label: "Bookmarks", href: "#", icon: "bookmarks" },
  { label: "Group", href: "/groups", icon: "group" },
  { label: "Gaming", href: "#", icon: "gaming", isNew: true },
  { label: "Settings", href: "/settings", icon: "settings" },
  { label: "Save post", href: "#", icon: "savePost" },
];
