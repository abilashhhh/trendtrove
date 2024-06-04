// import { Request, Response } from "express";
// import ErrorInApplication from "../../utils/ErrorInApplication";
// import { AuthService } from "../../frameworks/services/authenticationService";
// import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
// import {
//   UserDBInterface,
// } from "../../application/repositories/userDBRepository";
// import {
//   UserRepositoryMongoDB,
// } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";


// import {
//   handleEditProfile,
//   handlePasswordChange,
//   handleUserInfo,
//   handleDeleteAccount,
//   handleSuspendAccount,
//   handlePrivateAccount, 
// } from "../../application/use-cases/profile/profileAuthApplication";
// import { ProfileInterface } from "../../types/profileInterface";
 
// const profileController = (
//   userDBRepositoryImplementation: UserRepositoryMongoDB,
//   userDBRepositoryInterface: UserDBInterface,
//   authServiceImplementation: AuthService,
//   authServiceInterface: AuthServiceInterface,
// ) => {
//   const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
//   const authService = authServiceInterface(authServiceImplementation());

//   //////////////////////////////////////////////////

//   const getUserInfo = async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const user = await handleUserInfo(id, dbUserRepository);
//       console.log(user);
//       res.json({
//         status: "success",
//         message: "user info fetched",
//         user,
//       });
//     } catch (err) {
//       console.error("Error fetching user info:", err);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to fetch user info",
//       });
//     }
//   };

//   //////////////////////////////////////////////////

//   const editProfile = async (req: Request, res: Response) => {
//     try {
//       const profileInfo: ProfileInterface = req.body;
//       console.log("req.body; : ", profileInfo);
//       const userData = await handleEditProfile(profileInfo, dbUserRepository);
//       console.log(userData);
//       res.json({
//         status: "success",
//         message: "user edited successfully",
//         userData,
//       });
//     } catch (err) {
//       console.error("Error editing user:", err);
//       res.status(401).json({
//         status: "error",
//         message: "Failed to edit user",
//       });
//     }
//   };

//   const changePassword = async (req: Request, res: Response) => {
//     try {
//       const { _id, currentPassword, newPassword } = req.body;

//       // Handle the password change
//       const userData = await handlePasswordChange(
//         _id,
//         currentPassword,
//         newPassword,
//         dbUserRepository,
//         authService
//       );
//       console.log(userData);

//       res.json({
//         status: "success",
//         message: "Password changed successfully",
//         userData,
//       });
//     } catch (err) {
//       console.error("Error changing password:", err);
//       res.status(500).json({
//         status: "error",
//         message: "Failed to change password",
//       });
//     }
//   };

//   const deleteAccount = async (req: Request, res: Response) => {
//     try {
//       const { id, password } = req.params;
//       console.log("req params in deleteAccount acc: ",req.params)

//       const result = await handleDeleteAccount(id , password,dbUserRepository,authService);

//       res.json({
//         status: "success",
//         message: "Account deleted successfully",
//         result
//       });
//     } catch (err: any) {
//       console.error("Error deleting account:", err);
//       res.status(500).json({
//         status: "error",
//         message: err.message || "Failed to delete account",
//       });
//     }
//   };

//   const suspendAccount = async (req: Request, res: Response) => {
//     try {
//       const { id, password } = req.params;
//       console.log("req params in suspend acc: ",req.params)
//       const result = await handleSuspendAccount(id , password,dbUserRepository,authService);

//       res.json({
//         status: "success",
//         message: "Account suspended successfully",
//         result
//       });
//     } catch (err: any) {
//       console.error("Error suspending account:", err);
//       res.status(500).json({
//         status: "error",
//         message: err.message || "Failed to suspend your account",
//       });
//     }
//   };

//   const privateAccount = async (req: Request, res: Response) => {
//     try {
//       const { id, password } = req.params;
//       console.log("req params in private acc: ",req.params)
//       const result = await handlePrivateAccount(id , password,dbUserRepository,authService);

//       res.json({
//         status: "success",
//         message: "Account set to private account successfully",
//         result
//       });
//     } catch (err: any) {
//       console.error("Error setting to private account:", err);
//       res.status(500).json({
//         status: "error",
//         message: err.message || "Failed to set to private account",
//       });
//     }
//   };
  
//   //////////////////////////////////////////////////

//   return {
//     getUserInfo,
//     editProfile,
//     changePassword,
//     deleteAccount,
//     suspendAccount,
//     privateAccount,
//   };
// };

// export default profileController;




import { Request, Response } from "express";
import asyncHandler from 'express-async-handler';
import ErrorInApplication from "../../utils/ErrorInApplication";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";

import {
  handleEditProfile,
  handlePasswordChange,
  handleUserInfo,
  handleDeleteAccount,
  handleSuspendAccount,
  handlePrivateAccount,
} from "../../application/use-cases/profile/profileAuthApplication";
import { ProfileInterface } from "../../types/profileInterface";

const profileController = (
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  authServiceImplementation: AuthService,
  authServiceInterface: AuthServiceInterface,
) => {
  const dbUserRepository = userDBRepositoryInterface(userDBRepositoryImplementation());
  const authService = authServiceInterface(authServiceImplementation());

  const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await handleUserInfo(id, dbUserRepository);
    res.json({
      status: "success",
      message: "User info fetched",
      user,
    });
  });

  const getUserInfo2 = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body
    console.log("Get user info2 ran : " , userId)
    const user = await handleUserInfo(userId, dbUserRepository);
    res.json({
      status: "success",
      message: "User info fetched",
      user,
    });
  });

  const editProfile = asyncHandler(async (req: Request, res: Response) => {
    const profileInfo: ProfileInterface = req.body;
    const userData = await handleEditProfile(profileInfo, dbUserRepository);
    res.json({
      status: "success",
      message: "User edited successfully",
      userData,
    });
  });

  const changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { _id, currentPassword, newPassword } = req.body;
    const userData = await handlePasswordChange(
      _id,
      currentPassword,
      newPassword,
      dbUserRepository,
      authService
    );
    res.json({
      status: "success",
      message: "Password changed successfully",
      userData,
    });
  });

  const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
    const { id, password } = req.params;
    const result = await handleDeleteAccount(id, password, dbUserRepository, authService);
    res.json({
      status: "success",
      message: "Account deleted successfully",
      result
    });
  });

  const suspendAccount = asyncHandler(async (req: Request, res: Response) => {
    const { id, password } = req.params;
    const result = await handleSuspendAccount(id, password, dbUserRepository, authService);
    res.json({
      status: "success",
      message: "Account suspended successfully",
      result
    });
  });

  const privateAccount = asyncHandler(async (req: Request, res: Response) => {
    const { id, password } = req.params;
    const result = await handlePrivateAccount(id, password, dbUserRepository, authService);
    res.json({
      status: "success",
      message: "Account set to private successfully",
      result
    });
  });

  return {
    getUserInfo,
    getUserInfo2,
    editProfile,
    changePassword,
    deleteAccount,
    suspendAccount,
    privateAccount,
  };
};

export default profileController;
