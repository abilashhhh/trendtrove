import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
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
  handleRazorpayOrder,
  handleVerifyPassword,
} from "../../application/use-cases/profile/profileAuthApplication";
import { ProfileInterface } from "../../types/profileInterface";
import Razorpay from "razorpay";

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
 

  const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;
    console.log("Get user info2 ran : ", userId);
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
    const result = await handleDeleteAccount(
      id,
      password,
      dbUserRepository,
      authService
    );
    res.json({
      status: "success",
      message: "Account deleted successfully",
      result,
    });
  });

  const suspendAccount = asyncHandler(async (req: Request, res: Response) => {
    const { id, password } = req.params;
    const result = await handleSuspendAccount(
      id,
      password,
      dbUserRepository,
      authService
    );
    res.json({
      status: "success",
      message: "Account suspended successfully",
      result,
    });
  });

  const privateAccount = asyncHandler(async (req: Request, res: Response) => {
    const { id, password } = req.params;
    const result = await handlePrivateAccount(
      id,
      password,
      dbUserRepository,
      authService
    );
    res.json({
      status: "success",
      message: "Account set to private successfully",
      result,
    });
  });

  const verifyPassword = asyncHandler(async (req: Request, res: Response) => {
    const { id, password } = req.params;
    
    try {
      const result = await handleVerifyPassword(id, password, dbUserRepository, authService);
      res.json({
        status: "success",
        message: "Password verified successfully",
        result,
      });
    } catch (error : any) {
      res.status((error as ErrorInApplication).statusCode || 500).json({
        status: "error",
        message: error.message || "Failed to verify password",
      });
    }
  });


  


  const createRazorpayOrder = async (req: Request, res: Response) => {
    try {
      const razorPay = new Razorpay({
        key_id: process.env.RAZORPAY_ID_KEY!,
        key_secret: process.env.RAZORPAY_SECRET_KEY!,
      });
  
      const options = req.body;
  
      const order = await razorPay.orders.create(options);
  
      if (!order) {
        return res.status(500).send("Error creating order");
      } else {
        return res.json({
          status: "success",
          message: "Razorpay order successful",
          order,
        });
      }
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      return res.status(500).send("Internal server error");
    }
  };
  
 

  return {
    getUserInfo,
    editProfile,
    changePassword,
    deleteAccount,
    suspendAccount,
    privateAccount,
    verifyPassword,
    createRazorpayOrder
  };
};

export default profileController;
