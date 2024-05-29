import { PostDataInterface, ReportPost } from "../../../types/postsInterface";
import ErrorInApplication from "../../../utils/ErrorInApplication";
import { PostDBInterface } from "../../repositories/PostDBRepository";
import { UserDBInterface } from "../../repositories/userDBRepository";

export const handleCreatePost = async (
  postData: PostDataInterface,
  dbPostRepository: ReturnType<PostDBInterface>,
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

    const newPostData = {
      ...postData,
      username: userData?.username,
      dp: userData?.dp,
    };

    console.log("User exists....");
    const newPost = await dbPostRepository.addNewPost(newPostData);
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


export const handleGetPostsForUser = async (
  id: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleGetPostsForUser reached");
    if (!id) {
      throw new ErrorInApplication("User ID is required to get all posts", 400);
    }
    const allPostsForUser  = await dbPostRepository.getAllPostsForUser(id);
    console.log("All posts from handleGetPostsForuser :", allPostsForUser);
    return allPostsForUser;
  } catch (error) {
    console.log("Error in handleGetPostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get all posts", 500);
  }
};


export const handleReportPosts = async (
  data : ReportPost,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleReportPosts reached");
    if (!data.postId) {
      throw new ErrorInApplication("Post ID is required to report post", 400);
    }
    const reportPostsForUser  = await dbPostRepository.reportPostsForUser(data);
    console.log("All posts from reportPostsForUser :", reportPostsForUser);
    return reportPostsForUser;
  } catch (error) {
    console.log("Error in handleGetPostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get all posts", 500);
  }
};
