import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import { authServiceInterface } from "../../../application/services/authenticationServiceInterface";
import { authService } from "../../services/authenticationService";
import { userDBRepository } from "../../../application/repositories/userDBRepository";
import { userRepositoryMongoDB } from "../../database/mongodb/respositories/userRepositoryDatabase";
import { postRepositoryMongoDB } from "../../database/mongodb/respositories/postRepositoryDatabase";
import { postDBRepository } from "../../../application/repositories/postDBRepository";
import messageController from "../../../adapters/messageController/messageController";
import { messageDBRepository } from "../../../application/repositories/MessageDBRepository";
import { messageRepositoryMongoDB } from "../../database/mongodb/respositories/messageRepositoryDatabase";

const messageRoutes = () => {
  const router = express.Router();

  const controller = messageController(
    userRepositoryMongoDB,
    userDBRepository,
    postRepositoryMongoDB,
    postDBRepository,
    authService,
    authServiceInterface,
    messageRepositoryMongoDB,
    messageDBRepository

  );

  router.post("/send/:userId", authMiddleware, controller.sendMessage);

  return router;
};

export default messageRoutes;
