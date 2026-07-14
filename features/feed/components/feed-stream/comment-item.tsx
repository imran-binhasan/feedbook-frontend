"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { timeAgoShort } from "@/libs/utils";
import { cn } from "@/libs/utils";
import { ReplyThread } from "@/features/feed/components/feed-stream/reply-thread";
import {
  useDeleteComment,
  useToggleCommentLike,
  useUpdateComment,
  useCommentLikes,
} from "@/features/feed/hooks/use-feed";
import { useAuthStore } from "@/features/auth/store/auth";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import type { Comment } from "@/features/feed/types/feed.types";

type CommentItemProps = {
  comment: Comment;
  postId: string;
};

export function CommentItem({ comment, postId }: CommentItemProps) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment.content ?? "");
  const [showLikers, setShowLikers] = useState(false);

  const toggleLike = useToggleCommentLike(postId);
  const deleteComment = useDeleteComment(postId);
  const updateComment = useUpdateComment(postId);
  const { data: commentLikers } = useCommentLikes(showLikers ? comment.id : "");

  const storedUser = useAuthStore((s) => s.user);
  const { data: me } = useCurrentUser();
  const currentUser = me ?? storedUser;
  const isOwner = currentUser?.id === comment.userId;

  const name = `${comment.author.firstName} ${comment.author.lastName}`;

  return (
    <li className="flex gap-3">
      <Avatar name={name} size={40} className="shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="bg-comment relative w-fit max-w-full rounded-[18px] px-3.5 py-2.5">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-title text-sm font-semibold leading-tight">
              <Link href="#" className="hover:underline">
                {name}
              </Link>
            </h4>

            {isOwner ? (
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Comment actions"
                className="text-muted-foreground hover:text-primary -mt-0.5 shrink-0 cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 4 17" fill="none">
                  <circle cx="2" cy="2" r="2" fill="currentColor" />
                  <circle cx="2" cy="8" r="2" fill="currentColor" />
                  <circle cx="2" cy="15" r="2" fill="currentColor" />
                </svg>
              </button>
            ) : null}
          </div>

          {editing ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              autoFocus
              className="text-card-foreground mt-1 w-full resize-none rounded-md bg-card px-2 py-1 text-sm outline-none ring-1 ring-border-strong"
            />
          ) : (
            <p className="text-muted-foreground mt-0.5 text-sm font-normal leading-tight break-all">
              {comment.content}
            </p>
          )}

          {comment.imageUrl ? (
            <img
              src={comment.imageUrl}
              alt=""
              className="mt-2 max-h-64 w-full rounded-md object-cover"
            />
          ) : null}

          {menuOpen && isOwner ? (
            <div
              className="absolute right-0 top-7 z-50 w-40 rounded-md bg-card p-1 shadow-lg ring-1 ring-border-soft"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  setEditing(true);
                  setMenuOpen(false);
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteComment.mutate(comment.id);
                  setMenuOpen(false);
                }}
                disabled={deleteComment.isPending}
                className="flex w-full cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left text-xs text-destructive transition-colors hover:bg-surface-muted disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>

        {editing ? (
          <div className="mt-2 flex items-center gap-2 px-1">
            <button
              type="button"
              onClick={() => {
                if (draft.trim() && draft !== comment.content) {
                  updateComment.mutate({
                    commentId: comment.id,
                    data: { content: draft.trim() },
                  });
                }
                setEditing(false);
              }}
              disabled={updateComment.isPending}
              className="inline-flex h-7 cursor-pointer items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-white transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50"
            >
              {updateComment.isPending ? (
                <span className="mr-1.5 size-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : null}
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(comment.content ?? "");
                setEditing(false);
              }}
              className="inline-flex h-7 cursor-pointer items-center justify-center rounded-md border border-border-soft bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-surface-muted"
            >
              Cancel
            </button>
          </div>
        ) : (
          <ul className="text-muted-foreground mt-2 flex flex-wrap items-center gap-3 px-1 text-xs">
            <li>
              <span>{timeAgoShort(comment.createdAt)}</span>
            </li>
            <li>
              <button
                type="button"
                onClick={() => toggleLike.mutate(comment.id)}
                className={cn(
                  "transition-colors hover:underline hover:text-primary cursor-pointer",
                  comment.hasLiked && "text-primary font-medium",
                )}
              >
                {comment.hasLiked ? "Liked" : "Like"}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setShowReplyInput((v) => !v)}
                className="transition-colors hover:underline hover:text-primary cursor-pointer"
              >
                Reply
              </button>
            </li>
            {comment.likeCount > 0 ? (
              <li>
                <button
                  type="button"
                  onClick={() => setShowLikers((v) => !v)}
                  className="flex cursor-pointer items-center gap-1 transition-colors hover:text-primary"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1890FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  <span className="text-title font-medium">{comment.likeCount}</span>
                </button>
                {showLikers && commentLikers && commentLikers.length > 0 ? (
                  <div className="mt-1 flex items-center gap-1">
                    <div className="flex -space-x-2">
                      {commentLikers.slice(0, 5).map((liker) => (
                        <Avatar
                          key={liker.userId}
                          name={`${liker.author.firstName} ${liker.author.lastName}`}
                          size={24}
                          className="border-2 border-card"
                        />
                      ))}
                      {commentLikers.length > 5 ? (
                        <div className="flex size-6 items-center justify-center rounded-full border border-border bg-card text-[10px] font-semibold text-muted-foreground">
                          +{commentLikers.length - 5}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </li>
            ) : null}
          </ul>
        )}

        <ReplyThread
          postId={postId}
          commentId={comment.id}
          totalReplyCount={comment.replyCount}
          showInput={showReplyInput}
          onInputToggle={setShowReplyInput}
        />
      </div>
    </li>
  );
}