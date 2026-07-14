import { apiClient, type PaginatedApiResult } from "@/libs/api/client";
import type {
  Post,
  CreatePostRequest,
  Comment,
  CommentMutationResult,
  CreateCommentRequest,
  UpdateCommentRequest,
  Reply,
  ReplyMutationResult,
  CreateReplyRequest,
  UpdateReplyRequest,
  Liker,
} from "@/features/feed/types/feed.types";

export function getFeedApi(cursor?: string, limit = 10) {
  const params = new URLSearchParams();
  if (cursor) params.set("cursor", cursor);
  params.set("limit", String(limit));
  return apiClient<PaginatedApiResult<Post>>(`/api/v1/posts/feed?${params}`);
}

export function getPostApi(id: string) {
  return apiClient<Post>(`/api/v1/posts/${id}`);
}

export function createPostApi(data: CreatePostRequest) {
  return apiClient<Post>("/api/v1/posts", {
    method: "POST",
    body: data,
  });
}

export function updatePostApi(id: string, data: CreatePostRequest) {
  return apiClient<Post>(`/api/v1/posts/${id}`, {
    method: "PATCH",
    body: data,
  });
}

export function deletePostApi(id: string) {
  return apiClient<void>(`/api/v1/posts/${id}`, { method: "DELETE" });
}

export function getPostLikesApi(id: string, limit = 5) {
  return apiClient<{ items: Liker[] } | Liker[]>(`/api/v1/posts/${id}/likes?limit=${limit}`)
    .then((res) => {
      if (Array.isArray(res)) return res;
      return res.items ?? [];
    });
}

export function togglePostLikeApi(id: string) {
  return apiClient<{ liked: boolean }>(`/api/v1/posts/${id}/like`, { method: "POST" });
}

export function getCommentsApi(postId: string, cursor?: string, limit = 10) {
  const params = new URLSearchParams();
  if (cursor) params.set("cursor", cursor);
  params.set("limit", String(limit));
  return apiClient<PaginatedApiResult<Comment>>(`/api/v1/posts/${postId}/comments?${params}`);
}

export function createCommentApi(postId: string, data: CreateCommentRequest) {
  return apiClient<CommentMutationResult>(`/api/v1/posts/${postId}/comments`, {
    method: "POST",
    body: data,
  });
}

export function updateCommentApi(commentId: string, data: UpdateCommentRequest) {
  return apiClient<CommentMutationResult>(`/api/v1/comments/${commentId}`, {
    method: "PATCH",
    body: data,
  });
}

export function deleteCommentApi(commentId: string) {
  return apiClient<void>(`/api/v1/comments/${commentId}`, { method: "DELETE" });
}

export function getCommentLikesApi(commentId: string, limit = 5) {
  return apiClient<{ items: Liker[] } | Liker[]>(`/api/v1/comments/${commentId}/likes?limit=${limit}`)
    .then((res) => {
      if (Array.isArray(res)) return res;
      return res.items ?? [];
    });
}

export function toggleCommentLikeApi(commentId: string) {
  return apiClient<{ liked: boolean }>(`/api/v1/comments/${commentId}/like`, { method: "POST" });
}

export function getRepliesApi(postId: string, commentId: string, cursor?: string, limit = 5) {
  const params = new URLSearchParams();
  if (cursor) params.set("cursor", cursor);
  params.set("limit", String(limit));
  return apiClient<PaginatedApiResult<Reply>>(
    `/api/v1/posts/${postId}/comments/${commentId}/replies?${params}`,
  );
}

export function createReplyApi(postId: string, commentId: string, data: CreateReplyRequest) {
  return apiClient<ReplyMutationResult>(
    `/api/v1/posts/${postId}/comments/${commentId}/replies`,
    { method: "POST", body: data },
  );
}

export function updateReplyApi(replyId: string, data: UpdateReplyRequest) {
  return apiClient<ReplyMutationResult>(`/api/v1/replies/${replyId}`, {
    method: "PATCH",
    body: data,
  });
}

export function deleteReplyApi(replyId: string) {
  return apiClient<void>(`/api/v1/replies/${replyId}`, { method: "DELETE" });
}

export function getReplyLikesApi(replyId: string, limit = 5) {
  return apiClient<{ items: Liker[] } | Liker[]>(`/api/v1/replies/${replyId}/likes?limit=${limit}`)
    .then((res) => {
      if (Array.isArray(res)) return res;
      return res.items ?? [];
    });
}

export function toggleReplyLikeApi(replyId: string) {
  return apiClient<{ liked: boolean }>(`/api/v1/replies/${replyId}/like`, { method: "POST" });
}

export async function uploadImageApi(file: File, folder: "posts" | "comments" | "replies") {
  const form = new FormData();
  form.append("image", file);
  form.append("folder", folder);

  let res: Response;
  try {
    res = await fetch("/api/v1/uploads/images", { method: "POST", body: form });
  } catch (err) {
    throw new Error("Network error uploading image");
  }

  if (!res.ok) {
    let msg = "Upload failed";
    try {
      const err = await res.json();
      msg = err?.error?.message ?? err?.message ?? msg;
    } catch { /* ignore */ }
    throw new Error(msg);
  }
  const body = await res.json();
  // Unwrap standard { success, data } envelope the same way apiClient does.
  const payload = body?.data ?? body;
  return { key: payload.key, url: payload.url } as { key: string; url: string };
}