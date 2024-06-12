import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { PostDBInterface } from "../../application/repositories/postDBRepository";
import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import {
  handleGetAllUsersForAdmin,
  handleBlockAccount,
  handleUnBlockAccount,
  handleBlockPost,
  handleUnblockPost,
  handkeGetallpostreports,
  handkeGetPremiumRequests,
} from "../../application/use-cases/admin/adminAuthApplication";

const adminController = (
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  postDBRepositoryImplementation: PostRepositoryMongoDB,
  postDBRepositoryInterface: PostDBInterface,
  authServiceImplementation: AuthService,
  authServiceInterface: AuthServiceInterface
) => {
  const dbUserRepository = userDBRepositoryInterface(
    userDBRepositoryImplementation()
  );
  const dbPostRepository = postDBRepositoryInterface(
    postDBRepositoryImplementation()
  );
  const authService = authServiceInterface(authServiceImplementation());

  const logout = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.json({ status: "success", message: "Admin logged out successfully" });
  });

  const getAllUsersForAdmin = asyncHandler(
    async (req: Request, res: Response) => {
      const users = await handleGetAllUsersForAdmin(dbUserRepository);
      res.json({
        status: "success",
        message: "All users info fetched",
        users,
      });
    }
  );

  const getallpostreports = asyncHandler(
    async (req: Request, res: Response) => {
      const reports = await handkeGetallpostreports(dbUserRepository);
      res.json({
        status: "success",
        message: "All reports info fetched",
        reports,
      });
    }
  );

  const getpremiumaccountrequests = asyncHandler(
    async (req: Request, res: Response) => {
      const premiumAccountRequests = await handkeGetPremiumRequests(dbUserRepository);
      res.json({
        status: "success",
        message: "All premiumAccountRequests info fetched",
        premiumAccountRequests,
      });
    }
  );

  const blockAccount = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await handleBlockAccount(id, dbUserRepository);
    res.json({
      status: "success",
      message: "Account blocked successfully",
      result,
    });
  });

  const unblockAccount = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await handleUnBlockAccount(id, dbUserRepository);
    res.json({
      status: "success",
      message: "Account unblocked successfully",
      result,
    });
  });

  const blockPost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const result = await handleBlockPost(postId, dbPostRepository);
    res.json({
      status: "success",
      message: "Post blocked successfully",
      result,
    });
  });

  const unblockPost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    const result = await handleUnblockPost(postId, dbPostRepository);
    res.json({
      status: "success",
      message: "Post unblocked successfully",
      result,
    });
  });

  return {
    logout,
    getAllUsersForAdmin,
    getallpostreports,
    blockAccount,
    unblockAccount,
    blockPost,
    unblockPost,
    getpremiumaccountrequests,
  };
};

export default adminController;
