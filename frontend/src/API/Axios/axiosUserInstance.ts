import axios from "axios"

import CONSTANTS,{TOAST} from "../../Constants/common"
import store from "../../Redux/Store/reduxStore"
import { setCredentials,logout } from "../../Redux/UserAuthSlice/authSlice"
import { toast } from "react-toastify"


const axiosUserInstance =  axios.create({
    baseURL : CONSTANTS.API_BASE_URL,
    withCredentials : true
});

export const axiosRefreshInstance = axios.create({
    baseURL : CONSTANTS.API_BASE_URL,
    withCredentials : true
})

export default axiosUserInstance;
