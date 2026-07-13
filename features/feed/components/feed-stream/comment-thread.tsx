"use client";

import { CommentItem } from "@/features/feed/components/feed-stream/comment-item";
import { CommentInput } from "@/features/feed/components/feed-stream/comment-input";
import { useComments, useCreateComment } from "@/features/feed/hooks/use-feed";

type CommentThreadProps = {
  postId: string;
  /** Total comment count from the post feed item — used for "View previous comments". */
  totalCount: number;
};

export function CommentThread({ postId, totalCount }: CommentThreadProps) {
  const commentsQuery = useComments(postId);
  const createComment = useCreateComment(postId);

  const comments = commentsQuery.data?.pages.flatMap((p) => p.items) ?? [];
  // Older comments are reachable via the next-cursor pagination chain.
  const remaining =
    totalCount > comments.length ? totalCount - comments.length : 0;
  const hasMoreToLoad =
    Boolean(commentsQuery.hasNextPage) && !commentsQuery.isFetchingNextPage;

  return (
    <div className="px-6">
      {/* Comment input */}
      <div className="pb-2.5">
        <CommentInput
          onSubmit={({ content, image }) => createComment.mutate({ content, image })}
          disabled={createComment.isPending}
        />
      </div>

      {commentsQuery.isLoading ? (
        <div className="flex items-center justify-center py-3 text-sm text-muted-foreground">
          Loading comments…
        </div>
      ) : commentsQuery.isError ? (
        <div className="py-3 text-center text-sm text-destructive">
          Failed to load comments.{" "}
          <button
            type="button"
            onClick={() => commentsQuery.refetch()}
            className="text-primary hover:underline cursor-pointer"
          >
            Retry
          </button>
        </div>
      ) : null}

      {/* View older comments (cursor paginated). */}
      {hasMoreToLoad ? (
        <button
          type="button"
          onClick={() => commentsQuery.fetchNextPage()}
          disabled={commentsQuery.isFetchingNextPage}
          className="text-muted-foreground mb-3 mt-1 text-sm font-normal transition-colors hover:underline hover:text-primary disabled:opacity-50 cursor-pointer"
        >
          {commentsQuery.isFetchingNextPage
            ? "Loading…"
            : remaining > 0
              ? `View ${remaining} previous comment${remaining !== 1 ? "s" : ""}`
              : "View previous comments"}
        </button>
      ) : null}

      {/* Comments list */}
      {comments.length > 0 ? (
        <ul className="space-y-4 pb-2">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} />
          ))}
        </ul>
      ) : null}
    </div>
  );
}