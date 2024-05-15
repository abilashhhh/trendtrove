import END_POINTS from "../../Constants/endpoints";
import axios from 'axios';
import { AxiosError } from 'axios';

import {
  SignUpUserInterface,
  SignupUserResponse,
  UsernameAvailabilityResponse,
} from "../../Types/signUpUser";

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
