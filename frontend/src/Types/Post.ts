export interface Post {
  userId: string;
  isArchived: boolean;
  captions?: string;
  location?: string;
  images?: string[];
  videos?: string[];
  hashtags?: string[];
  mentions?: string[];
  likes?: string[];
  shares?: string[];
  saved?: string[];
  comments?: string[];
  createdAt: Date;
  updatedAt: Date;
  reports?: string[];
  name?: string;
  username?: string;
  isBlocked?: boolean;
}

export interface Comment {
  postId: string;
  userId: string;
  username: string;
  comment: string;
  dp: string;
  replies: string[];
  report: string[];
  likes: string[];
  isBlock: boolean;
}

export interface Reply {
  commentId: string;
  postId: string;
  userId: string;
  username: string;
  reply: string;
  dp: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IReaction {
  userId: string;
  type: "like" | "love" | "haha" | "sad" | "angry";
}

export interface Story {
  userId: string;
  isHighlighted: boolean;
  captions?: string;
  username?: string;
  dp?: string;
  mediaUrl: string;
  mediaType: "image" | "video" | "text";
  viewers: string[];
  viewCount: number;
  reactions: IReaction[];
  hiddenFrom: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PostResponse {
  status: string;
  message: string;
}

export interface GetAllPostsForUser {
  status: string;
  message: string;
  postData: Post;
}

export interface GetOnePost {
  status: string;
  message: string;
  postData: Post;
}

export interface GetAllPostsOfCurrentUser {
  status: string;
  message: string;
  postData: Post;
}

export interface ReportPostResponse {
  status: string;
  message: string;
}

export interface SavePostResponse {
  status: string;
  message: string;
}

export interface DeletePostResponse {
  status: string;
  message: string;
}
export interface LikePostResponse {
  status: string;
  message: string;
}

export interface DislikePostResponse {
  status: string;
  message: string;
}

export interface AddCommentResponse {
  status: string;
  message: string;
}

export interface AddReplyResponse {
  status: string;
  message: string;
}
export interface AddStoryResponse {
  status: string;
  message: string;
}

export interface ReportPostData {
  postId: string;
  reason: string;
  comments: string;
  reporterId: string;
  reporterUsername: string;
}

export interface GetLikedPostsResponse {
  likedPosts: any;
  data: string[];
}

export interface GetDislikedPostsResponse {
  dislikedPosts: any;
  data: string[];
}
export interface GetLikesDislikesInfoResponse {
  likesCount: number;
  dislikesCount: number;
  likedUsers: string[];
  dislikedUsers: string[];
}

export interface GetAllCommentsResponse {
  status: string;
  message: string;
  data: Comment;
}

export interface GetAllPostsForExploreResponse {
  status: string;
  message: string;
  data: Post;
}

export interface GetAllStories {
  status: string;
  message: string;
  data: Story;
}

export interface GenerateCaptionResponse {
  status: string;
  message: string;
  caption: string;
}

export interface EditCommentResponse {
  status: string;
  message: string;
}
