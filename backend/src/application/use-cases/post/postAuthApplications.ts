import { Comment, CommentInterface, ReplyInterface } from "../../../types/commentInterface";
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
    // console.log("Post data in handleCreatePost :", postData);

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

    // // console.log("User exists....");
    const newPost = await dbPostRepository.addNewPost(newPostData);
    // await dbPostRepository.taggedDataFromPosts(postData.mentions , newPost._id)
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
    // console.log("Post data in handleupdatepost:", postData);

    if (!postData.userId) {
      throw new ErrorInApplication("User ID is required to update a post", 400);
    }

    if (!postData.postId) {
      throw new ErrorInApplication("post ID is required to update a post", 400);
    }
    await dbPostRepository.taggedDataFromPosts(
      postData.mentions,
      postData.postId
    );
    // console.log("User exists....");
    const newPost = await dbPostRepository.updatePost(postData);
    // console.log("updated post data:", newPost);
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
    // console.log("handleGetPostsForUser reached");
    if (!id) {
      throw new ErrorInApplication("User ID is required to get all posts", 400);
    }
    const allPostsForUser = await dbPostRepository.getAllPostsForUser(id);
    const filteredPosts = allPostsForUser.filter(post => !post.isBlocked);
    // console.log("Filtered posts from handleGetPostsForUser :", filteredPosts);
    return filteredPosts;
  } catch (error) {
    // console.log("Error in handleGetPostsForUser");
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
    // console.log("handleGetPostsForUserUsername reached");
    if (!username) {
      throw new ErrorInApplication(
        "username is required to get all posts",
        400
      );
    }
    const allPostsForUser = await dbPostRepository.getAllPostsForUserUsername(
      username
    );
    const filteredPosts = allPostsForUser.filter(post => !post.isBlocked);
    // console.log("Filtered posts from handleGetPostsForUserUsername :", filteredPosts);
    return filteredPosts;
  } catch (error) {
    // console.log("Error in handleGetPostsForUserUsername");
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
    // console.log("handleGetLengthForUser reached");
    if (!username) {
      throw new ErrorInApplication("User ID is required to get all posts", 400);
    }
    const length = await dbPostRepository.lengthofPostsForUser(username);
    // console.log("All posts from handleGetPostsForuser :", length);
    return length;
  } catch (error) {
    // console.log("Error in handleGetLengthForUser");
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
    // console.log("handleGetPostsOfCurrentUser reached");
    if (!id) {
      throw new ErrorInApplication("ID is required to get all posts", 400);
    }
    const allPostsForUser = await dbPostRepository.getAllPostsForCurrentUser(
      id
    );
    // console.log("All posts from handleGetPostsOfCurrentUser :", allPostsForUser);
    return allPostsForUser;
  } catch (error) {
    // console.log("Error in handleGetPostsOfCurrentUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication(
      "Failed to get all  posts of current user",
      500
    );
  }
};

export const handleGetTaggedPostsOfCurrentUser = async (
  id: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    // console.log("handleGetSavedPostsOfCurrentUser reached");
    if (!id) {
      throw new ErrorInApplication("ID is required to get all posts", 400);
    }
    const allPostsForUser =
      await dbPostRepository.getAllTaggedPostsForCurrentUser(id);
    // console.log("All posts from handleGetSavedPostsOfCurrentUser :", allPostsForUser);
    return allPostsForUser;
  } catch (error) {
    // console.log("Error in handleGetSavedPostsOfCurrentUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication(
      "Failed to get all  saved posts of current user",
      500
    );
  }
};

export const handleGetSavedPostsOfCurrentUser = async (
  id: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    // console.log("handleGetSavedPostsOfCurrentUser reached");
    if (!id) {
      throw new ErrorInApplication("ID is required to get all posts", 400);
    }
    const allPostsForUser =
      await dbPostRepository.getAllSavedPostsForCurrentUser(id);
    // console.log("All posts from handleGetSavedPostsOfCurrentUser :", allPostsForUser);
    return allPostsForUser;
  } catch (error) {
    // console.log("Error in handleGetSavedPostsOfCurrentUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication(
      "Failed to get all  saved posts of current user",
      500
    );
  }
};

export const handleGetParticularPost = async (
  id: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    // console.log("handleGetParticularPost reached");
    if (!id) {
      throw new ErrorInApplication(" ID is required to get all posts", 400);
    }
    const allPostsForUser =
      await dbPostRepository.getParticularPostsForCurrentUser(id);
    // console.log("All posts from handleGetParticularPost :", allPostsForUser);
    return allPostsForUser;
  } catch (error) {
    // console.log("Error in handleGetParticularPost");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication(
      "Failed to get all  posts of current user",
      500
    );
  }
};

export const handleReportPosts = async (
  data: ReportPost,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    // console.log("handleReportPosts reached");
    if (!data.postId) {
      throw new ErrorInApplication("Post ID is required to report post", 400);
    }
    // console.log("report post data: ", data)
    const reportPostsForUser = await dbPostRepository.reportPostsForUser(data);
    // console.log("All posts from reportPostsForUser :", reportPostsForUser);
    return reportPostsForUser;
  } catch (error) {
    // console.log("Error in handleGetPostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to report post", 500);
  }
};

export const handleSavePosts = async (
  userId: string,
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    // console.log("handleSavePosts reached");
    if (!postId) {
      throw new ErrorInApplication(
        "Post ID and user id is required to save post",
        400
      );
    }
    const savePostsForUser = await dbPostRepository.savePostsForUser(
      userId,
      postId
    );
    // console.log("All posts from savePostsForUser :", savePostsForUser);
    return savePostsForUser;
  } catch (error) {
    // console.log("Error in savePostsForUser");
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
    // console.log("handleRemoveSavePosts reached");
    if (!postId) {
      throw new ErrorInApplication(
        "Post ID and user id is required to save post",
        400
      );
    }
    const removeSavePostsForUser =
      await dbPostRepository.removeSavePostsForUser(userId, postId);
    // console.log("All posts from removeSavePostsForUser :", removeSavePostsForUser);
    return removeSavePostsForUser;
  } catch (error) {
    // console.log("Error in removeSavePostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to remove saved post", 500);
  }
};

export const handleRemoveTaggedPosts = async (
  userId: string,
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    // console.log("handleRemoveSavePosts reached");
    if (!postId) {
      throw new ErrorInApplication(
        "Post ID and user id is required to save post",
        400
      );
    }
    const removeTaggedPostsForUser =
      await dbPostRepository.removeTaggedPostsForUser(userId, postId);

    return removeTaggedPostsForUser;
  } catch (error) {
    // console.log("Error in removeTaggedPostsForUser");
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
    // console.log("handleSavePosts reached");
    if (!postId) {
      throw new ErrorInApplication(
        "Post ID and user id is required to like post",
        400
      );
    }
    const handleLikePostsForUser = await dbPostRepository.likePostsForUser(
      userId,
      postId
    );
    // console.log("All posts from handleLikePostsForUser :", handleLikePostsForUser);
    return handleLikePostsForUser;
  } catch (error) {
    // console.log("Error in handleLikePosts");
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
    // console.log("handleDislikePosts reached");
    if (!postId) {
      throw new ErrorInApplication(
        "Post ID and user id is required to dislike post",
        400
      );
    }
    const handleDislikePostsForUser =
      await dbPostRepository.dislikePostsForUser(userId, postId);
    // console.log("All posts from handleDislikePostsForUser :", handleDislikePostsForUser);
    return handleDislikePostsForUser;
  } catch (error) {
    // console.log("Error in handleDislikePostsForUser");
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
    // console.log("handleGetLikedPosts reached");

    const handleGetLikedPosts = await dbPostRepository.getLikedPosts(userId);
    // console.log("All posts from handleGetLikedPosts :", handleGetLikedPosts);
    return handleGetLikedPosts;
  } catch (error) {
    // console.log("Error in handleGetLikedPosts");
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
    // console.log("handleGetDislikedPosts reached");

    const handleGetDislikedPosts = await dbPostRepository.getDislikedPosts(
      userId
    );
    // console.log("All posts from handleGetDislikedPosts :", handleGetDislikedPosts);
    return handleGetDislikedPosts;
  } catch (error) {
    // console.log("Error in handleGetDislikedPosts");
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
    // console.log("handleGetlikesdislikesinfo reached");

    const handleGetlikesdislikesinfo =
      await dbPostRepository.getlikesdislikesInfo(postId);
    // console.log("All posts from handleGetlikesdislikesinfo :", handleGetlikesdislikesinfo);
    return handleGetlikesdislikesinfo;
  } catch (error) {
    // console.log("Error in handleGetlikesdislikesinfo");
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
    // console.log("handleDeltePosts reached");

    const handleDeltePostsForUser = await dbPostRepository.deltePostForUser(
      postId
    );
    // console.log("All posts from handleDeltePostsForUser :", handleGetlikesdislikesinfo);
    return handleDeltePostsForUser;
  } catch (error) {
    // console.log("Error in handleDeltePostsForUser");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get delete posts", 500);
  }
};

export const handleCreateComment = async (
  commentData: CommentInterface,
  dbPostRepository: ReturnType<PostDBInterface>,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    // console.log("Post data in handleCreateComment :", postData);

    if (!commentData.userId) {
      throw new ErrorInApplication("User ID is required to create a post", 400);
    }
    if (!commentData.postId) {
      throw new ErrorInApplication(
        "Post ID is required to create a comment",
        400
      );
    }

    const userData = await dbUserRepository.getUserById(commentData.userId);
    if (!userData) {
      throw new ErrorInApplication("User not found", 404);
    }

    const newComment = await dbPostRepository.addNewComment(commentData);
    return newComment;
  } catch (error) {
    console.error("Error in handleCreateComment:", error);
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to create comment", 500);
  }
};
export const handleReplyToComment = async (
  replyData: ReplyInterface,
  dbPostRepository: ReturnType<PostDBInterface>,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    // console.log("Post data in handleReplyToComment:", replyData);

    // Validate required fields
    if (!replyData.userId) {
      throw new ErrorInApplication("User ID is required to create a reply", 400);
    }
    if (!replyData.postId) {
      throw new ErrorInApplication("Post ID is required to create a reply", 400);
    }
    if (!replyData.commentId) {
      throw new ErrorInApplication("Comment ID is required to create a reply", 400);
    }

    // Get user data from the repository
    const userData = await dbUserRepository.getUserById(replyData.userId);
    if (!userData) {
      throw new ErrorInApplication("User not found", 404);
    }
    console.log("Post data in handleReplyToComment:", replyData);

    // Add the new reply to the post
    const newReplyAdded = await dbPostRepository.addNewReply(replyData);
    return newReplyAdded;
  } catch (error) {
    console.error("Error in handleReplyToComment:", error);

    // Re-throw custom application errors
    if (error instanceof ErrorInApplication) {
      throw error;
    }

    // Throw a generic error for unexpected cases
    throw new ErrorInApplication("Failed to create reply", 500);
  }
};
export const handleGetAllComments = async (
  postId: String,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    // console.log("handleGetAllComments reached");
    const handleGetAllComments = await dbPostRepository.getAllComments(postId);
    // console.log("All posts from handleGetAllComments :", handleGetAllComments);
    return handleGetAllComments;
  } catch (error) {
    // console.log("Error in handleGetAllComments");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get all comments", 500);
  }
};




export const handleDelteComment = async (
  commentId: string,
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    // console.log("handleDelteComment reached");

    const handleDelteComment = await dbPostRepository.deleteComment(
      commentId
    );
    return handleDelteComment;
  } catch (error) {
    // console.log("Error in handleDelteComment");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to delete posts", 500);
  }
};

export const handleEditComments = async (
  commentId: string, 
  updatedText: string, 
  dbPostRepository: ReturnType<PostDBInterface>
) => {
  try {
    // console.log("handleEditComments reached");

    const handleEditComments = await dbPostRepository.editComment(
      commentId, updatedText
    );
    return handleEditComments;
  } catch (error) {
    // console.log("Error in handleEditComments");
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to delete posts", 500);
  }
};
