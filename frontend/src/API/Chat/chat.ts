import axiosUserInstance from "../Axios/axiosUserInstance";
import axios, { AxiosError } from "axios";
import END_POINTS from "../../Constants/endpoints";
import { GetMessageInterface, GetUserInfoResponse, sendMessageInterface } from "../../Types/userProfile";

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

//getting mutual friends here
export const getFriendsUserInfo = async (): Promise<GetUserInfoResponse> => {
  try {
    const response = await axiosUserInstance.get<GetUserInfoResponse>(
      END_POINTS.GET_FRIENDS_INFO
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const sendMessageToUser = async (receiverId: string, message: string): Promise<sendMessageInterface> => {
  try {
    const response = await axiosUserInstance.post<sendMessageInterface>(
      `${END_POINTS.SEND_MESSAGES.replace(":receiverId", receiverId)}`,
      { message }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getMessagesFromUser = async (receiverId: string): Promise<GetMessageInterface> => {
  try {
    const response = await axiosUserInstance.get<GetMessageInterface>(
      `${END_POINTS.GET_MESSAGES.replace(":receiverId", receiverId)}`
    );
    console.log("response of getessages" , response.data.data)
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
