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
  handleUserInfo,
  // handleOtherUserInfo
} from "../../application/use-cases/profile/profileAuthApplication";

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
      console.log("req.params; : ", req.params)
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

  return {
    getUserInfo,
  };
};

export default profileController;
