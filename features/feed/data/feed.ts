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
  { label: "Saved post", href: "#", icon: "savePost" },
];

export type SuggestedPerson = {
  avatarSrc: string;
  name: string;
  role: string;
};

export type FeedEvent = {
  coverSrc: string;
  day: string;
  month: string;
  title: string;
  attendees: number;
};

export type SuggestedPage = {
  avatarSrc: string;
  name: string;
  role: string;
};

export const SUGGESTED_PAGES: SuggestedPage[] = [
  {
    avatarSrc: "/images/avatars/Avatar.png",
    name: "Radovan SkillArena",
    role: "Founder & CEO at Trophy",
  },
];

export const FEED_EVENTS: FeedEvent[] = [
  {
    coverSrc: "/images/feed/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    attendees: 17,
  },
  {
    coverSrc: "/images/feed/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    attendees: 17,
  },
];

export type Friend = {
  avatarSrc: string;
  name: string;
  role: string;
  online: boolean;
};

export const FRIENDS: Friend[] = [
  { avatarSrc: "/images/avatars/people1.png", name: "Steve Jobs", role: "CEO of Apple", online: false },
  { avatarSrc: "/images/avatars/people2.png", name: "Ryan Roslansky", role: "CEO of LinkedIn", online: true },
  { avatarSrc: "/images/avatars/people3.png", name: "Dylan Field", role: "CEO of Figma", online: true },
  { avatarSrc: "/images/avatars/people2.png", name: "Mark Zuckerberg", role: "CEO of Meta", online: true },
  { avatarSrc: "/images/avatars/people1.png", name: "Tim Cook", role: "CEO of Apple", online: false },
  { avatarSrc: "/images/avatars/people3.png", name: "Sundar Pichai", role: "CEO of Google", online: true },
  { avatarSrc: "/images/avatars/people1.png", name: "Elon Musk", role: "CEO of Tesla", online: false },
  { avatarSrc: "/images/avatars/people2.png", name: "Satya Nadella", role: "CEO of Microsoft", online: true },
];

export const SUGGESTED_PEOPLE: SuggestedPerson[] = [
  { avatarSrc: "/images/avatars/people1.png", name: "Steve Jobs", role: "CEO of Apple" },
  { avatarSrc: "/images/avatars/people2.png", name: "Ryan Roslansky", role: "CEO of LinkedIn" },
  { avatarSrc: "/images/avatars/people3.png", name: "Dylan Field", role: "CEO of Figma" },
];
