"use client";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getFeedApi,
  createPostApi,
  updatePostApi,
  deletePostApi,
  togglePostLikeApi,
  uploadImageApi,
  getCommentsApi,
  createCommentApi,
  updateCommentApi,
  deleteCommentApi,
  toggleCommentLikeApi,
  getRepliesApi,
  createReplyApi,
  updateReplyApi,
  deleteReplyApi,
  toggleReplyLikeApi,
  getPostLikesApi,
} from "@/features/feed/api/feed.api";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import type {
  Post,
  Comment,
  CommentMutationResult,
  UpdateCommentRequest,
  Reply,
  ReplyMutationResult,
  CreateReplyRequest,
  UpdateReplyRequest,
} from "@/features/feed/types/feed.types";
import type { PaginatedApiResult } from "@/libs/api/client";
import type { Liker } from "@/features/feed/types/feed.types";

function commentsKey(postId: string) {
  return ["comments", postId] as const;
}

function repliesKey(postId: string, commentId: string) {
  return ["replies", postId, commentId] as const;
}

function readItems<T>(page: unknown): T[] {
  if (page && typeof page === "object" && "items" in (page as Record<string, unknown>)) {
    return (page as PaginatedApiResult<T>).items;
  }
  return [];
}

/**
 * Augment a CommentMutationResult (no author/hasLiked from backend) into a
 * full Comment using the current user so it can be optimistically inserted.
 */
function toCommentFromMutation(
  result: CommentMutationResult,
  author: NonNullable<ReturnType<typeof useCurrentUser>["data"]>,
): Comment {
  return {
    ...result,
    replyCount: result.replyCount ?? 0,
    hasLiked: false,
    author: {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
    },
  };
}

function toReplyFromMutation(
  result: ReplyMutationResult,
  author: NonNullable<ReturnType<typeof useCurrentUser>["data"]>,
): Reply {
  return {
    ...result,
    hasLiked: false,
    author: {
      id: author.id,
      firstName: author.firstName,
      lastName: author.lastName,
    },
  };
}

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: ({ pageParam }) => getFeedApi(pageParam as string | undefined),
    getNextPageParam: (last) => {
      const page = last as PaginatedApiResult<Post>;
      return page.pagination?.nextCursor ?? undefined;
    },
    initialPageParam: undefined as string | undefined,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: { text: string; image?: File; isPublic?: boolean }) => {
      let imageKey: string | undefined;
      if (data.image) {
        const uploadRes = await uploadImageApi(data.image, "posts");
        imageKey = uploadRes.key;
      }
      return createPostApi({
        content: data.text || undefined,
        imageKey,
        isPublic: data.isPublic ?? true,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Post created");
    },
    onError: (err) => {
      console.error("createPost", err);
      toast.error("Failed to create post");
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePostApi(id),
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onSuccess: () => {
      toast.success("Post deleted");
    },
    onError: (err) => {
      console.error("deletePost", err);
      toast.error("Failed to delete post");
    },
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: { postId: string; content?: string; image?: File; isPublic?: boolean }) => {
      let imageKey: string | undefined;
      if (data.image) {
        const uploadRes = await uploadImageApi(data.image, "posts");
        imageKey = uploadRes.key;
      }
      return updatePostApi(data.postId, {
        content: data.content ?? undefined,
        ...(imageKey ? { imageKey } : {}),
        ...(data.isPublic !== undefined ? { isPublic: data.isPublic } : {}),
      });
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onSuccess: () => {
      toast.success("Post updated");
    },
    onError: (err) => {
      console.error("updatePost", err);
      toast.error("Failed to update post");
    },
  });
}

export function useComments(postId: string, enabled = true) {
  return useInfiniteQuery({
    queryKey: commentsKey(postId),
    queryFn: ({ pageParam }) => getCommentsApi(postId, pageParam as string | undefined),
    getNextPageParam: (last) => {
      const page = last as PaginatedApiResult<Comment>;
      return page.pagination?.nextCursor ?? undefined;
    },
    initialPageParam: undefined as string | undefined,
    enabled,
  });
}

export function useCreateComment(postId: string) {
  const qc = useQueryClient();
  const { data: me } = useCurrentUser();

  return useMutation({
    mutationFn: async (data: { content?: string; image?: File }) => {
      let imageKey: string | undefined;
      if (data.image) {
        const uploadRes = await uploadImageApi(data.image, "comments");
        imageKey = uploadRes.key;
      }
      return createCommentApi(postId, {
        ...(data.content ? { content: data.content } : {}),
        ...(imageKey ? { imageKey } : {}),
      });
    },
    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: commentsKey(postId) });
      if (!me) return { previous: qc.getQueryData(commentsKey(postId)) };

      const placeholder: Comment = {
        id: `optimistic-${Date.now()}`,
        postId,
        userId: me.id,
        content: data.content || null,
        imageUrl: data.image ? "pending" : null,
        likeCount: 0,
        replyCount: 0,
        hasLiked: false,
        createdAt: new Date().toISOString(),
        author: { id: me.id, firstName: me.firstName, lastName: me.lastName },
      };

      qc.setQueryData<ReturnType<typeof useComments>["data"]>(commentsKey(postId), (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page, idx) =>
            idx === 0
              ? { ...page, items: [placeholder, ...readItems<Comment>(page)] }
              : page,
          ),
        };
      });

      return { previous: qc.getQueryData(commentsKey(postId)) };
    },
    onSuccess: (created) => {
      if (!me) return;
      qc.setQueryData<ReturnType<typeof useComments>["data"]>(commentsKey(postId), (old) => {
        if (!old) return old;
        const augmented = toCommentFromMutation(created, me);
        return {
          ...old,
          pages: old.pages.map((page, idx) =>
            idx === 0
              ? {
                  ...page,
                  items: readItems<Comment>(page).map((c) =>
                    c.id.startsWith("optimistic-") &&
                    c.userId === me.id &&
                    (c.content === created.content ||
                      (!c.content && !created.content))
                      ? augmented
                      : c,
                  ),
                }
              : page,
          ),
        };
      });
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(commentsKey(postId), ctx.previous);
      toast.error("Failed to post comment");
    },
  });
}

export function useUpdateComment(postId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, data }: { commentId: string; data: UpdateCommentRequest }) =>
      updateCommentApi(commentId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commentsKey(postId) });
    },
    onError: (err) => {
      console.error("updateComment", err);
      toast.error("Failed to update comment");
    },
  });
}

export function useDeleteComment(postId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => deleteCommentApi(commentId),
    onMutate: async (commentId) => {
      await qc.cancelQueries({ queryKey: commentsKey(postId) });
      const previous = qc.getQueryData(commentsKey(postId));
      try {
        qc.setQueryData<ReturnType<typeof useComments>["data"]>(commentsKey(postId), (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: readItems<Comment>(page).filter((c) => c.id !== commentId),
            })),
          };
        });
      } catch (e) {
        console.error("deleteComment:onMutate", e);
      }
      return { previous };
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: commentsKey(postId) });
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onSuccess: () => {
      toast.success("Comment deleted");
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(commentsKey(postId), ctx.previous);
      console.error("deleteComment", _err);
      toast.error("Failed to delete comment");
    },
  });
}

export function useToggleCommentLike(postId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => toggleCommentLikeApi(commentId),
    onMutate: async (commentId) => {
      await qc.cancelQueries({ queryKey: commentsKey(postId) });
      const previous = qc.getQueryData(commentsKey(postId));
      qc.setQueryData<ReturnType<typeof useComments>["data"]>(commentsKey(postId), (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: readItems<Comment>(page).map((c) =>
              c.id === commentId
                ? {
                    ...c,
                    hasLiked: !c.hasLiked,
                    likeCount: c.likeCount + (c.hasLiked ? -1 : 1),
                  }
                : c,
            ),
          })),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(commentsKey(postId), ctx.previous);
      console.error("toggleCommentLike", _err);
      toast.error("Failed to update like");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commentsKey(postId) });
    },
  });
}

export function useReplies(postId: string, commentId: string, enabled = true) {
  return useInfiniteQuery({
    queryKey: repliesKey(postId, commentId),
    queryFn: ({ pageParam }) => getRepliesApi(postId, commentId, pageParam as string | undefined),
    getNextPageParam: (last) => {
      const page = last as PaginatedApiResult<Reply>;
      return page.pagination?.nextCursor ?? undefined;
    },
    initialPageParam: undefined as string | undefined,
    enabled,
  });
}

export function useCreateReply(postId: string, commentId: string) {
  const qc = useQueryClient();
  const { data: me } = useCurrentUser();

  return useMutation({
    mutationFn: (data: CreateReplyRequest) => createReplyApi(postId, commentId, data),
    onMutate: async (data) => {
      await qc.cancelQueries({ queryKey: repliesKey(postId, commentId) });
      if (!me) return { previous: qc.getQueryData(repliesKey(postId, commentId)) };

      const placeholder: Reply = {
        id: `optimistic-${Date.now()}`,
        commentId,
        userId: me.id,
        content: data.content,
        likeCount: 0,
        hasLiked: false,
        createdAt: new Date().toISOString(),
        author: { id: me.id, firstName: me.firstName, lastName: me.lastName },
      };

      qc.setQueryData<ReturnType<typeof useReplies>["data"]>(repliesKey(postId, commentId), (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page, idx) =>
            idx === 0
              ? { ...page, items: [placeholder, ...readItems<Reply>(page)] }
              : page,
          ),
        };
      });

      // Increment replyCount on the parent comment for instant UI feedback.
      qc.setQueryData<ReturnType<typeof useComments>["data"]>(commentsKey(postId), (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: readItems<Comment>(page).map((c) =>
              c.id === commentId ? { ...c, replyCount: c.replyCount + 1 } : c,
            ),
          })),
        };
      });

      return { previous: qc.getQueryData(repliesKey(postId, commentId)) };
    },
    onSuccess: (created) => {
      if (!me) return;
      qc.setQueryData<ReturnType<typeof useReplies>["data"]>(repliesKey(postId, commentId), (old) => {
        if (!old) return old;
        const augmented = toReplyFromMutation(created, me);
        return {
          ...old,
          pages: old.pages.map((page, idx) =>
            idx === 0
              ? {
                  ...page,
                  items: readItems<Reply>(page).map((r) =>
                    r.id.startsWith("optimistic-") &&
                    r.content === created.content &&
                    r.userId === me.id
                      ? augmented
                      : r,
                  ),
                }
              : page,
          ),
        };
      });
      qc.invalidateQueries({ queryKey: commentsKey(postId) });
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(repliesKey(postId, commentId), ctx.previous);
      toast.error("Failed to post reply");
    },
  });
}

export function useUpdateReply(postId: string, commentId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ replyId, data }: { replyId: string; data: UpdateReplyRequest }) =>
      updateReplyApi(replyId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: repliesKey(postId, commentId) });
    },
    onError: (err) => {
      console.error("updateReply", err);
      toast.error("Failed to update reply");
    },
  });
}

export function useDeleteReply(postId: string, commentId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (replyId: string) => deleteReplyApi(replyId),
    onMutate: async (replyId) => {
      await qc.cancelQueries({ queryKey: repliesKey(postId, commentId) });
      const previous = qc.getQueryData(repliesKey(postId, commentId));
      try {
        qc.setQueryData<ReturnType<typeof useReplies>["data"]>(repliesKey(postId, commentId), (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: readItems<Reply>(page).filter((r) => r.id !== replyId),
            })),
          };
        });
        // Decrement replyCount on the parent comment locally.
        qc.setQueryData<ReturnType<typeof useComments>["data"]>(commentsKey(postId), (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: readItems<Comment>(page).map((c) =>
                c.id === commentId ? { ...c, replyCount: Math.max(0, c.replyCount - 1) } : c,
              ),
            })),
          };
        });
      } catch (e) {
        console.error("deleteReply:onMutate", e);
      }
      return { previous };
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: repliesKey(postId, commentId) });
      qc.invalidateQueries({ queryKey: commentsKey(postId) });
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
    onSuccess: () => {
      toast.success("Reply deleted");
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(repliesKey(postId, commentId), ctx.previous);
      console.error("deleteReply", _err);
      toast.error("Failed to delete reply");
    },
  });
}

export function useToggleReplyLike(postId: string, commentId: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (replyId: string) => toggleReplyLikeApi(replyId),
    onMutate: async (replyId) => {
      await qc.cancelQueries({ queryKey: repliesKey(postId, commentId) });
      const previous = qc.getQueryData(repliesKey(postId, commentId));
      qc.setQueryData<ReturnType<typeof useReplies>["data"]>(repliesKey(postId, commentId), (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: readItems<Reply>(page).map((r) =>
              r.id === replyId
                ? {
                    ...r,
                    hasLiked: !r.hasLiked,
                    likeCount: r.likeCount + (r.hasLiked ? -1 : 1),
                  }
                : r,
            ),
          })),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(repliesKey(postId, commentId), ctx.previous);
      toast.error("Failed to update like");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: repliesKey(postId, commentId) });
    },
  });
}

export function useToggleLike() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => togglePostLikeApi(postId),
    onMutate: async (postId) => {
      await qc.cancelQueries({ queryKey: ["feed"] });
      const previous = qc.getQueryData(["feed"]);
      qc.setQueryData<ReturnType<typeof useFeed>["data"]>(["feed"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            items: readItems<Post>(page).map((p) =>
              p.id === postId
                ? {
                    ...p,
                    hasLiked: !p.hasLiked,
                    likeCount: p.likeCount + (p.hasLiked ? -1 : 1),
                  }
                : p,
            ),
          })),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(["feed"], ctx.previous);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}

export function usePostLikes(postId: string, opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["post-likes", postId],
    queryFn: () => getPostLikesApi(postId),
    staleTime: 30_000,
    enabled: opts?.enabled ?? true,
  });
}