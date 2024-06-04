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
  GET_USER_INFO2: "/api/profile/getuserinfo2",
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
  UPDATE_POST :'api/post/updatepost',
  GET_POSTS_FOR_USER:'api/post/getpostforuser',
  GET_POSTS_FOR_USER_USERNAME:'api/post/getpostforuserusername',
  GET_POSTS_LENGTH_OF_USER:'api/post/getpostlengthofuser',
  GET_POSTS_OF_CURRENT_USER:'api/post/getpostofcurrentuser',
  GET_SAVED_POSTS_OF_CURRENT_USER:'api/post/getsavedpostofcurrentuser',
  GET_PARTICULAR_POSTS_OF_CURRENT_USER:'api/post/getparticularpost',
  REPORT_POST : '/api/post/reportpost',
  SAVE_POST : '/api/post/savepost',
  REMOVE_SAVE_POST : '/api/post/removesavepost',
  LIKE_POST : '/api/post/likepost',
  DISLIKE_POST : '/api/post/dislikepost',
  DELETE_POST : '/api/post/deletepost/:postId',
  GET_LIKED_POSTS : '/api/post/getlikedposts/:userId',
  GET_DISLIKED_POSTS : '/api/post/getdislikedposts/:userId',
  GET_LIKES_DISLIKES_INFO : '/api/post/getlikesdislikesinfo/:postId',

  ADMIN_LOGOUT: 'api/admin/logout',
  REFRESH_ADMIN_TOKEN: 'api/admin/refresh',
  GET_USERS: 'api/admin/getusersforadmin',
  BLOCK_USER: 'api/admin/blockuser/:userId',
  UNBLOCK_USER: 'api/admin/unblockuser/:userId',
  BLOCK_POST: 'api/admin/blockpost/:postId',
  UNBLOCK_POST: 'api/admin/unblockpost/:postId',
  GET_POST_REPORTS: 'api/admin/getallpostreportsandposts',

  
};

export default END_POINTS;




