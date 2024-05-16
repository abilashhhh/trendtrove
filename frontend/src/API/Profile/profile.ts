import axiosUserInstance from "../Axios/axiosUserInstance";
import END_POINTS from "../../Constants/endpoints";

import {GetUserInfoResponse} from '../../Types/userProfile'

export const getUserInfo = async() : Promise<GetUserInfoResponse> => {
    const response = await axiosUserInstance.get<GetUserInfoResponse>(END_POINTS.GET_USER_INFO) 

    return response.data
}