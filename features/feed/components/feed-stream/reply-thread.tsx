"use client";

import { useState } from "react";
import { ReplyItem } from "@/features/feed/components/feed-stream/reply-item";
import { CommentInput } from "@/features/feed/components/feed-stream/comment-input";
import {
  useReplies,
  useCreateReply,
} from "@/features/feed/hooks/use-feed";
import type { Reply } from "@/features/feed/types/feed.types";

type ReplyThreadProps = {
  postId: string;
  commentId: string;
  initialReplies?: Reply[];
  totalReplyCount?: number;
  showInput?: boolean;
  onInputToggle?: (open: boolean) => void;
};

export function ReplyThread({
  postId,
  commentId,
  initialReplies = [],
  totalReplyCount = 0,
  showInput = false,
  onInputToggle,
}: ReplyThreadProps) {
  const hasInitial = initialReplies.length > 0;
  const [userExpanded, setUserExpanded] = useState(hasInitial);
  // Expand when there are replies, the user opened it, or the parent input is open.
  const expanded = userExpanded || showInput;

  const replyQuery = useReplies(postId, commentId, expanded);
  const createReply = useCreateReply(postId, commentId);

  const replies =
    replyQuery.data?.pages.flatMap((p) => p.items) ?? initialReplies;
  const totalCount = Math.max(totalReplyCount, replies.length);
  const hasMore = replyQuery.hasNextPage && !replyQuery.isFetchingNextPage;

  // Collapsed + no input → only show "View N replies" (the single Reply button lives on the comment).
  if (!expanded) {
    return totalCount > 0 ? (
      <button
        type="button"
        onClick={() => setUserExpanded(true)}
        className="text-muted-foreground hover:text-primary mt-2 px-1 text-xs font-medium transition-colors hover:underline cursor-pointer"
      >
        View {totalCount} {totalCount === 1 ? "reply" : "replies"}
      </button>
    ) : null;
  }

  return (
    <div className="mt-3 space-y-3">
      {replies.length > 0 ? (
        <ul className="space-y-3">
          {replies.map((reply) => (
            <ReplyItem
              key={reply.id}
              reply={reply}
              postId={postId}
              commentId={commentId}
            />
          ))}
        </ul>
      ) : null}

      {hasMore ? (
        <button
          type="button"
          onClick={() => replyQuery.fetchNextPage()}
          disabled={replyQuery.isFetchingNextPage}
          className="text-muted-foreground hover:text-primary text-xs font-medium transition-colors hover:underline disabled:opacity-50 cursor-pointer"
        >
          {replyQuery.isFetchingNextPage ? "Loading..." : "View more replies"}
        </button>
      ) : null}

      {showInput ? (
        <CommentInput
          placeholder="Write a reply..."
          showImageButton={false}
          onSubmit={({ content }) => {
            createReply.mutate({ content });
            onInputToggle?.(false);
          }}
          disabled={createReply.isPending}
        />
      ) : null}
    </div>
  );
}