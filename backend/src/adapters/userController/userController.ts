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

  handleAcceptFollowUserRequest,
  handleCancelFollowUserRequest,
  handleFollowUserRequest,
    handleGetAllUsers,
    handleUnFollowUserRequest,
    handleUserInfo,
    handleUserbyUsername,
  
} from "../../application/use-cases/profile/profileAuthApplication";

const userController = (
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

  const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
      const user = await handleGetAllUsers(id, dbUserRepository);
      console.log(user);
      res.json({
        status: "success",
        message: "All users info fetched",
        user,
      });
    } catch (err) {
      console.error("Error fetching all users info:", err);
      res.status(401).json({
        status: "error",
        message: "Failed to fetch all users info",
      });
    }
  };

  const getuserprofile = async (req: Request, res: Response) => {
    try {
        const { username } = req.params
      const user = await handleUserbyUsername(username, dbUserRepository);
      console.log(user);
      res.json({
        status: "success",
        message: "User info fetched",
        user,
      });
    } catch (err) {
      console.error("Error fetching users info:", err);
      res.status(401).json({
        status: "error",
        message: "Failed to fetch users info",
      });
    }
  };
 

  const followUserRequest = async (req: Request, res: Response) => {
    try {
      const { userId, targetUserId } = req.body;
      const result = await handleFollowUserRequest(userId, targetUserId, dbUserRepository);
      res.json({
        status: "success",
        message: result.message,
        user: result.user,
      });
    } catch (err) {
      res.status(401).json({
        status: "error",
        message: "Unable to send follow request, please try again",
      });
    }
  };

  const unfollowUserRequest = async (req: Request, res: Response) => {
    try {
      const { userId, targetUserId } = req.body;
      console.log("unfolow user: ", req.body)
      const result = await handleUnFollowUserRequest(userId, targetUserId, dbUserRepository);
      res.json({
        status: "success",
        message: result.message,
        user: result.user,
      });
    } catch (err) {
      res.status(401).json({
        status: "error",
        message: "Unable to unfollow user, please try again",
      });
    }
  };

  const cancelfollowUserRequest = async (req: Request, res: Response) => {
    try {
      const { userId, targetUserId } = req.body;
      console.log("cancelfollowUserRequest user: ", req.body)

      const result = await handleCancelFollowUserRequest(userId, targetUserId, dbUserRepository);
      res.json({
        status: "success",
        message: result.message,
        user: result.user,
      });
    } catch (err) {
      res.status(401).json({
        status: "error",
        message: "Unable to cancel follow request, please try again",
      });
    }
  };

  const acceptfollowUserRequest = async (req: Request, res: Response) => {
    try {
      const { userId, targetUserId } = req.body;
      console.log("acceptfollowUserRequest user: ", req.body)

      const result = await handleAcceptFollowUserRequest(userId, targetUserId, dbUserRepository);
      res.json({
        status: "success",
        message: result.message,
        user: result.user,
      });
    } catch (err) {
      res.status(401).json({
        status: "error",
        message: "Unable to accept follow request, please try again",
      });
    }
  };
  
  const rejectfollowUserRequest = async (req: Request, res: Response) => {
    try {
      const { userId, targetUserId } = req.body;
      console.log("rejectfollowUserRequest user: ", req.body)

      const result = await handleRejectFollowUserRequest(userId, targetUserId, dbUserRepository);
      res.json({
        status: "success",
        message: result.message,
        user: result.user,
      });
    } catch (err) {
      res.status(401).json({
        status: "error",
        message: "Unable to  reject request, please try again",
      });
    }
  };

  
  return {
    getAllUsers,
    getuserprofile,
    followUserRequest,
    cancelfollowUserRequest,
    acceptfollowUserRequest,
    unfollowUserRequest,
    rejectfollowUserRequest
  };
};

export default userController;
