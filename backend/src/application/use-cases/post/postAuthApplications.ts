import { PostDataInterface, ReportPost } from "../../../types/postsInterface";
import ErrorInApplication from "../../../utils/ErrorInApplication";
import { PostDBInterface } from "../../repositories/postDBRepository";
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

export const handleupdatepost = async (
  postData: PostDataInterface,
  dbPostRepository: ReturnType<PostDBInterface>,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    console.log("Post data in handleupdatepost:", postData);

    if (!postData.userId) {
      throw new ErrorInApplication("User ID is required to update a post", 400);
    }

    if (!postData.postId) {
      throw new ErrorInApplication("post ID is required to update a post", 400);
    }
  

    console.log("User exists....");
    const newPost = await dbPostRepository.updatePost(postData);
    console.log("updated post data:", newPost);
    return newPost;
  } catch (error) {
    console.error("Error in updatePost:", error);
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to updatePost post", 500);
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
    const allPostsForUser = await dbPostRepository.getAllPostsForUser(id);
    const filteredPosts = allPostsForUser.filter(post => !post.isBlocked);
    console.log("Filtered posts from handleGetPostsForUser :", filteredPosts);
    return filteredPosts;
  } catch (error) {
    console.log("Error in handleGetPostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get all posts", 500);
  }
};

export const handleGetPostsForUserUsername = async (
  username: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleGetPostsForUserUsername reached");
    if (!username) {
      throw new ErrorInApplication("username is required to get all posts", 400);
    }
    const allPostsForUser = await dbPostRepository.getAllPostsForUserUsername(username);
    const filteredPosts = allPostsForUser.filter(post => !post.isBlocked);
    console.log("Filtered posts from handleGetPostsForUserUsername :", filteredPosts);
    return filteredPosts;
  } catch (error) {
    console.log("Error in handleGetPostsForUserUsername");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get all posts", 500);
  }
};


export const handleGetLengthForUser = async (
  username: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleGetLengthForUser reached");
    if (!username) {
      throw new ErrorInApplication("User ID is required to get all posts", 400);
    }
    const length  = await dbPostRepository.lengthofPostsForUser(username);
    console.log("All posts from handleGetPostsForuser :", length);
    return length;
  } catch (error) {
    console.log("Error in handleGetLengthForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get all posts", 500);
  }
};

export const handleGetPostsOfCurrentUser = async (
  id: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleGetPostsOfCurrentUser reached");
    if (!id) {
      throw new ErrorInApplication("ID is required to get all posts", 400);
    }
    const allPostsForUser  = await dbPostRepository.getAllPostsForCurrentUser(id);
    console.log("All posts from handleGetPostsOfCurrentUser :", allPostsForUser);
    return allPostsForUser;
  } catch (error) {
    console.log("Error in handleGetPostsOfCurrentUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get all  posts of current user", 500);
  }
};

export const handleGetSavedPostsOfCurrentUser = async (
  id: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleGetSavedPostsOfCurrentUser reached");
    if (!id) {
      throw new ErrorInApplication("ID is required to get all posts", 400);
    }
    const allPostsForUser  = await dbPostRepository.getAllSavedPostsForCurrentUser(id);
    console.log("All posts from handleGetSavedPostsOfCurrentUser :", allPostsForUser);
    return allPostsForUser;
  } catch (error) {
    console.log("Error in handleGetSavedPostsOfCurrentUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get all  saved posts of current user", 500);
  }
};

export const handleGetParticularPost = async (
  id: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleGetParticularPost reached");
    if (!id) {
      throw new ErrorInApplication(" ID is required to get all posts", 400);
    }
    const allPostsForUser  = await dbPostRepository.getParticularPostsForCurrentUser(id);
    console.log("All posts from handleGetParticularPost :", allPostsForUser);
    return allPostsForUser;
  } catch (error) {
    console.log("Error in handleGetParticularPost");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get all  posts of current user", 500);
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


export const handleSavePosts = async (
  userId: string,
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleSavePosts reached");
    if (!postId) {
      throw new ErrorInApplication("Post ID and user id is required to save post", 400);
    }
    const savePostsForUser  = await dbPostRepository.savePostsForUser(userId, postId);
    console.log("All posts from savePostsForUser :", savePostsForUser);
    return savePostsForUser;
  } catch (error) {
    console.log("Error in savePostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to save posts", 500);
  }
};


export const handleRemoveSavePosts = async (
  userId: string,
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleRemoveSavePosts reached");
    if (!postId) {
      throw new ErrorInApplication("Post ID and user id is required to save post", 400);
    }
    const removeSavePostsForUser  = await dbPostRepository.removeSavePostsForUser(userId, postId);
    console.log("All posts from removeSavePostsForUser :", removeSavePostsForUser);
    return removeSavePostsForUser;
  } catch (error) {
    console.log("Error in removeSavePostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to remove saved post", 500);
  }
};

export const handleLikePosts = async (
  userId: string,
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleSavePosts reached");
    if (!postId) {
      throw new ErrorInApplication("Post ID and user id is required to like post", 400);
    }
    const handleLikePostsForUser  = await dbPostRepository.likePostsForUser(userId, postId);
    console.log("All posts from handleLikePostsForUser :", handleLikePostsForUser);
    return handleLikePostsForUser;
  } catch (error) {
    console.log("Error in handleLikePosts");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to like posts", 500);
  }
};

export const handleDislikePosts = async (
  userId: string,
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleDislikePosts reached");
    if (!postId) {
      throw new ErrorInApplication("Post ID and user id is required to dislike post", 400);
    }
    const handleDislikePostsForUser  = await dbPostRepository.dislikePostsForUser(userId, postId);
    console.log("All posts from handleDislikePostsForUser :", handleDislikePostsForUser);
    return handleDislikePostsForUser;
  } catch (error) {
    console.log("Error in handleDislikePostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to dislike posts", 500);
  }
};

export const handleGetLikedPosts = async (
  userId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleGetLikedPosts reached");
   
    const handleGetLikedPosts  = await dbPostRepository.getLikedPosts(userId);
    console.log("All posts from handleGetLikedPosts :", handleGetLikedPosts);
    return handleGetLikedPosts;
  } catch (error) {
    console.log("Error in handleGetLikedPosts");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get liked posts", 500);
  }
};

export const handleGetDislikedPosts = async (
  userId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleGetDislikedPosts reached");
   
    const handleGetDislikedPosts  = await dbPostRepository.getDislikedPosts(userId);
    console.log("All posts from handleGetDislikedPosts :", handleGetDislikedPosts);
    return handleGetDislikedPosts;
  } catch (error) {
    console.log("Error in handleGetDislikedPosts");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get liked posts", 500);
  }
};

export const handleGetlikesdislikesinfo = async (
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleGetlikesdislikesinfo reached");
   
    const handleGetlikesdislikesinfo  = await dbPostRepository.getlikesdislikesInfo(postId);
    console.log("All posts from handleGetlikesdislikesinfo :", handleGetlikesdislikesinfo);
    return handleGetlikesdislikesinfo;
  } catch (error) {
    console.log("Error in handleGetlikesdislikesinfo");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get liked posts", 500);
  }
};

export const handleDeltePosts = async (
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    console.log("handleDeltePosts reached");
   
    const handleDeltePostsForUser  = await dbPostRepository.deltePostForUser(postId);
    console.log("All posts from handleDeltePostsForUser :", handleGetlikesdislikesinfo);
    return handleDeltePostsForUser;
  } catch (error) {
    console.log("Error in handleDeltePostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get delete posts", 500);
  }
};
