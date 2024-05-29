import axiosUserInstance from "../Axios/axiosUserInstance";
import axios, { AxiosError } from "axios";
import END_POINTS from "../../Constants/endpoints";
import { GetAllPostsForUser, Post, PostResponse } from "../../Types/Post";

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
    console.log("Upload post function, payload: ", payload);
    const response = await axiosUserInstance.post<PostResponse>(
      END_POINTS.ADD_POST,
      payload
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};


export const getAllPostsForUser = async (
  id: string
): Promise<GetAllPostsForUser> => {
  try {
    const response = await axiosUserInstance.get<GetAllPostsForUser>(
      `${END_POINTS.GET_POSTS_FOR_USER}/${id}`
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
