import ErrorInApplication from "../../../../utils/ErrorInApplication";

export const messageRepositoryMongoDB = () => {
  const sendMessage = async (
    senderId: string,
    receiverId: string,
    message: string
  ) => {
    console.log("send message reached");
    console.log(
      "senderId :",
      senderId,
      " receiverId:",
      receiverId,
      "  message :",
      message
    );
  };

  return {
    sendMessage,
  };
};

export type MesasgeRepositoryMongoDB = typeof messageRepositoryMongoDB;
