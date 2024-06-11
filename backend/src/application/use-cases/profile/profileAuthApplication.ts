import { decodeBase64 } from "bcryptjs";
import { authService } from "../../../frameworks/services/authenticationService";
import { ProfileInterface } from "../../../types/profileInterface";
import ErrorInApplication from "../../../utils/ErrorInApplication";
import { UserDBInterface } from "../../repositories/userDBRepository";
import { AuthServiceInterface } from "../../services/authenticationServiceInterface";
// import Razorpay from "razorpay";

export const handleUserInfo = async (
  userId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    // console.log("handleUserInfo ran in profile usecase");
    const userData = await dbUserRepository.getUserById(userId);
    if (!userData) {
      throw new Error("User not found!");
    }
    const user = {
      _id: userData._id.toString(),
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      dp: userData.dp,
      coverPhoto: userData.coverPhoto,
      bio: userData.bio,
      gender: userData.gender,
      address: userData.address,
      followers: userData.followers,
      following: userData.following,
      isVerifiedAccount: userData.isVerifiedAccount,
      notifications: userData.notifications,
      savedPosts: userData.savedPosts,
    taggedPosts: userData?.taggedPosts,
      isGoogleSignedIn: userData.isGoogleSignedIn,
      isBlocked: userData.isBlocked,
      isPrivate: userData.isPrivate,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
    return user;
  } catch (err:any) {
    // console.log("error : ", err);
    throw new ErrorInApplication("User not found!", 401);
  }
};

export const handleEditProfile = async (
  profileInfo: ProfileInterface,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    // console.log("profileInfo...............=-==========", profileInfo);
    if (profileInfo.email) {
      const userData = await dbUserRepository.getUserByEmail(profileInfo.email);
      if (userData) {
        // console.log("User exists...");
        const user = await dbUserRepository.updateProfile(profileInfo);
        // console.log("user: ", user);
      }
    }
  } catch (err:any) {
   throw new Error(err)
    throw new ErrorInApplication("Failed to edit profile", 500);
  }
};
export const handlePasswordChange = async (
  _id: string,
  currentPassword: string,
  newPassword: string,
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  try {
    const userExists = await dbUserRepository.getUserById(_id);
    if (!userExists) {
      throw new ErrorInApplication("User not found", 404);
    }

    const isPasswordValid = await authService.comparePassword(currentPassword, userExists.password);
    if (!isPasswordValid) {
      throw new ErrorInApplication("Invalid current password", 401);
    }

    const encryptedNewPassword = await authService.encryptPassword(newPassword);
    const user = await dbUserRepository.updatePassword(_id, encryptedNewPassword);

    return user;
  } catch (err:any) {
   throw new Error(err)
    throw new ErrorInApplication("Failed to change password", 500);
  }
};

export const handleDeleteAccount = async (
  userId: string,
  password: string,
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  try {
    const userExists = await dbUserRepository.getUserById(userId);
    if (!userExists) {
      throw new ErrorInApplication("User not found", 404);
    }

    const isPasswordValid = await authService.comparePassword(password, userExists.password);
    if (!isPasswordValid) {
      throw new ErrorInApplication("Invalid current password", 401);
    }

    const user = await dbUserRepository.deleteAccount(userId);

    return user;
  } catch (err:any) {
   throw new Error(err)
    throw new ErrorInApplication("Failed to delete account", 500);
  }
};

export const handleSuspendAccount = async (
  userId: string,
  password: string,
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  try {
    const userExists = await dbUserRepository.getUserById(userId);
    if (!userExists) {
      throw new ErrorInApplication("User not found", 404);
    }

    const isPasswordValid = await authService.comparePassword(password, userExists.password);
    if (!isPasswordValid) {
      throw new ErrorInApplication("Invalid current password", 401);
    }

    const user = await dbUserRepository.suspendAccount(userId);

    return user;
  } catch (err:any) {
   throw new Error(err)
    throw new ErrorInApplication("Failed to suspend account", 500);
  }
};
export const handlePrivateAccount = async (
  userId: string,
  password: string,
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  try {
    const userExists = await dbUserRepository.getUserById(userId);
    if (!userExists) {
      throw new ErrorInApplication("User not found", 404);
    }

    const isPasswordValid = await authService.comparePassword(password, userExists.password);
    if (!isPasswordValid) {
      throw new ErrorInApplication("Invalid current password", 401);
    }

    const user = await dbUserRepository.privateAccount(userId);

    return user;
  } catch (err:any) {
   throw new Error(err)
    throw new ErrorInApplication("Failed to change to private account", 500);
  }
};



export const handleGetAllUsers = async (
  id: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    const user = await dbUserRepository.getAllUsers(id);
    return user;
  } catch (err:any) {
   throw new Error(err)
    throw new ErrorInApplication("Failed to get all users data", 401);
  }
};

export const handleUserbyUsername = async (
  username: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    const user = await dbUserRepository.getUserByUsername(username);

    return user;
  } catch (err:any) {
   throw new Error(err)
    throw new ErrorInApplication("Failed to handleUserbyUsername", 500);
  }
};

export const handleFollowUserRequest = async (
  userId: string,
  targetUserId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    const mainUser = await dbUserRepository.getUserById(userId);
    const targetUser = await dbUserRepository.getUserById(targetUserId);

    if (!mainUser || !targetUser) {
      throw new ErrorInApplication("User doesn't exist", 401);
    }
    let newResult = await dbUserRepository.followUser(userId, targetUserId);
    return {
      message: newResult.message,
      user: targetUser,
    };
  } catch (err:any) {
    if (err instanceof ErrorInApplication) {
      throw err;  
    }
    throw new ErrorInApplication("Failed to handle follow request", 401);
  }
};

export const handleUnFollowUserRequest = async (
  userId: string,
  targetUserId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    const mainUser = await dbUserRepository.getUserById(userId);
    const targetUser = await dbUserRepository.getUserById(targetUserId);

    if (!mainUser || !targetUser) {
      throw new ErrorInApplication("User doesn't exist", 401);
    }

    let newResult = await dbUserRepository.unfollowUser(userId, targetUserId);
    return {
      message: newResult.message,
      user: targetUser,
    };
  } catch (err:any) {
    if (err instanceof ErrorInApplication) {
      throw err;  
    }
    throw new ErrorInApplication("Failed to handle unfollow request", 401);
  }
};

export const handleCancelFollowUserRequest = async (
  userId: string,
  targetUserId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    const mainUser = await dbUserRepository.getUserById(userId);
    const targetUser = await dbUserRepository.getUserById(targetUserId);

    if (!mainUser || !targetUser) {
      throw new ErrorInApplication("User doesn't exist", 401);
    }

    let newResult = await dbUserRepository.cancelSendFriendRequest(
      userId,
      targetUserId
    );
    return {
      message: newResult.message,
      user: targetUser,
    };
  } catch (err:any) {
    if (err instanceof ErrorInApplication) {
      throw err;  
    }
    throw new ErrorInApplication("Failed to unsend friend request", 401);
  }
};

export const handleAcceptFollowUserRequest = async (
  userId: string,
  targetUserId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    const mainUser = await dbUserRepository.getUserById(userId);
    const targetUser = await dbUserRepository.getUserById(targetUserId);

    if (!mainUser || !targetUser) {
      throw new ErrorInApplication("User doesn't exist", 401);
    }

    let newResult = await dbUserRepository.acceptFriendRequest(
      userId,
      targetUserId
    );
    return {
      message: newResult.message,
      user: targetUser,
    };
  } catch (err:any) {
    if (err instanceof ErrorInApplication) {
      throw err;  
    }
    throw new ErrorInApplication("Failed to unsend friend request", 401);
  }
};

export const handleRejectFollowUserRequest = async (
  userId: string,
  targetUserId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    const mainUser = await dbUserRepository.getUserById(userId);
    const targetUser = await dbUserRepository.getUserById(targetUserId);

    if (!mainUser || !targetUser) {
      throw new ErrorInApplication("User doesn't exist", 401);
    }

    let newResult = await dbUserRepository.rejectFriendRequest(
      userId,
      targetUserId
    );
    return {
      message: newResult.message,
      user: targetUser,
    };
  } catch (err:any) {
    if (err instanceof ErrorInApplication) {
      throw err;  
    }
    throw new ErrorInApplication("Failed to reject friend request", 401);
  }
};


export const handleVerifyPassword = async (
  userId: string,
  password: string,
  dbUserRepository: ReturnType<UserDBInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  try {
    const userExists = await dbUserRepository.getUserById(userId);
    if (!userExists) {
      throw new ErrorInApplication("User not found", 404);
    }
    const isPasswordValid = await authService.comparePassword(password, userExists?.password);

    if (!isPasswordValid) {
      throw new ErrorInApplication("Invalid current password", 401);
    }
  } catch (err : any) {
 
    throw new Error(err)
  }
};

// export const handleRazorpayOrder = async( 
//   razorpayOrder: string,
//   dbUserRepository: ReturnType<UserDBInterface>)=> {
//     try {
//       const razorPay = new Razorpay({
//         key_id : process.env.RAZORPAY_ID_KEY ,
//         key_secret:  RAZORPAY_SECRET_KEY ,
        
//       })
//     } catch (error) {
//       console.error("Error: ", error);
//       throw new ErrorInApplication("Failed to create razorpay order", 401)
//     }
//   }