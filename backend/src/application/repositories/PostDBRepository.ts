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
  

  return {
    addNewPost,
    getAllPostsForUser,
    reportPostsForUser
  };
};

export type PostDBInterface = typeof postDBRepository;
