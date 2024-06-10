import axiosUserInstance from "../Axios/axiosUserInstance";
import axios, { AxiosError } from "axios";
import END_POINTS from "../../Constants/endpoints";
import {
  ChangePasswordInterface,
  ChangePasswordResponse,
  DeleteAccountResponse,
  EditProfileResponse,
  GetUserInfoResponse,
  PremiuumAccountResponse,
  SuspendAccountResponse,
  UserInfo,
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

export const getUserInfo = async (
 
): Promise<GetUserInfoResponse> => {
  try {
    // console.log("Userid: ", userId);
    const response = await axiosUserInstance.get<GetUserInfoResponse>(
    END_POINTS.GET_USER_INFO
    );
    // console.log("response :", response);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

 

export const editProfile = async (
  userInfo: UserInfo
): Promise<EditProfileResponse> => {
  try {
    // console.log("edit profile api, userInfo:", userInfo);
    const response = await axiosUserInstance.patch<EditProfileResponse>(
      END_POINTS.EDIT_PROFILE,
      userInfo
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const changePassword = async (
  payload: ChangePasswordInterface
): Promise<ChangePasswordResponse> => {
  try {
    // console.log("changePassword, userInfo:", payload);
    const response = await axiosUserInstance.patch<ChangePasswordResponse>(
      END_POINTS.CHANGE_PASSWORD,
      payload
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const deleteAccount = async (
  userId: string,
  password: string
): Promise<DeleteAccountResponse> => {
  try {
    // console.log(userId, password, "from deklete acc");
    const response = await axiosUserInstance.delete<DeleteAccountResponse>(
      `${END_POINTS.DELETE_ACCOUNT.replace(":userId", userId).replace(
        ":password",
        password
      )}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const suspendAccount = async (
  userId: string,
  password: string
): Promise<SuspendAccountResponse> => {
  try {
    // console.log(userId, password, "from susp acc");

    const response = await axiosUserInstance.patch<SuspendAccountResponse>(
      `${END_POINTS.SUSPEND_ACCOUNT.replace(":userId", userId).replace(
        ":password",
        password
      )}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const privateAccount = async (
  userId: string,
  password: string
): Promise<SuspendAccountResponse> => {
  try {
    // console.log(userId, password, "from private acc");

    const response = await axiosUserInstance.patch<SuspendAccountResponse>(
      `${END_POINTS.PRIVATE_ACCOUNT.replace(":userId", userId).replace(
        ":password",
        password
      )}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const premiumAccount = async (
  userId: string,
  password: string
): Promise<PremiuumAccountResponse> => {
  try {
    // console.log(userId, password, "from private acc");

    const response = await axiosUserInstance.patch<SuspendAccountResponse>(
      `${END_POINTS.PREMIUM_ACCOUNT.replace(":userId", userId).replace(
        ":password",
        password
      )}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
