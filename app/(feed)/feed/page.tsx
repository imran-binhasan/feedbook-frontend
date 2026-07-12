import { FeedShell } from "@/components/feed/feed-shell";
import { FeedHeader } from "@/components/feed/feed-header";
import { FeedStream } from "@/components/feed/feed-stream";

export default function FeedPage() {
  return (
    <FeedShell
      header={<FeedHeader />}
      sidebar={null}
      stream={<FeedStream />}
      aside={null}
      mobileNav={null}
    />
  );
}
