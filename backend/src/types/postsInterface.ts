export interface PostDataInterface {
  userId?: string;
  captions?: string;
  hashtags?: string[];
  images?: string[];
  videos?: string[];
  reports?: string[];
  likes?: string[];
  location?: string;
  saved?: string;
  dp?: string;
  username?: string;
  isBlocked?: boolean;
  isArchived: boolean;
  mentions?: string[];
  shares?: string[];
  comments?: string[];
  createdAt: Date;
  updatedAt: Date;
}
