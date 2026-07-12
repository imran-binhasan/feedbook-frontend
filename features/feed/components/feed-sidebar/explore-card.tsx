import Link from "next/link";
import {
  ExploreLearningIcon,
  ExploreInsightsIcon,
  ExploreFindFriendsIcon,
  ExploreBookmarksIcon,
  ExploreGroupIcon,
  ExploreGamingIcon,
  ExploreSettingsIcon,
  ExploreSavePostIcon,
} from "@/components/ui/icons";
import { Card } from "@/components/ui/card";
import { cn } from "@/libs/utils";

type ExploreItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isNew?: boolean;
};

const EXPLORE_ITEMS: ExploreItem[] = [
  { label: "Learning", href: "#", icon: ExploreLearningIcon, isNew: true },
  { label: "Insights", href: "#", icon: ExploreInsightsIcon },
  { label: "Find friends", href: "/friends", icon: ExploreFindFriendsIcon },
  { label: "Bookmarks", href: "#", icon: ExploreBookmarksIcon },
  { label: "Group", href: "/groups", icon: ExploreGroupIcon },
  { label: "Gaming", href: "#", icon: ExploreGamingIcon, isNew: true },
  { label: "Settings", href: "/settings", icon: ExploreSettingsIcon },
  { label: "Save post", href: "#", icon: ExploreSavePostIcon },
];

export function ExploreCard() {
  return (
    <Card aria-labelledby="explore-title">
      <h2 id="explore-title" className="mb-6 text-xl font-medium text-title">
        Explore
      </h2>
      <ul className="m-0 list-none space-y-6 p-0">
        {EXPLORE_ITEMS.map((item, index) => (
          <li key={item.label} className={cn(index === EXPLORE_ITEMS.length - 1 && "mb-[15px]")}>
            <Link
              href={item.href}
              className={cn(
                "group flex items-center justify-between text-[15px] font-medium text-muted-foreground transition-colors hover:text-primary",
              )}
            >
              <span className="flex items-center gap-1">
                <item.icon className="mr-3 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                {item.label}
              </span>
              {item.isNew ? (
                <span className="ml-2 rounded border border-card bg-success px-[6px] py-[2px] text-[10px] font-semibold text-white">
                  New
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}