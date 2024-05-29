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
  id: string;
  user: string;
  post: string;
  content: string;
  likes?: string[];
  replies?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostResponse {
  status: string;
  message: string;
}


export interface GetAllPostsForUser {
  status: string;
  message: string;
  postData :Post
}


export interface ReportPostResponse {
  status: string;
  message: string;
}

export interface SavePostResponse {
  status: string;
  message: string;
}

 
export interface ReportPostData {
  postId: string,
  reason: string;
  comments: string;
  reporterId: string;
  reporterUsername: string;
}