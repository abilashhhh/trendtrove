import ErrorInApplication from "../../../utils/ErrorInApplication";
import { MessageDBInterface } from "../../repositories/MessageDBRepository";

export const handleSendMessage = async (
  dbMessageRepository: ReturnType<MessageDBInterface>
) => {
  const userId = "213";
  const user = await dbMessageRepository.sendMessage(userId);
};
