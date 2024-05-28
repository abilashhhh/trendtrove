import { PostDataInterface } from "../../../types/postsInterface";
import ErrorInApplication from "../../../utils/ErrorInApplication";
import { UserDBInterface } from "../../repositories/userDBRepository";

export const handleCreatePost = async (
  postData: PostDataInterface,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    console.log("Post data in handleCreatePost:", postData);

    if (!postData.userId) {
      throw new ErrorInApplication("User ID is required to create a post", 400);
    }
    const userData = await dbUserRepository.getUserById(postData.userId);
    if (!userData) {
      throw new ErrorInApplication("User not found", 404);
    }
    console.log("User exists....");
    const newPost = await dbUserRepository.addNewPost(postData);
    console.log("New post data:", newPost);
    return newPost;
  } catch (error) {
    console.error("Error in handleCreatePost:", error);
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to create post", 500);
  }
};
