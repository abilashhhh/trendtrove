import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { authServiceInterface } from "../../../application/services/authenticationServiceInterface";
import { authService } from "../../services/authenticationService";
import { userDBRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongodb/respositories/userRepositoryDatabase";
import postController from "../../../adapters/postController/postController";
import { postRepositoryMongoDB } from "../../database/mongodb/respositories/postRepositoryDatabase";
import { postDBRepository } from "../../../application/repositories/PostDBRepository";

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
  router.post("/reportpost", authMiddleware, controller.reportPost);
  router.post("/savepost", authMiddleware, controller.savePost);
  router.post("/likepost", authMiddleware, controller.likePost);
  router.post("/dislikepost", authMiddleware, controller.dislikePost);
  router.get("/getlikedposts/:userId", authMiddleware, controller.getlikedposts);
  router.get("/getdislikedposts/:userId", authMiddleware, controller.getdislikedposts);

  return router;
};

export default postRouter;
