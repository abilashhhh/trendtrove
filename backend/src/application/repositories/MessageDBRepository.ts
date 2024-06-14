import { MessagesRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/messageRepositoryDatabase";

export const messageDBRepository = (
  repository: ReturnType<MessagesRepositoryMongoDB>
) => {
  const sendMessage = async (senderId: string, receiverId: string, message: string) => {
    await repository.sendMessage(senderId, receiverId, message);
  };

  const getMessages = async (senderId: string, receiverId: string) => {
    return await repository.getMessages(senderId, receiverId);
  };

  return {
    sendMessage,
    getMessages,
  };
};

export type MessageDBInterface = typeof messageDBRepository;
