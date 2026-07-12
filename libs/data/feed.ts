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

export type SuggestedPerson = {
  avatarSrc: string;
  name: string;
  role: string;
};

export const SUGGESTED_PEOPLE: SuggestedPerson[] = [
  { avatarSrc: "/images/avatars/people1.png", name: "Steve Jobs", role: "CEO of Apple" },
  { avatarSrc: "/images/avatars/people2.png", name: "Ryan Roslansky", role: "CEO of LinkedIn" },
  { avatarSrc: "/images/avatars/people3.png", name: "Dylan Field", role: "CEO of Figma" },
];
