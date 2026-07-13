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
  createdAt: string;
  updatedAt: string;
  author: PostAuthor;
}

export interface CreatePostRequest {
  content?: string;
  imageKey?: string;
  isPublic?: boolean;
}

export interface UpdatePostRequest {
  content?: string;
  imageKey?: string;
  isPublic?: boolean;
}
