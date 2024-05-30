import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import { PostDataInterface } from "../../types/postsInterface";

export const postDBRepository = (
  repository: ReturnType<PostRepositoryMongoDB>
) => {
  const addNewPost = async (postData: PostDataInterface) => {
    await repository.addNewPost(postData);
  };

  const getAllPostsForUser = async (id: string) => 
  await repository.getAllPostsForUser(id);
  
  const reportPostsForUser = async (id: string) => 
  await repository.reportPostsForUser(id);
  
  const savePostsForUser = async (userId: string, postId: string) => 
  await repository.savePostsForUser(userId, postId);
  
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
  

  return {
    addNewPost,
    getAllPostsForUser,
    reportPostsForUser,
    savePostsForUser,
    likePostsForUser,
    dislikePostsForUser,
    getLikedPosts,
    getDislikedPosts,
    getlikesdislikesInfo
  };
};

export type PostDBInterface = typeof postDBRepository;
