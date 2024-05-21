import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { authServiceInterface } from "../../../application/services/authenticationServiceInterface";
import { authService } from "../../services/authenticationService";
import { userRepositoryMongoDB } from "../../database/mongodb/respositories/userRepositoryDatabase";
import { userDBRepository } from "../../../application/repositories/userDBRepository";
import adminController from "../../../adapters/adminController/adminController";

const adminRouter = () => {
  const router = express();

  const controller = adminController(
    userRepositoryMongoDB,
    userDBRepository,
    authService,
    authServiceInterface
  );

  router.post("/signin" , controller.signin);
  router.post("/logout", controller.logout);
  router.get("/getusersforadmin", controller.getAllUsersForAdmin);


 
 
  return router;
};

export default adminRouter;
