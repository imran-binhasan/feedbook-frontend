import { ExploreCard } from "@/components/feed/feed-sidebar/explore-card";
import { SuggestedPeopleCard } from "@/components/feed/feed-sidebar/suggested-people-card";
import { EventsCard } from "@/components/feed/feed-sidebar/events-card";

export function FeedSidebar() {
  return (
    <div className="space-y-4">
      <ExploreCard />
      <SuggestedPeopleCard />
      <EventsCard />
    </div>
  );
}
