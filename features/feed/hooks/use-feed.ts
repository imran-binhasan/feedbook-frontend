"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getFeedApi, createPostApi, updatePostApi, deletePostApi, uploadImageApi } from "@/features/feed/api/feed.api";
import type { CreatePostRequest, Post } from "@/features/feed/types/feed.types";
import type { PaginatedApiResult } from "@/libs/api/client";

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
      const created = await createPostApi({
        content: data.text || undefined,
        isPublic: data.isPublic ?? true,
      });

      if (data.image && "id" in (created as object)) {
        const uploadRes = await uploadImageApi(data.image, "posts");
        const imageKey = uploadRes.key ?? uploadRes.imageKey;

        await updatePostApi((created as Post).id, {
          imageKey,
        }).catch(() => {});
      }

      return created;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Post created");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to create post");
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePostApi(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
      toast.success("Post deleted");
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "Failed to delete post");
    },
  });
}
