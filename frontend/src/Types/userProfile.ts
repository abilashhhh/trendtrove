import {User} from './signInUser'

export interface GetUserInfoResponse{
    status : string ,
    message :string ,
    user: User
}


export interface UserInfo {
    name?: string;
    username?: string;
    email?: string;
    phone?: number;
    bio?: string;
    gender?: string;
    city?: string;
    isVerifiedAccount?: boolean;
}
