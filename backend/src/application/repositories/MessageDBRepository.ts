import { MessagesRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/messageRepositoryDatabase";

export const messageDBRepository = (
  repository: ReturnType<MessagesRepositoryMongoDB>
) => {
  const sendMessage = async (senderId: string, receiverId: string, message: string) => {
    return  await repository.sendMessage(senderId, receiverId, message);
  };

  const editMessage = async (senderId: string,  messageId: string, message: string) =>  await repository.editMessage(senderId, messageId, message);
  

  const getMessages = async (senderId: string, receiverId: string) => {
    return await repository.getMessages(senderId, receiverId);
  };
  const getFriendsInfo = async (userId: string) => {
    return await repository.getFriendsInfo(userId);
  };

  return {
    sendMessage,
    getMessages,
    getFriendsInfo,
    editMessage
  };
};

export type MessageDBInterface = typeof messageDBRepository;
