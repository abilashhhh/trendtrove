export interface ProfileInterface {
    private _id(_id: any, profileInfo: ProfileInterface, arg2: { new: true; }): unknown;
    userId?: string,
    name?: string,
    username?: string,
    email?: string,
    phone?: number,
    bio?: string,
    gender?: string,
    address?: string,
    savedPosts?: string[],
}