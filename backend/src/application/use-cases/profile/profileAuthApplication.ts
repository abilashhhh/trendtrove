import { ProfileInterface } from "../../../types/profileInterface";
import ErrorInApplication from "../../../utils/ErrorInApplication";
import { UserDBInterface } from "../../repositories/userDBRepository";

export const handleUserInfo = async (
  userId: string,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    console.log("handleUserInfo ran in profile usecase");
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
    };
    return user;
  } catch (err) {
    console.log("error : ", err);
    throw new ErrorInApplication("User not found!", 401);
  }
};

export const handleEditProfile = async (
  profileInfo: ProfileInterface,
  dbUserRepository: ReturnType<UserDBInterface>
) => {
  try {
    
    console.log("profileInfo...............=-==========", profileInfo);
    if (profileInfo.email) {
      const userData = await dbUserRepository.getUserByEmail(profileInfo.email);
      if (userData) {
        console.log("User exists...");
        const user = await dbUserRepository.updateProfile(profileInfo);
      
        console.log("user: ", user)
      }
    }


  } catch (err) {
    console.log("Error:", err);
    throw new ErrorInApplication("User not found!", 401);
  }
};
 