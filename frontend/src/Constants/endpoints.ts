const END_POINTS = {

  LOGIN: "/api/auth/signin",
  GOOGLE_LOGIN_SIGNUP_USER: "/api/auth/googlesigninup",
  SIGNUP_USER: "/api/auth/signup",
  LOGOUT_USER: "/api/auth/logout",
  USERNAME_AVAILABLE: "/api/auth/usernameavailablity",
  EMAIL_AVAILABLE: "/api/auth/emailavailability",
  GENERATE_OTP: "/api/auth/generateotp",
  VERIFY_OTP: "/api/auth/verifyotp",
  REFRESH_TOKEN: "/api/auth/refreshtoken",
  FORGOT_PASSWORD: 'api/auth/forgotpassword',
  FORGOT_PASSWORD_CHANGE: 'api/auth/forgotpasswordchange',
  
  GET_USER_INFO: "/api/profile/getuserinfo",
  EDIT_PROFILE: "/api/profile/editprofile",
  UPLOAD_PROFILE_PHOTO: "/api/profile/dp",
  CHANGE_PASSWORD: "/api/profile/changepassword",
  DELETE_ACCOUNT: "/api/profile/deleteaccount/:userId/:password",
  SUSPEND_ACCOUNT: "/api/profile/suspendaccount/:userId/:password",
  PRIVATE_ACCOUNT: "/api/profile/privateaccount/:userId/:password",
  UPLOAD_COVER: 'api/profile/uploadcover',
  UPLOAD_DP: 'api/profile/uploaddp',

  GET_ALL_USERS : '/api/user/getallusers/:userId',
  GET_USER_PROFILE : '/api/user/getuserprofile/:username',
  FOLLOW_REQUEST: 'api/user/followuser',
  UNFOLLOW_REQUEST: 'api/user/unfollowuser',
  CANCEL_FOLLOW_REQ_FOR_PVT_ACC :'api/user/cancelrequest',
  ACCEPT_FOLLOW_REQ_FOR_PVT_ACC :'api/user/acceptrequest',
  REJECT_FOLLOW_REQ_FOR_PVT_ACC :'api/user/rejectrequest',
  
  ADD_POST :'api/post/addpost',
  GET_POSTS_FOR_USER:'api/post/getpostforuser',
  GET_POSTS_OF_CURRENT_USER:'api/post/getpostofcurrentuser',
  REPORT_POST : '/api/post/reportpost',
  SAVE_POST : '/api/post/savepost',
  LIKE_POST : '/api/post/likepost',
  DISLIKE_POST : '/api/post/dislikepost',
  DELETE_POST : '/api/post/deletepost/:postId',
  GET_LIKED_POSTS : '/api/post/getlikedposts/:userId',
  GET_DISLIKED_POSTS : '/api/post/getdislikedposts/:userId',
  GET_LIKES_DISLIKES_INFO : '/api/post/getlikesdislikesinfo/:postId',

  // ADMIN_LOGIN: 'api/admin/signin',
  ADMIN_LOGOUT: 'api/admin/logout',
  REFRESH_ADMIN_TOKEN: 'api/admin/refresh',
  GET_USERS: 'api/admin/getusersforadmin',
  BLOCK_USER: 'api/admin/blockuser/:userId',
  UNBLOCK_USER: 'api/admin/unblockuser/:userId',
  
};

export default END_POINTS;




