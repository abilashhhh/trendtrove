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
  handleDeleteAccount,
  handleSuspendAccount,
  handlePrivateAccount,
  handleUploadCoverPhoto,
  handleUploadDp
  // handleOtherUserInfo
} from "../../application/use-cases/profile/profileAuthApplication";
import { ProfileInterface } from "../../types/profileInterface";
// import { CloudinaryService} from "../../frameworks/services/cloudinaryService";
// import { CloudinaryServiceInterface } from "../../application/services/cloudinaryServiceInterface";

const profileController = (
  // cloudinaryServiceImpl: CloudinaryService,
  // cloudinaryServiceInterface: CloudinaryServiceInterface,
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  authServiceImplementation: AuthService,
  authServiceInterface: AuthServiceInterface,
) => {
  // const cloudinaryService = cloudinaryServiceInterface(cloudinaryServiceImpl());
  const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
  const authService = authServiceInterface(authServiceImplementation());

  //////////////////////////////////////////////////

  const getUserInfo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await handleUserInfo(id, dbUserRepository);
      console.log(user);
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
      console.log("req.body; : ", profileInfo);
      const userData = await handleEditProfile(profileInfo, dbUserRepository);
      console.log(userData);
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
      const userData = await handlePasswordChange(
        _id,
        currentPassword,
        newPassword,
        dbUserRepository,
        authService
      );
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

  const deleteAccount = async (req: Request, res: Response) => {
    try {
      const { id, password } = req.params;
      console.log("req params in deleteAccount acc: ",req.params)

      const result = await handleDeleteAccount(id , password,dbUserRepository,authService);

      res.json({
        status: "success",
        message: "Account deleted successfully",
        result
      });
    } catch (err: any) {
      console.error("Error deleting account:", err);
      res.status(500).json({
        status: "error",
        message: err.message || "Failed to delete account",
      });
    }
  };

  const suspendAccount = async (req: Request, res: Response) => {
    try {
      const { id, password } = req.params;
      console.log("req params in suspend acc: ",req.params)
      const result = await handleSuspendAccount(id , password,dbUserRepository,authService);

      res.json({
        status: "success",
        message: "Account suspended successfully",
        result
      });
    } catch (err: any) {
      console.error("Error suspending account:", err);
      res.status(500).json({
        status: "error",
        message: err.message || "Failed to suspend your account",
      });
    }
  };

  const privateAccount = async (req: Request, res: Response) => {
    try {
      const { id, password } = req.params;
      console.log("req params in private acc: ",req.params)
      const result = await handlePrivateAccount(id , password,dbUserRepository,authService);

      res.json({
        status: "success",
        message: "Account set to private account successfully",
        result
      });
    } catch (err: any) {
      console.error("Error setting to private account:", err);
      res.status(500).json({
        status: "error",
        message: err.message || "Failed to set to private account",
      });
    }
  };

  
  // const uploadCover = async (req: Request, res: Response) => {
  //   try {
  //     const { userId }: { userId: string } = req.body;
  //     const { path } = req.file as Express.Multer.File;
  
  //     const { cloudinaryResp, coverPhoto } = await handleUploadCoverPhoto(
  //       userId,
  //       path,
  //       cloudinaryService,
  //       dbUserRepository
  //     );
  
  //     res.json({
  //       status: 'success',
  //       message: 'Cover photo uploaded',
  //       coverPhoto,
  //       cloudinaryResp,
  //     });
  //   } catch (error: any) {
  //     console.error('Error uploading cover photo:', error);
  //     res.status(500).json({
  //       status: 'error',
  //       message: 'An error occurred while uploading the cover photo',
  //       error: error.message,
  //     });
  //   }
  // };
  
  // const uploaddp = async (req: Request, res: Response) => {
  //   try {
  //     const { userId }: { userId: string } = req.body;
  //     const { path } = req.file as Express.Multer.File;
  
  //     const { cloudinaryResp, dp } = await handleUploadDp(
  //       userId,
  //       path,
  //       cloudinaryService,
  //       dbUserRepository
  //     );
  
  //     res.json({
  //       status: 'success',
  //       message: 'Display picture uploaded',
  //       dp,
  //       cloudinaryResp,
  //     });
  //   } catch (error: any) {
  //     console.error('Error uploading display picture:', error);
  //     res.status(500).json({
  //       status: 'error',
  //       message: 'An error occurred while uploading the display picture',
  //       error: error.message,
  //     });
  //   }
  // };

  //////////////////////////////////////////////////

  return {
    getUserInfo,
    editProfile,
    changePassword,
    deleteAccount,
    suspendAccount,
    privateAccount,
    // uploaddp,
    // uploadCover
  };
};

export default profileController;
