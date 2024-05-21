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
    _id: string, 
    currentPassword: string, 
    newPassword: string, 
    dbUserRepository: ReturnType<UserDBInterface>, 
    authService: ReturnType<AuthServiceInterface>
  ) => {
    try {

        
      const userExists = await dbUserRepository.getUserById(_id);
      if (!userExists) {
        throw new Error("User not found");
    
      }
      console.log("User exists data: ", userExists);
      console.log("User exists userExists.password: ", userExists.password);
      
      // Validate the current password
      const isPasswordValid = await authService.comparePassword( currentPassword,userExists.password);
      if (!isPasswordValid) {
        throw new Error("iNVALID CURRENT PASSWORD");

      }
      console.log("User exists data isPasswordValid: ", isPasswordValid);




  
      const userdata= await dbUserRepository.getUserById(_id);
      if (!userdata) {
        throw new Error("User not found");
      }
      console.log("User userdata: ", userdata);
  
      // Encrypt the new password
      const encryptedNewPassword = await authService.encryptPassword(newPassword);
      console.log("enc padss :", encryptedNewPassword)
  
      // Update user's password in the database
      const user = await dbUserRepository.updatePassword(_id, encryptedNewPassword);
      console.log("Updated user: ", user);
  
      return user;
    } catch (err) {
      console.error("Error: ", err);
      throw new ErrorInApplication("Failed to change password", 401);
    }
  };
  