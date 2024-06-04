import axiosUserInstance from "../Axios/axiosUserInstance";
import axios, { AxiosError } from "axios";
import END_POINTS from "../../Constants/endpoints";
import {
  DeletePostResponse,
  DislikePostResponse,
  GetAllPostsForUser,
  GetAllPostsOfCurrentUser,
  GetDislikedPostsResponse,
  GetLikedPostsResponse,
  GetLikesDislikesInfoResponse,
  LikePostResponse,
  Post,
  PostResponse,
  ReportPostData,
  ReportPostResponse,
  SavePostResponse,
} from "../../Types/Post";

// Utility function for handling Axios errors
const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(
        "Server responded with status:",
        axiosError.response.status
      );
      console.error("Response data:", axiosError.response.data);
    } else if (axiosError.request) {
      console.error("No response received from the server");
    } else {
      console.error("Error setting up the request:", axiosError.message);
    }
  } else {
    console.error("An error occurred:", error.message);
  }
};

export const uploadPost = async (
  payload: Partial<Post>
): Promise<PostResponse> => {
  try {
    // console.log("Upload post function, payload: ", payload);
    const response = await axiosUserInstance.post<PostResponse>(
      END_POINTS.ADD_POST,
      payload
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const updatePost = async (
  payload: Partial<Post>
): Promise<PostResponse> => {
  try {
    // console.log("Update post function, payload: ", payload);
    const response = await axiosUserInstance.post<PostResponse>(
      END_POINTS.UPDATE_POST,
      payload
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getAllPostsForUser = async (): Promise<GetAllPostsForUser> => {
  try {
    const response = await axiosUserInstance.get<GetAllPostsForUser>(
      `${END_POINTS.GET_POSTS_FOR_USER}`
    );
    // console.log("respose: ", response.data?.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const fetchAllPostsForUserUsingUsername = async (
  username: string
): Promise<GetAllPostsForUser> => {
  try {
    const response = await axiosUserInstance.get<GetAllPostsForUser>(
      `${END_POINTS.GET_POSTS_FOR_USER_USERNAME}/${username}`
    );
    // console.log("respose: ", response.data?.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const fetchPostsOfTheCurrentUser = async (
 
): Promise<GetAllPostsOfCurrentUser> => {
  try {
    const response = await axiosUserInstance.get<GetAllPostsOfCurrentUser>(
      END_POINTS.GET_POSTS_OF_CURRENT_USER
    );
    // console.log("fetchPostsOfTheCurrentUser respose: ", response.data?.data);
    return response.data?.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const fetchSavedPostsOfTheCurrentUser = async (): Promise<GetAllPostsOfCurrentUser> => {
  try {
    const response = await axiosUserInstance.get<GetAllPostsOfCurrentUser>(
      END_POINTS.GET_SAVED_POSTS_OF_CURRENT_USER
    );
    // console.log("fetchSavedPostsOfTheCurrentUser respose: ",response.data?.data);
    return response.data?.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getThePostDataOfParticularPost = async (
  id: string
): Promise<GetAllPostsOfCurrentUser> => {
  try {
    const response = await axiosUserInstance.get<GetAllPostsOfCurrentUser>(
      `${END_POINTS.GET_PARTICULAR_POSTS_OF_CURRENT_USER}/${id}`
    );
    // console.log("getThePostDataOfParticularPost respose: ", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getPostsLengthOfTheUser = async (
  username: string
): Promise<GetAllPostsOfCurrentUser> => {
  try {
    const response = await axiosUserInstance.get<GetAllPostsOfCurrentUser>(
      `${END_POINTS.GET_POSTS_LENGTH_OF_USER}/${username}`
    );
    // console.log("getPostsLengthOfTheUser respose: ", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const reportPost = async (
  data: ReportPostData
): Promise<ReportPostResponse> => {
  try {
    // console.log("Report post api, data: ", data);
    const response = await axiosUserInstance.post<ReportPostResponse>(
      `${END_POINTS.REPORT_POST}`,
      data
    );
    // console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const savePost = async (
  userId: string,
  postId: string
): Promise<SavePostResponse> => {
  try {
    // console.log("savePost post api, userId: ", userId);
    // console.log("savePost post api, postId: ", postId);
    const response = await axiosUserInstance.post<SavePostResponse>(
      `${END_POINTS.SAVE_POST}`,
      {
        userId,
        postId,
      }
    );
    // console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

// correct this
export const removeSavedPostForUser = async (
  userId: string,
  postId: string
): Promise<SavePostResponse> => {
  try {
    // console.log("removeSavedPostForUser post api, userId: ", userId);
    // console.log("saveremoveSavedPostForUserPost post api, postId: ", postId);
    const response = await axiosUserInstance.post<SavePostResponse>(
      `${END_POINTS.REMOVE_SAVE_POST}`,
      {
        userId,
        postId,
      }
    );
    // console.log("response: ", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const deletePostForUser = async (
  postId: string
): Promise<DeletePostResponse> => {
  try {
    // console.log("deletePostForUser post API, postId:", postId);
    const response = await axiosUserInstance.delete<DeletePostResponse>(
      `${END_POINTS.DELETE_POST.replace(":postId", postId)}`
    );
    // console.log("response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const likePost = async (
  userId: string,
  postId: string
): Promise<LikePostResponse> => {
  try {
    // console.log("likePost post api, userId: ", userId);
    // console.log("likePost post api, postId: ", postId);
    const response = await axiosUserInstance.post<LikePostResponse>(
      `${END_POINTS.LIKE_POST}`,
      {
        userId,
        postId,
      }
    );
    // console.log(" likePost response: ", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const dislikePost = async (
  userId: string,
  postId: string
): Promise<DislikePostResponse> => {
  try {
    // console.log("dislikePost post api, userId: ", userId);
    // console.log("dislikePost post api, postId: ", postId);
    const response = await axiosUserInstance.post<DislikePostResponse>(
      `${END_POINTS.DISLIKE_POST}`,
      {
        userId,
        postId,
      }
    );
    // console.log(" dislikePost response: ", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getLikedPosts = async (userId: string) => {
  try {
    // console.log("getLikedPosts , userid: ", userId);

    const response = await axiosUserInstance.get<GetLikedPostsResponse>(
      `${END_POINTS.GET_LIKED_POSTS.replace(":userId", userId)}`
    );
    // console.log("getLikedPosts response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getDislikedPosts = async (userId: string) => {
  try {
    // console.log("getDislikedPosts , userid: ", userId);
    const response = await axiosUserInstance.get<GetDislikedPostsResponse>(
      `${END_POINTS.GET_DISLIKED_POSTS.replace(":userId", userId)}`
    );
    // console.log("getDislikedPosts response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getPostLikesAndDislikesInfo = async (postId: string) => {
  try {
    // console.log("getDislikedPosts , postId: ", postId);
    const response = await axiosUserInstance.get<GetLikesDislikesInfoResponse>(
      `${END_POINTS.GET_LIKES_DISLIKES_INFO.replace(":postId", postId)}`
    );
    // console.log("getPostLikesAndDislikesInfo response:", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
