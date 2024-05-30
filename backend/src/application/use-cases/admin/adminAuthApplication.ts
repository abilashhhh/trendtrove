import ErrorInApplication from "../../../utils/ErrorInApplication";
import { PostDBInterface } from "../../repositories/postDBRepository";
import { UserDBInterface } from "../../repositories/userDBRepository";
import { AuthServiceInterface } from "../../services/authenticationServiceInterface";
 
// // User Login
// export const handleAdminSignin = async (
//   email: string,
//   password: string,
//   dbUserRepository: ReturnType<UserDBInterface>,
//   authService: ReturnType<AuthServiceInterface>
// ) => {
//   const user = await dbUserRepository.getUserByEmail(email);
//   if (!user) {
//     throw new ErrorInApplication("Invalid email or password!", 401);
//   }
//   if (!user.isAdmin) {
//     throw new ErrorInApplication("This is admins login. Users cant login here!", 401);
//   }
//   if (user.isBlocked) {
//     throw new ErrorInApplication("Your account has been blocked!", 401);
//   }

//   const isPasswordCorrect = await authService.comparePassword(password, user?.password?.toString() || "");
//   if (!isPasswordCorrect) {
//     throw new ErrorInApplication("Invalid email or password!", 401);
//   }

//   const userDetails = {
//     _id: user?._id.toString(),
//     name: user?.name,
//     username: user?.username,
//     email: user?.email,
//     phone: user?.phone,
//     coverPhoto: user?.coverPhoto,
//     dp: user?.dp,
//     bio: user?.bio,
//     gender: user?.gender,
//     address: user?.address,
//     followers: user?.followers,
//     following: user?.following,
//     isVerifiedAccount: user?.isVerifiedAccount,
//     isGoogleSignedIn: user?.isGoogleSignedIn,
//     isBlocked: user?.isBlocked,
//     isAdmin: user?.isAdmin,
//   };

//   const refreshToken = authService.generateRefreshToken({ userId: user._id.toString(), role: "admin" });
//   const accessToken = authService.generateAccessToken({ userId: user._id.toString(), role: "admin" });
//   await dbUserRepository.addRefreshTokenAndExpiry(email, refreshToken); // setting the expiry to 7 days

//   return { userDetails, refreshToken, accessToken };
// };
 

 
export const handleLogoutAdmin = async (
  userId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  await dbUserRepository.logoutUser(userId);
};


export const handleGetAllUsersForAdmin = async (
  dbUserRepository: ReturnType<UserDBInterface>,
) => {
  try {
console.log("handleyeallusers called")
    const user = await dbUserRepository.getAllUsersForAdmin();
    return user;
  } catch (err) {
    console.error("Error: ", err);
    throw new ErrorInApplication("Failed to get all users data", 401);
  }
};


export const handkeGetallpostreports = async (
  dbUserRepository: ReturnType<UserDBInterface>,
) => {
  try {
console.log("handkeGetallpostreports called")
    const reports = await dbUserRepository.getAllReportsForAdmin();
    return reports;
  } catch (err) {
    console.error("Error: ", err);
    throw new ErrorInApplication("Failed to get all users data", 401);
  }
};





export const handleBlockAccount = async (
  userId: string,
  dbUserRepository: ReturnType<UserDBInterface>,
) => {
  try {
    console.log("Userdetails in handle block: ", userId)
    const userExists = await dbUserRepository.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found");
    }
 
    // Update user's password in the database
    const user = await dbUserRepository.blockAccount(userId);

    return user;
  } catch (err) {
    console.error("Error: ", err);
    throw new ErrorInApplication("Failed to block user", 401);
  }
};


export const handleUnBlockAccount = async (
  userId: string,
  dbUserRepository: ReturnType<UserDBInterface>,
) => {
  try {
    console.log("Userdetails in handle unblock: ", userId)
    const userExists = await dbUserRepository.getUserById(userId);
    if (!userExists) {
      throw new Error("User not found");
    }
 
    // Update user's password in the database
    const user = await dbUserRepository.unblockAccount(userId);

    return user;
  } catch (err) {
    console.error("Error: ", err);
    throw new ErrorInApplication("Failed to unblock user", 401);
  }
};


export const handleBlockPost = async (
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>,
) => {
  try {
    console.log("Post details in handle block: ", postId);
     
    const post = await dbPostRepository.blockPost(postId);

    return post;
  } catch (err) {
    console.error("Error: ", err);
    throw new ErrorInApplication("Failed to block post", 401);
  }
};

export const handleUnblockPost = async (
  postId: string,
  dbPostRepository: ReturnType<PostDBInterface>,
) => {
  try {
    console.log("Post details in handle unblock: ", postId);
    
    const post = await dbPostRepository.unblockPost(postId);

    return post;
  } catch (err) {
    console.error("Error: ", err);
    throw new ErrorInApplication("Failed to unblock post", 401);
  }
};