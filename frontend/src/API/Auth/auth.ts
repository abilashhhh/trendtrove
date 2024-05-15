import END_POINTS from "../../Constants/endpoints";

import axiosUserInstance, { axiosRefreshInstance } from "../Axios/axiosUserInstance";

import {
  User,
  LoginUserInterface,
  LoginUserResponse,
  LogoutResponse,
  SendOtpResponse,
  VerifyOtpResponse,
  ResetPasswordResponse,
  GoogleLoginInterface,
  GoogleLoginResponse,
} from "../../Types/signInUser";

import {
  SignUpUserInterface,
  SignupUserResponse,
  UsernameAvailabilityResponse,
} from "../../Types/signUpUser";

import axios from 'axios';
import { AxiosError } from 'axios'


// export const signUpUser = async( payload: SignUpUserInterface) : Promise<SignupUserResponse> => {
//     const response = await axiosRefreshInstance.post<SignupUserResponse>(END_POINTS.SIGNUP_USER , payload);
//     return response.data
// }


export const signUpUser = async (payload: SignUpUserInterface): Promise<SignupUserResponse> => {
  try {
    const response = await axios.post<SignupUserResponse>(END_POINTS.SIGNUP_USER, payload);
    return response.data;
  } catch (error) {
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
    throw error; 
  }
};

