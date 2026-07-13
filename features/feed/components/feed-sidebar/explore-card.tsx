import Link from "next/link";
import { EXPLORE_ITEMS } from "@/features/feed/data/feed";
import {
  ExploreLearningIcon,
  ExploreInsightsIcon,
  ExploreFindFriendsIcon,
  ExploreBookmarksIcon,
  ExploreGroupIcon,
  ExploreGamingIcon,
  ExploreSettingsIcon,
  ExploreSavePostIcon,
} from "@/features/feed/components/feed-icons";
import { Card } from "@/components/ui/card";
import { cn } from "@/libs/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  learning: ExploreLearningIcon,
  insights: ExploreInsightsIcon,
  findFriends: ExploreFindFriendsIcon,
  bookmarks: ExploreBookmarksIcon,
  group: ExploreGroupIcon,
  gaming: ExploreGamingIcon,
  settings: ExploreSettingsIcon,
  savePost: ExploreSavePostIcon,
};

export function ExploreCard() {
  return (
    <Card aria-labelledby="explore-title">
      <h2 id="explore-title" className="mb-6 text-xl font-medium text-title">
        Explore
      </h2>
      <ul className="m-0 list-none space-y-6 p-0">
        {EXPLORE_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center justify-between text-[15px] font-medium text-muted-foreground transition-colors hover:text-primary",
                )}
              >
                <span className="flex items-center gap-1">
                  {Icon ? (
                    <Icon className="mr-3 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  ) : null}
                  {item.label}
                </span>
                {item.isNew ? (
                  <span className="ml-2 rounded border border-card bg-success px-[6px] py-[2px] text-[10px] font-semibold text-white">
                    New
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
