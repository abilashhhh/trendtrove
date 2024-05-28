export interface Post {
    id: string;  
    user: string;
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
  
 