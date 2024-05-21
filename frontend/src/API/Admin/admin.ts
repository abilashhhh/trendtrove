import axiosAdminInstance, {
  axiosAdminRefreshInstance,
} from "../Axios/axiosAdminInstance";
import END_POINTS from "../../Constants/endpoints";
import {
  AdminLoginInterface,
  AdminLoginResponse,
  BlockUserResponse,
  GetUsersResponse,
} from "../../Types/admin";
import { GetRestOfUsersResponse } from "../../Types/userProfile";
import axios, { AxiosError } from "axios";

export const adminLogin = async (
  payload: AdminLoginInterface
): Promise<AdminLoginResponse> => {
  const response = await axiosAdminRefreshInstance.post<AdminLoginResponse>(
    END_POINTS.ADMIN_LOGIN,
    payload
  );
  return response.data;
};

export const refreshAdminAccessToken = async (): Promise<{
  accessToken: string;
}> => {
  const response = await axiosAdminRefreshInstance.get<{ accessToken: string }>(
    END_POINTS.REFRESH_ADMIN_TOKEN,
    { withCredentials: true }
  );
  return response.data;
};
 


export const logoutAdmin = async (accessToken: string) => {
  await axiosAdminInstance.post(END_POINTS.ADMIN_LOGOUT, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

 
export const getAllUsersForAdmin = async (): Promise<GetUsersResponse> => {
  try {
    console.log("called getallusersadmin")
    const response = await axiosAdminInstance.get<GetUsersResponse>(END_POINTS.GET_USERS);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
 
 
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



export const blockUser = async (
  userId: string,
  password: string
): Promise<BlockUserResponse> => {
  try {
    console.log(userId, password, "from blockuser acc");

    const response = await axiosAdminInstance.patch<BlockUserResponse>(
      `${END_POINTS.BLOCK_USER.replace(":userId", userId)}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};


export const unblockUser = async (
  userId: string,
  password: string
): Promise<BlockUserResponse> => {
  try {
    console.log(userId, password, "from unblockuser acc");

    const response = await axiosAdminInstance.patch<BlockUserResponse>(
      `${END_POINTS.UNBLOCK_USER.replace(":userId", userId)}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
