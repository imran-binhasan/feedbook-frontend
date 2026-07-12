import { SuggestedPagesCard } from "@/components/feed/feed-aside/suggested-pages-card";
import { FriendsListCard } from "@/components/feed/feed-aside/friends-list-card";

export function FeedAside() {
  return (
    <div className="space-y-4">
      <SuggestedPagesCard />
      <FriendsListCard />
    </div>
  );
}
