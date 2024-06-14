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
    return sendMessage;
  } catch (error) {
    console.error("Error in handleSendMessage:", error);
    if (error instanceof ErrorInApplication) {
      throw error;
    }
    throw new ErrorInApplication("Failed to send the message", 500);
  }
};
