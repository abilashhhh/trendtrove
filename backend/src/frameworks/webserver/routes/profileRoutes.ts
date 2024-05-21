import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { authServiceInterface } from "../../../application/services/authenticationServiceInterface";
import { authService } from "../../services/authenticationService";
import { userRepositoryMongoDB } from "../../database/mongodb/respositories/userRepositoryDatabase";
import { userDBRepository } from "../../../application/repositories/userDBRepository";
import profileController from "../../../adapters/profileController/profileController";

const profileRouter = () => {
  const router = express();

  const controller = profileController(
    userRepositoryMongoDB,
    userDBRepository,
    authService,
    authServiceInterface
  );

  router.get("/getuserinfo/:id" , controller.getUserInfo);
  router.patch("/editprofile" , controller.editProfile);
  router.patch("/changepassword" , controller.changePassword);
  // router.delete("/deleteaccount" ,controller.deleteAccount);
  // router.patch("/suspendaccount" ,controller.suspendAccount);
  // router.get('/getotheruserinfo/:id', authMiddleware, controller.getOtherUserInfo);
 
  return router;
};

export default profileRouter;
