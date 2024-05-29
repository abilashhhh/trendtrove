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

import {  handleBlockAccount, handleGetAllUsersForAdmin, handleLogoutAdmin, handleUnBlockAccount } from "../../application/use-cases/admin/adminAuthApplication";

const adminController = (
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

  // const signin  = async (req: Request, res: Response) => {
  //   try {
  //     const { email, password } = req.body;
  //     const user = await handleAdminSignin(email, password, dbUserRepository, authService);
  //     console.log(user);
  //     res.json({
  //       status: "success",
  //       message: "Admin login successful",
  //       user,
  //     });
  //   } catch (err) {
  //     console.error("Error logging admin:", err);
  //     res.status(401).json({
  //       status: "error",
  //       message: "Failed to do admin login",
  //     });
  //   }
  // };


  const logout = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      await handleLogoutAdmin(userId, dbUserRepository);
      res.json({ status: "success", message: "Admin logged out successfully" });
    } catch (err) {
      console.error("Error logging out admin:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to log out admin",
      });
    }
  };

  const getAllUsersForAdmin = async (req: Request, res: Response) => {
    try {
      const users = await handleGetAllUsersForAdmin(dbUserRepository);
      console.log(users);
      res.json({
        status: "success",
        message: "All users info fetched",
        users,
      });
    } catch (err) {
      console.error("Error fetching all users info:", err);
      res.status(401).json({
        status: "error",
        message: "Failed to fetch all users info",
      });
    }
  };

  const blockAccount = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log("req params in suspend acc: ",req.params)
      const result = await handleBlockAccount(id , dbUserRepository);

      res.json({
        status: "success",
        message: "Account blocked successfully",
        result
      });
    } catch (err: any) {
      console.error("Error blocking account:", err);
      res.status(500).json({
        status: "error",
        message: err.message || "Failed to block the account",
      });
    }
  };
  const unblockAccount = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log("req params in suspend acc: ",req.params)
      const result = await handleUnBlockAccount(id , dbUserRepository);

      res.json({
        status: "success",
        message: "Account blocked successfully",
        result
      });
    } catch (err: any) {
      console.error("Error blocking account:", err);
      res.status(500).json({
        status: "error",
        message: err.message || "Failed to block the account",
      });
    }
  };

  //////////////////////////////////////////////////

  return {
    // signin,
    logout,
    getAllUsersForAdmin,
    blockAccount,
    unblockAccount
  };
};

export default adminController;
