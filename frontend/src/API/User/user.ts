import axios, { AxiosError } from "axios";
import axiosUserInstance from "../Axios/axiosUserInstance";
import END_POINTS from "../../Constants/endpoints";

import {
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
  userId: string,
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
