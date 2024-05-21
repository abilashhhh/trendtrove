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

    handleGetAllUsers,
  
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

  
  return {
    getAllUsers
  };
};

export default userController;
