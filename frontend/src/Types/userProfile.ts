
export interface GetUserInfoResponse {
  status: string;
  message: string;
  user: UserInfo;
}


export interface UserInfo {
  name: string;
  username?: string;
  email: string;
  phone?: number;
  password?: string;
  dp?: string;
  coverPhoto?: string;
  bio?: string;
  gender?: string;
  city?: string;
  isBlocked?: boolean;
  isPrivate?: boolean;
  isVerifiedAccount?: boolean;
  isGoogleSignedIn?: boolean;
  isPremium?: boolean;
  refreshToken?: string | null;
  refreshTokenExpiresAt?: Date | null;
  posts?: any[];
  requests?: any[];
  requested?: any[];
  followers?: any[];
  following?: any[];
  savedPosts?: any[];
  notifications?: any[];
  blockedUsers?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}
