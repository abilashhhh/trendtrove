import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { authServiceInterface } from "../../../application/services/authenticationServiceInterface";
import { authService } from "../../services/authenticationService";
import { userDBRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongodb/respositories/userRepositoryDatabase";
import postController from "../../../adapters/postController/postController";
import { postRepositoryMongoDB } from "../../database/mongodb/respositories/postRepositoryDatabase";
import { postDBRepository } from "../../../application/repositories/postDBRepository";

const postRouter = () => {
  const router = express();

  const controller = postController(
    userRepositoryMongoDB,
    userDBRepository,
    postRepositoryMongoDB,
    postDBRepository,
    authService,
    authServiceInterface
  );

  router.post("/addpost", authMiddleware, controller.addPost);
  router.get("/getpostforuser/:id", authMiddleware, controller.getpostforuser);

  return router;
};

export default postRouter;
