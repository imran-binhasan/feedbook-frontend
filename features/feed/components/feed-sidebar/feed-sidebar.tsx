import { ExploreCard } from "@/features/feed/components/feed-sidebar/explore-card";
import { SuggestedPeopleCard } from "@/features/feed/components/feed-sidebar/suggested-people-card";
import { EventsCard } from "@/features/feed/components/feed-sidebar/events-card";

export function FeedSidebar() {
  return (
    <div className="space-y-4">
      <ExploreCard />
      <SuggestedPeopleCard />
      <EventsCard />
    </div>
  );
}
