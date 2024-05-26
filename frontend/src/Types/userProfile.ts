
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
  address?: string;
  isBlocked?: boolean;
  isPrivate?: boolean;
  isVerifiedAccount?: boolean;
  isGoogleSignedIn?: boolean;
  isPremium?: boolean;
  refreshToken?: string | null;
  refreshTokenExpiresAt?: Date | null;
  posts?: any[];
  requestsForMe?: any[];
  requestedByMe?: any[];
  followers?: any[];
  following?: any[];
  savedPosts?: any[];
  notifications?: any[];
  blockedUsers?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}


export interface EditProfileResponse {
  status: string,
  message: string,
  user: UserInfo
}

export interface ChangePasswordResponse {
  status: string, 
  message: string,
}

export interface ChangePasswordInterface {
  _id: string, 
  currentPassword: string,
  newPassword: string, 
}

export interface DeleteAccountResponse {
  status: string, 
  message: string,
}

export interface SuspendAccountResponse {
  status: string, 
  message: string,
}

export interface GetOtherUserInfoResponse {
  status: string,
  message: string,
  otherUser: UserInfo,
}


export interface GetRestOfUsersResponse {
  status: string,
  message: string,
  users: UserInfo[]
}

 
export interface FriendRequestSentResponse {
  status: string, 
  message: string,
}

export interface UploadCoverResponse {
  status : string, 
  message : string ,
  coverPhoto : string
}

export interface UploadDpResponse {
  url: string | undefined;
  status : string, 
  message : string ,
  dp : string
}