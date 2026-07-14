"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { useUpdatePost } from "@/features/feed/hooks/use-feed";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import { useFilePreview } from "@/libs/hooks/use-file-preview";
import { cn } from "@/libs/utils";
import type { Post } from "@/features/feed/types/feed.types";

type EditPostDialogProps = {
  post: Post;
  open: boolean;
  onClose: () => void;
};

export function EditPostDialog({ post, open, onClose }: EditPostDialogProps) {
  const { data: me } = useCurrentUser();
  const updatePost = useUpdatePost();
  const fileRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState(post.content ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(post.isPublic);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);

  const preview = useFilePreview(imageFile);

  const displayName = me
    ? `${me.firstName} ${me.lastName}`
    : `${post.author.firstName} ${post.author.lastName}`;

  useEffect(() => {
    if (open) {
      setText(post.content ?? "");
      setImageFile(null);
      setRemoveExistingImage(false);
      setIsPublic(post.isPublic);
    }
  }, [open, post.content, post.isPublic]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setRemoveExistingImage(true);
    }
  };

  const handleSave = () => {
    if (!text.trim() && !imageFile && !post.imageUrl) return;
    updatePost.mutate(
      {
        postId: post.id,
        content: text.trim() || undefined,
        image: imageFile ?? undefined,
        isPublic,
      },
      { onSuccess: () => onClose() },
    );
  };

  const showExistingImage = post.imageUrl && !removeExistingImage;
  const hasChanges =
    text !== (post.content ?? "") ||
    imageFile !== null ||
    removeExistingImage !== false ||
    isPublic !== post.isPublic;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="edit-post-title">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 mx-4 w-full max-w-lg rounded-xl bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 id="edit-post-title" className="text-lg font-semibold text-title">Edit Post</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-muted"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M12 4l-8 8M4 4l8 8" />
            </svg>
          </button>
        </div>

        <div className="mb-4 flex items-start gap-3">
          <Avatar name={displayName} size={34} className="mt-1 shrink-0" />
          <div className="relative flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Edit your post..."
              rows={3}
              className={cn(
                "scrollbar-none h-24 w-full resize-none rounded-lg border bg-card px-3 py-2 text-sm text-card-foreground outline-none transition-colors",
                "border-border-soft focus:border-primary focus:ring-1 focus:ring-primary",
              )}
            />
          </div>
        </div>

        {showExistingImage && (
          <div className="relative mb-3">
            <img src={post.imageUrl ?? undefined} alt="" className="h-40 w-full rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => setRemoveExistingImage(true)}
              className="absolute top-2 right-2 flex size-7 cursor-pointer items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M9 3l-6 6M3 3l6 6" />
              </svg>
            </button>
          </div>
        )}

        {preview && (
          <div className="relative mb-3">
            <img src={preview} alt="" className="h-40 w-full rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => {
                setImageFile(null);
                setRemoveExistingImage(true);
              }}
              className="absolute top-2 right-2 flex size-7 cursor-pointer items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
            >
              <svg width="12" height="12" fill="none" viewBox="0 0 12 12">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M9 3l-6 6M3 3l6 6" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between rounded-lg bg-surface-muted px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              aria-label="Change post image"
              onChange={handleFile}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-primary"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
                <path fill="currentColor" d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z" />
              </svg>
              <span>Photo</span>
            </button>
          </div>

          <div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button type="button" className="group flex cursor-pointer items-center gap-0.5 px-1 py-1 text-xs text-muted-foreground transition-colors hover:bg-surface-muted sm:gap-1 sm:px-1.5 sm:text-sm">
                  <span className="flex items-center">
                    {isPublic ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                    )}
                  </span>
                  <span className="hidden sm:inline">{isPublic ? "Public" : "Private"}</span>
                  <svg className="hidden sm:block" width="6" height="4" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  sideOffset={4}
                  className="z-[9999] min-w-[160px] rounded-lg bg-card p-1 shadow-lg ring-1 ring-border-soft"
                >
                  <DropdownMenu.Item
                    onSelect={() => setIsPublic(true)}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground outline-none transition-colors hover:bg-surface-muted data-[highlighted]:bg-surface-muted"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10"/>
                    </svg>
                    <div>
                      <p className="font-medium">Public</p>
                      <p className="text-xs text-muted-foreground">Anyone can see this post</p>
                    </div>
                    {isPublic && (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-primary">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onSelect={() => setIsPublic(false)}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground outline-none transition-colors hover:bg-surface-muted data-[highlighted]:bg-surface-muted"
                  >
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    <div>
                      <p className="font-medium">Private</p>
                      <p className="text-xs text-muted-foreground">Only you can see this post</p>
                    </div>
                    {!isPublic && (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-primary">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={updatePost.isPending}
            className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md border border-border-soft bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={updatePost.isPending || !hasChanges}
            className={cn(
              "inline-flex h-10 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-medium text-white transition-colors disabled:pointer-events-none disabled:opacity-50",
              hasChanges && !updatePost.isPending
                ? "bg-primary hover:bg-primary-hover"
                : "bg-primary/50",
            )}
          >
            {updatePost.isPending ? (
              <span className="mr-2 size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
