import { SuggestedPagesCard } from "@/features/feed/components/feed-aside/suggested-pages-card";
import { FriendsListCard } from "@/features/feed/components/feed-aside/friends-list-card";

export function FeedAside() {
  return (
    <div className="space-y-4">
      <SuggestedPagesCard />
      <FriendsListCard />
    </div>
  );
}
