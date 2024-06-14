import ErrorInApplication from "../../../../utils/ErrorInApplication";

export const messageRepositoryMongoDB = () => {
  const sendMessage = async (userId: string) => {
    console.log("send message reached");
    console.log(userId);
  };

  return {
    sendMessage,
  };
};

export type MesasgeRepositoryMongoDB = typeof messageRepositoryMongoDB;
