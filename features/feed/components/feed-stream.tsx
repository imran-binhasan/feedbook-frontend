"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFeed } from "@/features/feed/hooks/use-feed";
import { CreatePost } from "@/features/feed/components/feed-stream/create-post";
import { FeedStories } from "@/features/feed/components/feed-stream/feed-stories";
import { PostCard } from "@/features/feed/components/feed-stream/post-card";
import type { Post } from "@/features/feed/types/feed.types";
import type { PaginatedApiResult } from "@/libs/api/client";

export function FeedStream() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useFeed();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const posts: Post[] = data?.pages.flatMap((p) => {
    const page = p as PaginatedApiResult<Post>;
    return page.items ?? [];
  }) ?? [];

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <div>
      <FeedStories />
      <CreatePost />

      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-md bg-card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="size-11 rounded-full bg-surface-muted" />
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-surface-muted" />
                  <div className="h-2 w-16 rounded bg-surface-muted" />
                </div>
              </div>
              <div className="mb-3 h-3 w-3/4 rounded bg-surface-muted" />
              <div className="h-40 rounded-md bg-surface-muted" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="rounded-md bg-card p-6 text-center text-sm text-muted-foreground">
          Failed to load posts. Please try again later.
        </div>
      )}

      {!isLoading && !isError && posts.length === 0 && (
        <div className="rounded-md bg-card p-6 text-center text-sm text-muted-foreground">
          No posts yet. Be the first to share something!
        </div>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={sentinelRef} className="flex justify-center py-4">
        {isFetchingNextPage && (
          <div className="text-sm text-muted-foreground">Loading more posts...</div>
        )}
      </div>
    </div>
  );
}
