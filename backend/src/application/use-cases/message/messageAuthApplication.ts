import ErrorInApplication from "../../../utils/ErrorInApplication";
import { MessageDBInterface } from "../../repositories/MessageDBRepository";

export const handleSendMessage = async (
  senderId: string,
  receiverId: string,
  message: string,
  dbMessageRepository: ReturnType<MessageDBInterface>
) => {
  try {
    const sendMessage = await dbMessageRepository.sendMessage(
      senderId,
      receiverId,
      message
    );
console.log("sendMessage from msg auth app:" ,sendMessage)

    return sendMessage;
  } catch (error) {
    console.error("Error in handleSendMessage:", error);
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to send the message", 500);
  }
};

export const handleGetMessage = async (
  senderId: string,
  receiverId: string,
  dbMessageRepository: ReturnType<MessageDBInterface>
) => {
  try {
    const getMessage = await dbMessageRepository.getMessages(
      senderId,
      receiverId
    );
    return getMessage;
  } catch (error) {
    console.error("Error in handleGetMessage:", error);
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get the messages", 500);
  }
};



export const handleGetFriendsInfo = async (
  userId: string,
  dbMessageRepository: ReturnType<MessageDBInterface>
) => {
  try {
    const getMessage = await dbMessageRepository.getFriendsInfo(
      userId
    );
    return getMessage;
  } catch (error) {
    console.error("Error in handleGetFriendsInfo:", error);
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to get the friends info", 500);
  }
};


