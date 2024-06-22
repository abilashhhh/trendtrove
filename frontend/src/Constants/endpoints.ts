const END_POINTS = {

  // AUTH
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
  
  // USER PROFILE
  GET_USER_INFO: "/api/profile/getuserinfo",
  EDIT_PROFILE: "/api/profile/editprofile",
  UPLOAD_PROFILE_PHOTO: "/api/profile/dp",
  CHANGE_PASSWORD: "/api/profile/changepassword",
  CHANGE_PASSWORD2: "/api/profile/changepassword2",
  DELETE_ACCOUNT: "/api/profile/deleteaccount/:userId/:password",
  SUSPEND_ACCOUNT: "/api/profile/suspendaccount/:userId/:password",
  PRIVATE_ACCOUNT: "/api/profile/privateaccount/:userId/:password",
  PUBLIC_ACCOUNT: "/api/profile/publicaccount/:userId/:password",
  PREMIUM_ACCOUNT: "/api/profile/premiumaccount",
  GET_PREMIUM_USER_PROGRESS: "/api/profile/premiumaccountuserprogress",
  VERIFY_DOCS_PREMIUM: "/api/profile/toverifydocspremium",
  VERIFY_PASSWORD: "/api/profile/verifypassword/:userId/:password",
  MAKE_PAYMENT: "/api/profile/makepayment",
  UPLOAD_COVER: 'api/profile/uploadcover',
  UPLOAD_DP: 'api/profile/uploaddp',


  // USER
  GET_ALL_USERS : '/api/user/getallusers',
  GET_USER_PROFILE : '/api/user/getuserprofile/:username',
  FOLLOW_REQUEST: 'api/user/followuser',
  UNFOLLOW_REQUEST: 'api/user/unfollowuser',
  CANCEL_FOLLOW_REQ_FOR_PVT_ACC :'api/user/cancelrequest',
  ACCEPT_FOLLOW_REQ_FOR_PVT_ACC :'api/user/acceptrequest',
  REJECT_FOLLOW_REQ_FOR_PVT_ACC :'api/user/rejectrequest',
  BLOCK_USER_USER :'api/user/blockuserbyuser',
  UNBLOCK_USER_USER :'api/user/unblockuserbyuser',
  
  // POST
  ADD_POST :'api/post/addpost',
  UPDATE_POST :'api/post/updatepost',
  ADD_STORY :'api/post/addstory',
  GET_ALL_STORIES :'api/post/getstories',
  GET_POSTS_FOR_USER:'api/post/getpostforuser',
  GET_POSTS_FOR_USER_USERNAME:'api/post/getpostforuserusername',
  GET_POSTS_USING_POST_ID:'api/post/getpostusingpostId',
  GET_POSTS_LENGTH_OF_USER:'api/post/getpostlengthofuser',
  GET_POSTS_OF_CURRENT_USER:'api/post/getpostofcurrentuser',
  GET_SAVED_POSTS_OF_CURRENT_USER:'api/post/getsavedpostofcurrentuser',
  GET_TAGGED_POSTS_OF_CURRENT_USER:'api/post/gettaggedpostofcurrentuser',
  GET_PARTICULAR_POSTS_OF_CURRENT_USER:'api/post/getparticularpost',
  REPORT_POST : '/api/post/reportpost',
  SAVE_POST : '/api/post/savepost',
  REMOVE_SAVE_POST : '/api/post/removesavepost',
  REMOVE_TAGGED_POST : '/api/post/removetaggedpost',
  LIKE_POST : '/api/post/likepost',
  DISLIKE_POST : '/api/post/dislikepost',
  DELETE_POST : '/api/post/deletepost/:postId',
  GET_LIKED_POSTS : '/api/post/getlikedposts/:userId',
  GET_DISLIKED_POSTS : '/api/post/getdislikedposts/:userId',
  GET_LIKES_DISLIKES_INFO : '/api/post/getlikesdislikesinfo/:postId',
  GET_ALL_POSTS_FOR_EXPLORE : '/api/post/getallpublicpostsforexplore',
  GENERATE_CAPTION : '/api/post/generatecaption',
  DARK_MODE: 'api/post/darkmode',
  LEFT_SIDEBAR: 'api/post/leftsidebar',
  RIGHT_SIDEBAR: 'api/post/rightsidebar',
  // COMMENT
  ADD_COMMENT: 'api/post/addcomment',
  ADD_REPLY_FOR_COMMENT: 'api/post/replytocomment',
  GET_ALL_COMMENTS : '/api/post/getallcomments/:postId',
  DELETE_COMMENT : '/api/post/deletecomment/:commentId',
  EDIT_COMMENT : '/api/post/editcomment',

  // ADMIN
  ADMIN_LOGOUT: 'api/admin/logout',
  REFRESH_ADMIN_TOKEN: 'api/admin/refresh',
  GET_USERS: 'api/admin/getusersforadmin',
  BLOCK_USER: 'api/admin/blockuser/:userId',
  UNBLOCK_USER: 'api/admin/unblockuser/:userId',
  BLOCK_POST: 'api/admin/blockpost/:postId',
  UNBLOCK_POST: 'api/admin/unblockpost/:postId',
  APPROVE_PREMIUM: 'api/admin/approvepremium/:userId',
  REMOVE_PREMIUM: 'api/admin/removepremium/:userId',
  GET_POST_REPORTS: 'api/admin/getallpostreportsandposts',
  GET_PREMIUM_ACCOUNTS: 'api/admin/getpremiumaccountrequests',
  
  //CHAT
  GET_FRIENDS_INFO: 'api/message/getfriendsinfo',
  SEND_MESSAGES: 'api/message/sendMessages/:receiverId',
  SEND_MESSAGES_ONLY: 'api/message/sendMessagesOnly/:receiverId',
  GET_MESSAGES: 'api/message/getMessages/:receiverId',
  GET_ALL_CONVERSATIONS: 'api/message/getAllConverations',
  EDIT_MESSAGES: 'api/message/editmessage/:messageId',
  DELETE_MESSAGES: 'api/message/deletemessage/:messageId',
  
};

export default END_POINTS;




