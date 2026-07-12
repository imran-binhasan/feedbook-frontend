import { FeedShell } from "@/components/feed/feed-shell";
import { FeedStream } from "@/components/feed/feed-stream";

export default function FeedPage() {
  return (
    <FeedShell
      header={null}
      sidebar={null}
      stream={<FeedStream />}
      aside={null}
      mobileNav={null}
    />
  );
}
