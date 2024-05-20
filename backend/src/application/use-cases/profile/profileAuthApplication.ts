  import { authService } from "../../../frameworks/services/authenticationService";
  import { ProfileInterface } from "../../../types/profileInterface";
  import ErrorInApplication from "../../../utils/ErrorInApplication";
  import { UserDBInterface } from "../../repositories/userDBRepository";
import { AuthServiceInterface } from "../../services/authenticationServiceInterface";

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
          console.log("user: ", user);
        }
      }
    } catch (err) {
      console.log("Error:", err);
      throw new ErrorInApplication("User not found!", 401);
    }
  };


  export const handlePasswordChange = async (
    userData: { _id: string, currentPassword: string, newPassword: string },
    dbUserRepository: ReturnType<UserDBInterface>,
    authService: ReturnType<AuthServiceInterface>
  ) => {
    try {
      console.log("userData: ", userData);
  
      // Check if required fields exist in userData
      if (!userData._id || !userData.currentPassword || !userData.newPassword) {
        throw new Error("Invalid user data or missing current or new password");
      }
  
      // Fetch user from database
      const userExists = await dbUserRepository.getUserById(userData._id);
      if (!userExists) {
        throw new Error("User not found");
      }
  
      // Compare current password with stored password
      const isPasswordValid = await authService.comparePassword(userExists.password, userData.currentPassword);
      if (!isPasswordValid) {
        throw new Error("Invalid current password");

      }

      console.log("")
  
      // Encrypt new password
      const newPassword = await authService.encryptPassword(userData.newPassword);
  
      // Update user's password in the database
      const user = await dbUserRepository.updatePassword(userData._id, newPassword);
      console.log("user: ", user);
    } catch (err) {
      console.log("Error:", err);
      throw new ErrorInApplication(err.message || "Failed to change password", 401);
    }
  };
  