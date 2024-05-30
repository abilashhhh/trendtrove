import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import { PostDataInterface } from "../../types/postsInterface";

export const postDBRepository = (
  repository: ReturnType<PostRepositoryMongoDB>
) => {
  const addNewPost = async (postData: PostDataInterface) => {
    await repository.addNewPost(postData);
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

  const getParticularPostsForCurrentUser = async (id: string) => 
  await repository.getParticularPostsForCurrentUser(id);
  
  const reportPostsForUser = async (id: string) => 
  await repository.reportPostsForUser(id);
  
  const savePostsForUser = async (userId: string, postId: string) => 
  await repository.savePostsForUser(userId, postId);
  
  const removeSavePostsForUser = async (userId: string, postId: string) => 
  await repository.removeSavePostsForUser(userId, postId);
  
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
  

  return {
    addNewPost,
    updatePost,
    getPostById,
    blockPost,
    unblockPost,
    getAllPostsForUser,
    getAllPostsForUserUsername,
    lengthofPostsForUser,
    getAllPostsForCurrentUser,
    getAllSavedPostsForCurrentUser,
    getParticularPostsForCurrentUser,
    reportPostsForUser,
    savePostsForUser,
    removeSavePostsForUser,
    likePostsForUser,
    dislikePostsForUser,
    getLikedPosts,
    getDislikedPosts,
    getlikesdislikesInfo,
    deltePostForUser
  };
};

export type PostDBInterface = typeof postDBRepository;
