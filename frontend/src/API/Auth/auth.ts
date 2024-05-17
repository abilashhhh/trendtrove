import END_POINTS from "../../Constants/endpoints";
import axios from 'axios';
import { AxiosError } from 'axios';

import {
  EmailAvailabilityResponse,
  SignUpUserInterface,
  SignupUserResponse,
  UsernameAvailabilityResponse,
} from "../../Types/signUpUser";


import { LogoutResponse, SignInUserInterface, SignInUserResponse } from "../../Types/signInUser";
import axiosUserInstance, { axiosRefreshInstance } from "../Axios/axiosUserInstance";

export const signUpUser = async (payload: SignUpUserInterface): Promise<SignupUserResponse> => {
  try {
    const response = await axios.post<SignupUserResponse>(END_POINTS.SIGNUP_USER, payload);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const usernameAvailability = async (username: string): Promise<UsernameAvailabilityResponse> => {
  try {
    console.log("usernameAvailability:", username);
    const response = await axios.get<UsernameAvailabilityResponse>(`${END_POINTS.USERNAME_AVAILABLE}/${username}`);
    console.log("Username availability from auth.ts", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const emailAvailability = async (email: string): Promise<UsernameAvailabilityResponse> => {
  try {
    console.log("emailAvailability:", email);
    const response = await axios.get<EmailAvailabilityResponse>(`${END_POINTS.EMAIL_AVAILABLE}/${email}`);
    console.log("email availability from auth.ts", response.data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
1


export const generateOtp = async (email: string, text : string): Promise<void> => {
  try {
    await axios.post(END_POINTS.GENERATE_OTP, { email , text });
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};



export const verifyOtp = async (email: string, otp: string): Promise<any> => {
  try {
    const resultOfVerifyOTP = await axios.post(END_POINTS.VERIFY_OTP, { email, otp });
    return resultOfVerifyOTP
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};


export const signin = async( payload : SignInUserInterface) : Promise<SignInUserResponse> => {
  try {
    const response = await axios.post(END_POINTS.LOGIN_USER, payload);
    return response.data
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }} 


  export const logoutUser = async() : Promise<LogoutResponse> => {
    const response = await axiosUserInstance.delete<LogoutResponse>(END_POINTS.LOGOUT_USER)
    return response.data
  }
 

  export const refreshAccessToken = async (): Promise<{
    accessToken: string;
  }> => {
    const response = await axiosRefreshInstance.get<{ accessToken: string }>(
      END_POINTS.REFRESH_TOKEN,
      { withCredentials: true }
    );
    return response.data;
  };


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Server responded with status:', axiosError.response.status);
      console.error('Response data:', axiosError.response.data);
    } else if (axiosError.request) {
      console.error('No response received from the server');
    } else {
      console.error('Error setting up the request:', axiosError.message);
    }
  } else {
    console.error('An error occurred:', error.message);
  }
};
