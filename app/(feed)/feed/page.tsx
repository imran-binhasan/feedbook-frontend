import type { Metadata } from "next";
import { FeedStream } from "@/features/feed/components/feed-stream";

export const metadata: Metadata = {
  title: "Feed",
  description: "Your Buddy Script feed — posts from friends and community.",
};

export default function FeedPage() {
  return <FeedStream />;
}
