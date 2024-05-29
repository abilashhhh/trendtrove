import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import { PostDataInterface } from "../../types/postsInterface";

export const postDBRepository = (
  repository: ReturnType<PostRepositoryMongoDB>
) => {
  const addNewPost = async (postData: PostDataInterface) => {
    await repository.addNewPost(postData);
  };

  const getAllPostsForUser = async (id: string) => {
    await repository.getAllPostsForUser(id);
  };

  return {
    addNewPost,
    getAllPostsForUser,
  };
};

export type PostDBInterface = typeof postDBRepository;
