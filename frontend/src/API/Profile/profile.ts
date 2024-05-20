import axiosUserInstance from "../Axios/axiosUserInstance";
import END_POINTS from "../../Constants/endpoints";
import { GetUserInfoResponse } from '../../Types/userProfile';

export const getUserInfo = async (userId: string): Promise<GetUserInfoResponse> => {
  console.log("Userid: ", userId)
  const response = await axiosUserInstance.get<GetUserInfoResponse>(`${END_POINTS.GET_USER_INFO}/${userId}`);
  console.log("response :" , response)
  return response.data;
};
