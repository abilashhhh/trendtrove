import { Request, Response } from "express";
import ErrorInApplication from "../../utils/ErrorInApplication";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import {
  UserDBInterface,
  userDBRepository,
} from "../../application/repositories/userDBRepository";
import {
  UserRepositoryMongoDB,
  userRepositoryMongoDB,
} from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";

import {
  handleEditProfile,
  handlePasswordChange,
  handleUserInfo,
  // handleOtherUserInfo
} from "../../application/use-cases/profile/profileAuthApplication";
import { ProfileInterface } from "../../types/profileInterface";

const profileController = (
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  authServiceImplementation: AuthService,
  authServiceInterface: AuthServiceInterface
) => {
  const dbUserRepository = userDBRepositoryInterface(
    userDBRepositoryImplementation()
  );
  const authService = authServiceInterface(authServiceImplementation());

  //////////////////////////////////////////////////

  const getUserInfo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await handleUserInfo(id, dbUserRepository);
      console.log(user)
      res.json({
        status: "success",
        message: "user info fetched",
        user,
      });
    } catch (err) {
      console.error("Error fetching user info:", err);
      res.status(401).json({
        status: "error",
        message: "Failed to fetch user info",
      });
    }
  };

  //////////////////////////////////////////////////
  
  const editProfile = async (req: Request, res: Response) => {
    try {
    const profileInfo: ProfileInterface = req.body;
      console.log("req.body; : ", profileInfo)
      const userData = await handleEditProfile(profileInfo, dbUserRepository);
      console.log(userData)
      res.json({
        status: "success",
        message: "user edited successfully",
        userData,
      });
    } catch (err) {
      console.error("Error editing user:", err);
      res.status(401).json({
        status: "error",
        message: "Failed to edit user",
      });
    }
  };


  const changePassword = async (req: Request, res: Response) => { 
    try {
      const { _id, currentPassword, newPassword } = req.body;
    
  
      // Handle the password change
      const userData = await handlePasswordChange(_id, currentPassword , newPassword , dbUserRepository, authService);  
      console.log(userData);
  
      res.json({
        status: "success",
        message: "Password changed successfully",
        userData,
      });
    } catch (err) {
      console.error("Error changing password:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to change password",
      });
    }
  };

  
   



  //////////////////////////////////////////////////


  return {
    getUserInfo,
    editProfile,
    changePassword
  };
};

export default profileController;

 