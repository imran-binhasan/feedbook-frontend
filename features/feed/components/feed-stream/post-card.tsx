"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToggleLike, useDeletePost } from "@/features/feed/hooks/use-feed";
import { CommentThread } from "@/features/feed/components/feed-stream/comment-thread";
import { EditPostDialog } from "@/features/feed/components/feed-stream/edit-post-dialog";
import { LikersModal } from "@/features/feed/components/feed-stream/likers-modal";
import type { Post } from "@/features/feed/types/feed.types";
import { fromNow, formatCompactNumber } from "@/libs/utils";
import { cn } from "@/libs/utils";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  const toggleLike = useToggleLike();
  const deletePost = useDeletePost();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showLikers, setShowLikers] = useState(false);

  const likers = post.likers ?? [];

  return (
    <div className="mb-4 rounded-md bg-card pt-6 pb-6">
      <div className="px-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="#" className="block shrink-0">
              <Avatar
                name={`${post.author.firstName} ${post.author.lastName}`}
                size={44}
              />
            </Link>
            <div>
              <Link href="#" className="text-sm font-medium text-title transition-colors hover:text-primary">
                {post.author.firstName} {post.author.lastName}
              </Link>
              <p className="text-xs text-muted-foreground">
                {fromNow(post.createdAt)} .{" "}
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {post.isPublic ? "Public" : "Private"}
                </Link>
              </p>
            </div>
          </div>

          {/* Three-dot dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex size-8 items-center justify-center rounded-full text-placeholder transition-colors hover:bg-surface-muted hover:text-muted-foreground"
            >
              <svg width="4" height="17" fill="none" viewBox="0 0 4 17">
                <circle cx="2" cy="2" r="2" fill="currentColor" />
                <circle cx="2" cy="8" r="2" fill="currentColor" />
                <circle cx="2" cy="15" r="2" fill="currentColor" />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 top-[30px] z-50 w-[220px] rounded-lg bg-card p-2 shadow-lg ring-1 ring-border-soft sm:w-[260px]"
                onClick={(e) => e.stopPropagation()}
              >
                <ul className="space-y-1">
                  <li>
                    <button type="button" className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground sm:gap-3 sm:px-3 sm:py-2.5 sm:text-sm">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background transition-colors group-hover:bg-accent-tint sm:size-[34px]">
                        <svg width="14" height="14" fill="none" viewBox="0 0 18 18" className="sm:size-4"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"/></svg>
                      </span>
                      <span>Save Post</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground sm:gap-3 sm:px-3 sm:py-2.5 sm:text-sm">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background transition-colors group-hover:bg-accent-tint sm:size-[34px]">
                        <svg width="14" height="14" fill="none" viewBox="0 0 20 22" className="sm:size-4"><path fill="currentColor" fillRule="evenodd" d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0z" clipRule="evenodd"/></svg>
                      </span>
                      <span>Notifications</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground sm:gap-3 sm:px-3 sm:py-2.5 sm:text-sm">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background transition-colors group-hover:bg-accent-tint sm:size-[34px]">
                        <svg width="14" height="14" fill="none" viewBox="0 0 18 18" className="sm:size-4"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"/></svg>
                      </span>
                      <span>Hide</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => { setDropdownOpen(false); setShowEdit(true); }}
                      className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground sm:gap-3 sm:px-3 sm:py-2.5 sm:text-sm"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background transition-colors group-hover:bg-accent-tint sm:size-[34px]">
                        <svg width="14" height="14" fill="none" viewBox="0 0 18 18" className="sm:size-4"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"/></svg>
                      </span>
                      <span>Edit Post</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => { setDropdownOpen(false); setShowDeleteConfirm(true); }}
                      className="group flex w-full items-center gap-2 rounded-md px-2 py-2 text-xs text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground sm:gap-3 sm:px-3 sm:py-2.5 sm:text-sm"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background transition-colors group-hover:bg-accent-tint sm:size-[34px]">
                        <svg width="14" height="14" fill="none" viewBox="0 0 18 18" className="sm:size-4"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"/></svg>
                      </span>
                      <span>Delete Post</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {post.content && (
          <p className="mb-4 text-sm text-card-foreground">{post.content}</p>
        )}
      </div>

      {post.imageUrl && (
        <div className="mb-4">
          <img src={post.imageUrl} alt="" className="w-full object-cover" />
        </div>
      )}

      <div className="mb-4 flex items-center justify-between px-6">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {post.likeCount > 0 && likers.length > 0 ? (
            <button
              type="button"
              onClick={() => setShowLikers(true)}
              className="flex items-center gap-1 transition-opacity hover:opacity-80"
            >
              <div className="flex -space-x-3">
                {likers.slice(0, 5).map((liker) => (
                  <Avatar
                    key={liker.userId}
                    name={`${liker.author.firstName} ${liker.author.lastName}`}
                    size={32}
                    className="border-2 border-card"
                  />
                ))}
                {post.likeCount > 5 ? (
                  <div className="flex size-8 items-center justify-center rounded-full border border-border bg-card text-xs font-semibold text-muted-foreground">
                    +{formatCompactNumber(post.likeCount - 5)}
                  </div>
                ) : null}
              </div>
              <span className="text-muted-foreground">{formatCompactNumber(post.likeCount)}</span>
            </button>
          ) : post.likeCount > 0 ? (
            <button
              type="button"
              onClick={() => setShowLikers(true)}
              className="transition-opacity hover:opacity-80"
            >
              <span>{formatCompactNumber(post.likeCount)} like{post.likeCount !== 1 ? "s" : ""}</span>
            </button>
          ) : null}
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => setShowComments((v) => !v)}
            className="transition-colors hover:text-primary"
          >
            {post.commentCount} Comment{post.commentCount !== 1 ? "s" : ""}
          </button>
        </div>
      </div>

      <div className="flex items-center border-t border-divider px-6 pt-3">
        <button
          onClick={() => toggleLike.mutate(post.id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm transition-colors",
            post.hasLiked
              ? "text-primary hover:bg-accent-tint"
              : "text-muted-foreground hover:bg-accent-tint hover:text-primary",
          )}
        >
          <svg width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          {post.hasLiked ? "Liked" : "Like"}
        </button>
        <button
          onClick={() => setShowComments((v) => !v)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm transition-colors hover:bg-accent-tint hover:text-primary",
            showComments ? "text-primary" : "text-muted-foreground",
          )}
        >
          <svg width="21" height="21" fill="none" viewBox="0 0 21 21">
            <path stroke="currentColor" d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z" />
            <path stroke="currentColor" strokeLinecap="round" d="M6.938 9.313h7.125M10.5 14.063h3.563" />
          </svg>
          Comment
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm text-muted-foreground transition-colors hover:bg-accent-tint hover:text-primary">
          <svg width="24" height="21" fill="none" viewBox="0 0 24 21">
            <path stroke="currentColor" strokeLinejoin="round" d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z" />
          </svg>
          Share
        </button>
      </div>

      {showComments ? (
        <div className="mt-3 border-t border-divider pt-4">
          <CommentThread postId={post.id} totalCount={post.commentCount} />
        </div>
      ) : null}

      <EditPostDialog post={post} open={showEdit} onClose={() => setShowEdit(false)} />

      <LikersModal postId={post.id} open={showLikers} onClose={() => setShowLikers(false)} />

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone. All comments and replies will also be deleted."
        confirmLabel="Delete"
        variant="danger"
        loading={deletePost.isPending}
        onConfirm={() => {
          deletePost.mutate(post.id);
          setShowDeleteConfirm(false);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
}