import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { authServiceInterface } from "../../../application/services/authenticationServiceInterface";
import { authService } from "../../services/authenticationService";
import { userRepositoryMongoDB } from "../../database/mongodb/respositories/userRepositoryDatabase";
import { userDBRepository } from "../../../application/repositories/userDBRepository";
import userController from "../../../adapters/userController/userController";

const userRouter = () => {
  const router = express();

  const controller = userController(
    userRepositoryMongoDB,
    userDBRepository,
    authService,
    authServiceInterface
  );

  router.get("/getallusers/:id" , controller.getAllUsers);
  router.post("/followuser" , controller.followUserRequest);
  router.post("/unfollowuser" , controller.unfollowUserRequest);
  router.post("/cancelrequest" , controller.cancelfollowUserRequest);
  router.post("/acceptrequest" , controller.acceptfollowUserRequest);

  return router;
};

export default userRouter;
