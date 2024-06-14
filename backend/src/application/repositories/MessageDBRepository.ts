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
  const getFriendsInfo = async (userId: string) => {
    return await repository.getFriendsInfo(userId);
  };

  return {
    sendMessage,
    getMessages,
    getFriendsInfo
  };
};

export type MessageDBInterface = typeof messageDBRepository;
