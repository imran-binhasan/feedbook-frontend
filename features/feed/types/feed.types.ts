export interface PostAuthor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string | null;
  imageUrl: string | null;
  likeCount: number;
  commentCount: number;
  isPublic: boolean;
  hasLiked: boolean;
  createdAt: string;
  updatedAt: string;
  author: PostAuthor;
}

export interface CreatePostRequest {
  content?: string;
  imageKey?: string;
  isPublic?: boolean;
}

/*
 * Comment feed item (returned by GET /posts/:postId/comments).
 * Includes author + hasLiked (current user) + replyCount.
 */
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string | null;
  imageUrl: string | null;
  likeCount: number;
  replyCount: number;
  hasLiked: boolean;
  createdAt: string;
  author: PostAuthor;
}

/**
 * Shape returned by POST/PATCH /comments — backend omits author + hasLiked.
 * Frontend must augment with current-user data for optimistic display.
 */
export interface CommentMutationResult {
  id: string;
  postId: string;
  userId: string;
  content: string | null;
  imageUrl: string | null;
  likeCount: number;
  replyCount: number;
  createdAt: string;
}

export interface CreateCommentRequest {
  content?: string;
  imageKey?: string;
}

export interface UpdateCommentRequest {
  content?: string;
  imageKey?: string;
}

/**
 * Reply feed item (returned by GET /comments/:commentId/replies).
 * Includes author + hasLiked (current user). No imageUrl, no nested replyCount.
 */
export interface Reply {
  id: string;
  commentId: string;
  userId: string;
  content: string;
  likeCount: number;
  hasLiked: boolean;
  createdAt: string;
  author: PostAuthor;
}

/**
 * Shape returned by POST/PATCH /replies — backend omits author + hasLiked.
 */
export interface ReplyMutationResult {
  id: string;
  commentId: string;
  userId: string;
  content: string;
  likeCount: number;
  createdAt: string;
}

export interface CreateReplyRequest {
  content: string;
}

export interface UpdateReplyRequest {
  content: string;
}

export interface Liker {
  userId: string;
  author: PostAuthor;
}