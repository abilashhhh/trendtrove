import axiosUserInstance from "../Axios/axiosUserInstance";
import axios, { AxiosError } from "axios";
import END_POINTS from "../../Constants/endpoints";
import {
  ChangePasswordInterface,
  ChangePasswordResponse,
  DeleteAccountResponse,
  EditProfileResponse,
  GetUserInfoResponse,
  PasswordCheckResponse,
  PremiumAccountResponse,
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

export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  try {
    const response = await axiosUserInstance.get<GetUserInfoResponse>(
      END_POINTS.GET_USER_INFO
    );
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
    const response = await axiosUserInstance.patch<EditProfileResponse>(
      END_POINTS.EDIT_PROFILE,
      userInfo
    );
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
    const response = await axiosUserInstance.patch<ChangePasswordResponse>(
      END_POINTS.CHANGE_PASSWORD,
      payload
    );
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
    const response = await axiosUserInstance.delete<DeleteAccountResponse>(
      `${END_POINTS.DELETE_ACCOUNT.replace(":userId", userId).replace(
        ":password",
        password
      )}`
    );
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
    const response = await axiosUserInstance.patch<SuspendAccountResponse>(
      `${END_POINTS.SUSPEND_ACCOUNT.replace(":userId", userId).replace(
        ":password",
        password
      )}`
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const setPrivateAccount = async (
  userId: string,
  password: string
): Promise<SuspendAccountResponse> => {
  try {
    const response = await axiosUserInstance.patch<SuspendAccountResponse>(
      `${END_POINTS.PRIVATE_ACCOUNT.replace(":userId", userId).replace(
        ":password",
        password
      )}`
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const premiumAccount  = async (
  userId: string,
  paymentId: string
): Promise<PremiumAccountResponse> => {
  try {
    const response = await axiosUserInstance.post<PremiumAccountResponse>(
      END_POINTS.PREMIUM_ACCOUNT , { userId, paymentId }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const passwordCheck = async (
  userId: string,
  password: string
): Promise<PasswordCheckResponse> => {
  try {
    const response = await axiosUserInstance.get<PasswordCheckResponse>(
      `${END_POINTS.VERIFY_PASSWORD.replace(":userId", userId).replace(
        ":password",
        password
      )}`
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

 

export const makepayment = async (): Promise<PaymentResponse> => {
  try {
    const response = await axiosUserInstance.post<PaymentResponse>(
      END_POINTS.MAKE_PAYMENT
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
