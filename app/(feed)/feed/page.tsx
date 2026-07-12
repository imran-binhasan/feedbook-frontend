import { FeedShell } from "@/components/feed/feed-shell";
import { FeedHeader } from "@/components/feed/feed-header";
import { FeedSidebar } from "@/components/feed/feed-sidebar/feed-sidebar";
import { FeedStream } from "@/components/feed/feed-stream";
import { FeedAside } from "@/components/feed/feed-aside/feed-aside";
import { MobileNav } from "@/components/feed/mobile-nav";

export default function FeedPage() {
  return (
    <FeedShell
      header={<FeedHeader />}
      sidebar={<FeedSidebar />}
      stream={<FeedStream />}
      aside={<FeedAside />}
      mobileNav={<MobileNav />}
    />
  );
}
