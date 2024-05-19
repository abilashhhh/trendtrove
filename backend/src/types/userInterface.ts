export interface UserInterface {
  name: string;
  username: string;
  email: string;
  phone?: number;
  password: string;
}

export interface GoogleUserInterface {
  name: string;
  username?: string;
  email: string;
  phone?: number;
  password?: string;
  dp?:string
  isGoogleSignedIn?:boolean
}

export interface UserDataInterface {
  id?: string;
  name: string;
  username: string;
  email: string;
  phone?: number;
  password: string;
  dp?: string;
  coverPhoto?: string;
  bio?: string;
  gender?: string;
  city?: string;
  followers?: string[];
  following?: string[];
  savedPosts?: string[];
  isVerifiedAccount?: boolean;
  isGoogleSignedIn?: boolean;
  isBlocked?: boolean;
  isPrivate?: boolean;
  createdAt?: string;
}