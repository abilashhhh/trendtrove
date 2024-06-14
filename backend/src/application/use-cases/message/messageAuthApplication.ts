import ErrorInApplication from "../../../utils/ErrorInApplication";
import { MessageDBInterface } from "../../repositories/MessageDBRepository";

export const handleSendMessage = async (
  senderId: string,
  receiverId: string,
  message:  string,
  dbMessageRepository: ReturnType<MessageDBInterface>
) => {
  const userId = "213";
  const user = await dbMessageRepository.sendMessage(senderId , receiverId, message);
};
