import { MesasgeRepositoryMongoDB } from "../../frameworks/database/mongodb/respositories/messageRepositoryDatabase";

export const messageDBRepository = (
  repository: ReturnType<MesasgeRepositoryMongoDB>
) => {
  
  const sendMessage = async (senderId: string,receiverId: string,message: string) => {
    await repository.sendMessage(senderId, receiverId, message)};

  return {
    sendMessage,
  };
};

export type MessageDBInterface = typeof messageDBRepository;
