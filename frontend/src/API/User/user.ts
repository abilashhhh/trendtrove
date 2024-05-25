import axios, { AxiosError } from "axios";
import axiosUserInstance from "../Axios/axiosUserInstance";
import END_POINTS from "../../Constants/endpoints";

import {
  FriendRequestSentResponse,
  GetRestOfUsersResponse,
} from "../../Types/userProfile";

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

export const getAllUsers = async (
  userId: string
): Promise<GetRestOfUsersResponse> => {
  try {
    console.log(userId, "from susp acc");

    const response = await axiosUserInstance.get<GetRestOfUsersResponse>(
      `${END_POINTS.GET_ALL_USERS.replace(":userId", userId)}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const sendFollowRequest = async (
  userId: string,
  targetUserId: string
): Promise<FriendRequestSentResponse> => {
  try {
    console.log("Current users id: ", userId);
    console.log("Target users id: ", targetUserId);
    const response = await axiosUserInstance.post<FriendRequestSentResponse>(
      `${END_POINTS.FOLLOW_REQUEST}`,
      { userId, targetUserId }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const sendUnfollowRequest = async (
  userId: string,
  targetUserId: string
): Promise<FriendRequestSentResponse> => {
  try {
    console.log("Current users id: ", userId);
    console.log("Target users id: ", targetUserId);
    const response = await axiosUserInstance.post<FriendRequestSentResponse>(
      `${END_POINTS.UNFOLLOW_REQUEST}`,
      { userId, targetUserId }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const sendCancelFollowRequest = async (
  userId: string,
  targetUserId: string
): Promise<FriendRequestSentResponse> => {
  try {
    console.log("Current users id: ", userId);
    console.log("Target users id: ", targetUserId);
    const response = await axiosUserInstance.post<FriendRequestSentResponse>(
      `${END_POINTS.CANCEL_FOLLOW_REQ_FOR_PVT_ACC}`,
      { userId, targetUserId }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const sendAcceptFollowRequest = async (
  userId: string,
  targetUserId: string
): Promise<FriendRequestSentResponse> => {
  try {
    console.log("Current users id: ", userId);
    console.log("Target users id: ", targetUserId);
    const response = await axiosUserInstance.post<FriendRequestSentResponse>(
      `${END_POINTS.ACCEPT_FOLLOW_REQ_FOR_PVT_ACC}`,
      { userId, targetUserId }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const sendRejectFollowRequest = async (
  userId: string,
  targetUserId: string
): Promise<FriendRequestSentResponse> => {
  try {
    console.log("Current users id: ", userId);
    console.log("Target users id: ", targetUserId);
    const response = await axiosUserInstance.post<FriendRequestSentResponse>(
      `${END_POINTS.REJECT_FOLLOW_REQ_FOR_PVT_ACC}`,
      { userId, targetUserId }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
