import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { authServiceInterface } from "../../../application/services/authenticationServiceInterface";
import { authService } from "../../services/authenticationService";
import { userDBRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongodb/respositories/userRepositoryDatabase";
import postController from "../../../adapters/postController/postController";

const postRouter = () => {
  const router = express();

  const controller = postController(
    userRepositoryMongoDB,
    userDBRepository,
    authService,
    authServiceInterface
  );

  router.post("/addpost", authMiddleware, controller.addPost);

  return router;
};

export default postRouter;
