 
 

import axios from "axios"
import CONSTANTS, { TOAST } from "../../Constants/common"
import store from "../../Redux/Store/reduxStore"
import { setCredentials, logout } from "../../Redux/UserAuthSlice/authSlice"
import { toast } from "react-toastify"
import { logoutUser, refreshAccessToken } from "../Auth/auth"

// const axiosUserInstance = axios.create({
//   baseURL: CONSTANTS.API_BASE_URL,
//   withCredentials: true
// })

// export const axiosRefreshInstance = axios.create({
//   baseURL: CONSTANTS.API_BASE_URL,
//   withCredentials: true
// })

const axiosUserInstance = axios.create({
  baseURL: CONSTANTS.API_BASE_URL || 'http://localhost:3000',
  withCredentials: true, 
});

export const axiosRefreshInstance = axios.create({
  baseURL: CONSTANTS.API_BASE_URL || 'http://localhost:3000',
  withCredentials: true, 
});

axiosUserInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = store.getState().userAuth
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`
      console.log("Comtains access token")
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosUserInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      try {
        if (error.response.data.message === "Your account has been blocked!") {
          await logoutUser()
          toast.dismiss()
          toast.error("Your account has been blocked. Please contact admin.", TOAST)
          store.dispatch(logout())
        }
        const { accessToken } = await refreshAccessToken()
        store.dispatch(setCredentials({
          accessToken,
          user: null
        }))
        originalRequest.headers.authorization = `Bearer ${accessToken}`
        return axiosUserInstance(originalRequest)
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export default axiosUserInstance