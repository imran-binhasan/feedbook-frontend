"use client";

import { useCallback, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { usePostLikes } from "@/features/feed/hooks/use-feed";

type LikersModalProps = {
  open: boolean;
  onClose: () => void;
  postId: string;
  title?: string;
};

export function LikersModal({ open, onClose, postId, title = "Liked by" }: LikersModalProps) {
  const { data: likers, isLoading, isError } = usePostLikes(postId, { enabled: open });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-title">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}

        {isError && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Could not load likers. Try again.
          </p>
        )}

        {!isLoading && !isError && (!likers || likers.length === 0) && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            No likes yet.
          </p>
        )}

        {!isLoading && !isError && likers && likers.length > 0 && (
          <ul className="max-h-80 space-y-3 overflow-y-auto">
            {(likers ).map((liker) => (
              <li key={liker.userId} className="flex items-center gap-3">
                <Avatar
                  name={`${liker.author.firstName} ${liker.author.lastName}`}
                  size={40}
                />
                <span className="text-sm font-medium text-title">
                  {liker.author.firstName} {liker.author.lastName}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
