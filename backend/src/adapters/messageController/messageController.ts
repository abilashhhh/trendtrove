import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AuthService } from "../../frameworks/services/authenticationService";
import { AuthServiceInterface } from "../../application/services/authenticationServiceInterface";
import { UserDBInterface } from "../../application/repositories/userDBRepository";
import { UserRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/userRepositoryDatabase";
import { PostRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/postRepositoryDatabase";
import { PostDBInterface } from "../../application/repositories/postDBRepository";
import { handleSendMessage, handleGetMessage, handleGetFriendsInfo, handleEditMessage } from "../../application/use-cases/message/messageAuthApplication";
import { MessagesRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/messageRepositoryDatabase";
import { MessageDBInterface } from "../../application/repositories/MessageDBRepository";

const messageController = (
  userDBRepositoryImplementation: UserRepositoryMongoDB,
  userDBRepositoryInterface: UserDBInterface,
  postDBRepositoryImplementation: PostRepositoryMongoDB,
  postDBRepositoryInterface: PostDBInterface,
  authServiceImplementation: AuthService,
  authenticationServiceInterface: AuthServiceInterface,
  messageDBRepositoryImplementation: MessagesRepositoryMongoDB,
  messageDBRepositoryInterface: MessageDBInterface
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
    const message = req.body.message;
    const { receiverId } = req.params;
    const senderId = req.body.userId;

    console.log("message:", message);
    console.log("receiverId:", receiverId);
    console.log("senderId:", senderId);
    const sendMessageResult = await handleSendMessage(
      senderId,
      receiverId,
      message,
      dbMessageRepository
    );
    console.log("sendMessagesResult:",sendMessageResult)
      res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      data: sendMessageResult,
    });
  });

  const editMessage = asyncHandler(async (req: Request, res: Response) => {
    const message = req.body.editedMessage;
    // const receiverId = req.body.receiverId;
    const { messageId } = req.params;
    const senderId = req.body.userId;

    console.log("message:", message);
    console.log("messageId:", messageId);
    console.log("senderId:", senderId);
    const editMessageResult = await handleEditMessage(
      senderId,
      // receiverId,
      messageId,
      message,
      dbMessageRepository
    );
    console.log("editMessagesResult:",editMessageResult)
      res.status(201).json({
      status: "success",
      message: "Message sent successfully",
      data: editMessageResult,
    });
  });

  const getMessages = asyncHandler(async (req: Request, res: Response) => {
    const { receiverId } = req.params;
    const senderId = req.body.userId;
    const getMessageResult = await handleGetMessage(
      senderId,
      receiverId,
      dbMessageRepository
    );
    res.status(200).json({
      status: "success",  message: "Got messages  successfully",
      data: getMessageResult,
    });
  });


  const getFriendsInfo = asyncHandler(async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;    
    const getMessageResult = await handleGetFriendsInfo(
      userId,
      dbMessageRepository
    );
    res.status(200).json({
      status: "success",  message: "Got friends info successfully",
      data: getMessageResult,
    });
  });

  return {
    sendMessage,
    getMessages,
    getFriendsInfo,
    editMessage
  };
};

export default messageController;
