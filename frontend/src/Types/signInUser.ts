
export interface LoginUserInterface {
    email: string,
    password: string
}

export interface User {
    _id?: string;
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
    followers?: string[];
    following?: string[];
    savedPosts?: string[];
    isVerifiedAccount?: boolean;
    isGoogleSignedIn?: boolean;
    isBlocked?: boolean;
    isPrivate?: boolean;
    createdAt?: string;
}

export interface LoginUserResponse {
    accessToken: string | null;
    message: string,
    status: string,
    user: User | null;
}

export interface GoogleLoginInterface {
    name: string,
    email: string
}

export interface GoogleLoginResponse {
    status: string;
    message: string,
    refreshToken?: string;
    accessToken?: string;
    user: User | null;
  }

export interface LogoutResponse {
    status: string,
    message: string,    
}

export interface generateOtpResponse {
    status: string,
    message: string,    
}

export interface VerifyOtpResponse {
    status: string, 
    message: string,
}

export interface ResetPasswordResponse {
    status: string,
    message: string,
}