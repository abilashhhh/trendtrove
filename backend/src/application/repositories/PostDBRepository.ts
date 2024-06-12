import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import { Comment, CommentInterface, ReplyInterface } from "../../types/commentInterface";
import { PostDataInterface } from "../../types/postsInterface";

export const postDBRepository = (
  repository: ReturnType<PostRepositoryMongoDB>
) => {
  const addNewPost = async (postData: PostDataInterface) => {
    await repository.addNewPost(postData);
  };

  const taggedDataFromPosts = async (usernames: string[], postId: string) => {
    await repository.taggedDataFromPosts(usernames, postId);
  };

  const getPostById = async (postId: string) => {
    return await repository.getPostById(postId);
  };

  const updatePost = async (postData: PostDataInterface) => {
    await repository.updatePost(postData);
  };

  const getAllPostsForUser = async (id: string) =>
    await repository.getAllPostsForUser(id);

  const getAllPostsForUserUsername = async (username: string) =>
    await repository.getAllPostsForUserUsername(username);

  const lengthofPostsForUser = async (username: string) =>
    await repository.lengthofPostsForUser(username);

  const getAllPostsForCurrentUser = async (id: string) =>
    await repository.getAllPostsForCurrentUser(id);

  const getAllSavedPostsForCurrentUser = async (id: string) =>
    await repository.getAllSavedPostsForCurrentUser(id);

  const getAllTaggedPostsForCurrentUser = async (id: string) =>
    await repository.getAllTaggedPostsForCurrentUser(id);

  const getParticularPostsForCurrentUser = async (id: string) =>
    await repository.getParticularPostsForCurrentUser(id);

  const reportPostsForUser = async (id: string) =>
    await repository.reportPostsForUser(id);

  const savePostsForUser = async (userId: string, postId: string) =>
    await repository.savePostsForUser(userId, postId);

  const removeSavePostsForUser = async (userId: string, postId: string) =>
    await repository.removeSavePostsForUser(userId, postId);

  const removeTaggedPostsForUser = async (userId: string, postId: string) =>
    await repository.removeTaggedPostsForUser(userId, postId);

  const likePostsForUser = async (userId: string, postId: string) =>
    await repository.likePostsForUser(userId, postId);

  const dislikePostsForUser = async (userId: string, postId: string) =>
    await repository.dislikePostsForUser(userId, postId);

  const getLikedPosts = async (userId: string) =>
    await repository.getLikedPosts(userId);

  const getDislikedPosts = async (userId: string) =>
    await repository.getDislikedPosts(userId);

  const getlikesdislikesInfo = async (postId: string) =>
    await repository.getlikesdislikesInfo(postId);

  const deltePostForUser = async (postId: string) =>
    await repository.deltePostForUser(postId);

  const blockPost = async (postId: string) =>
    await repository.blockPost(postId);

  const unblockPost = async (postId: string) =>
    await repository.unblockPost(postId);

  const approvePremium = async (userId: string) =>
    await repository.approvePremium(userId);

  const rejectPremium = async (userId: string) =>
    await repository.rejectPremium(userId);

  const addNewComment = async (commentData: CommentInterface) => {
    await repository.addNewComment(commentData);
  };
  const addNewReply = async (replyData: ReplyInterface) => {
    await repository.addNewReply(replyData);
  }

  const getAllComments = async (postId: string) =>
    await repository.getAllComments(postId);
  
  const deleteComment = async (commentId: string) =>
    await repository.deleteComment(commentId);
  
  const editComment = async (commentId: string, updatedText: string) =>
    await repository.editComment(commentId, updatedText);
  
  const getAllPublicPosts = async (id:string) =>
    await repository.getAllPublicPosts(id);

  return {
    addNewPost,
    taggedDataFromPosts,
    updatePost,
    getPostById,
    blockPost,
    unblockPost,
    getAllPostsForUser,
    getAllPostsForUserUsername,
    lengthofPostsForUser,
    getAllPostsForCurrentUser,
    getAllSavedPostsForCurrentUser,
    getAllTaggedPostsForCurrentUser,
    getParticularPostsForCurrentUser,
    reportPostsForUser,
    savePostsForUser,
    removeSavePostsForUser,
    removeTaggedPostsForUser,
    likePostsForUser,
    dislikePostsForUser,
    getLikedPosts,
    getDislikedPosts,
    getlikesdislikesInfo,
    deltePostForUser,
    addNewComment,
    addNewReply,
    getAllComments,
    deleteComment,
    editComment,
    getAllPublicPosts,
    approvePremium,
    rejectPremium,
  };
};

export type PostDBInterface = typeof postDBRepository;
