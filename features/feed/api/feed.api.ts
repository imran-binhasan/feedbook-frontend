import { apiClient, type PaginatedApiResult } from "@/libs/api/client";
import type { Post, CreatePostRequest } from "@/features/feed/types/feed.types";

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

export async function uploadImageApi(file: File, folder: "posts" | "comments" | "replies") {
  const form = new FormData();
  form.append("image", file);
  form.append("folder", folder);
  const res = await fetch("/api/v1/uploads/images", { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Upload failed" }));
    throw new Error(err.message ?? "Upload failed");
  }
  const body = await res.json();
  return body.data ?? body;
}
