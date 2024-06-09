
export interface CommentInterface {
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