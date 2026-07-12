import { ExploreCard } from "@/components/feed/feed-sidebar/explore-card";
import { SuggestedPeopleCard } from "@/components/feed/feed-sidebar/suggested-people-card";

export function FeedSidebar() {
  return (
    <div className="space-y-4">
      <ExploreCard />
      <SuggestedPeopleCard />
    </div>
  );
}
