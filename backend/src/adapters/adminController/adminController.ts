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

import { handleAdminSignin } from "../../application/use-cases/admin/adminAuthApplication";

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

  const signin  = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await handleAdminSignin(email, password, dbUserRepository, authService);
      console.log(user);
      res.json({
        status: "success",
        message: "Admin login successful",
        user,
      });
    } catch (err) {
      console.error("Error logging admin:", err);
      res.status(401).json({
        status: "error",
        message: "Failed to do admin login",
      });
    }
  };

  //////////////////////////////////////////////////

  return {
    signin
  };
};

export default adminController;
