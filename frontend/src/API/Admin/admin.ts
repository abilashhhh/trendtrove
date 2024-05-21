import axiosAdminInstance, {
  axiosAdminRefreshInstance,
} from "../Axios/axiosAdminInstance";
import END_POINTS from "../../Constants/endpoints";
import {
  AdminLoginInterface,
  AdminLoginResponse,
  GetUsersResponse,
} from "../../Types/admin";

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

export const getAllUsers = async (): Promise<GetUsersResponse> => {
  const response = await axiosAdminInstance.get<GetUsersResponse>(
    `${END_POINTS.GET_USERS}`
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