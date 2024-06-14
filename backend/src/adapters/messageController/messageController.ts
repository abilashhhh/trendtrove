import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import { PostDBInterface } from "../../application/repositories/postDBRepository";
import { MessageDataInterface } from "../../types/messageInterface";
import { handleSendMessage } from "../../application/use-cases/message/messageAuthApplication";
import { MesasgeRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/messageRepositoryDatabase";
import { MessageDBInterface } from "../../application/repositories/MessageDBRepository";

const messageController = (
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  postDBRepositoryImplementation: PostRepositoryMongoDB,
  postDBRepositoryInterface: PostDBInterface,
  authServiceImplementation: AuthService,
  authenticationServiceInterface: AuthServiceInterface,
  messageDBRepositoryImplementation : MesasgeRepositoryMongoDB,
  messageDBRepositoryInterface : MessageDBInterface
) => {
  const dbUserRepository = userDBRepositoryInterface(
    userDBRepositoryImplementation()
  );
  const dbPostRepository = postDBRepositoryInterface(
    postDBRepositoryImplementation()
  );
  const authService = authenticationServiceInterface(
    authServiceImplementation()
  );
  const dbMessageRepository = messageDBRepositoryInterface(
    messageDBRepositoryImplementation()
  );


  const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    const sendData: MessageDataInterface = req.body;
    const createPost = await handleSendMessage(
      dbMessageRepository
    );
    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      data: createPost,
    });
  });

  return {
    sendMessage
  };
};

export default messageController;
