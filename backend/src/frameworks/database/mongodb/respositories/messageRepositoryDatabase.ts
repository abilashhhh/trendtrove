import ErrorInApplication from "../../../../utils/ErrorInApplication";
import Conversation from "../models/conversationModel";
import Message from "../models/messageModel";

export const messageRepositoryMongoDB = () => {
  
  const sendMessage = async (
    senderId: string,
    receiverId: string,
    message: string
  ) => {
    try {
      console.log("send message reached, senderId:", senderId, "receiverId:", receiverId, "message:", message);

      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = await Message.create({ senderId, receiverId, message });
      console.log("conversation: ", conversation);
      console.log("new message: ", newMessage);

      if (newMessage) {
        conversation.messages.push(newMessage._id);
        await conversation.save();  // Save the updated conversation with the new message
      }

      return newMessage;
    } catch (error: any) {
      console.log(
        "Error in send message, messageRepositoryDatabase",
        error.message
      );
      throw new Error("Error in sending message!");
    }
  };

  return {
    sendMessage,
  };
};

export type MessageRepositoryMongoDB = ReturnType<typeof messageRepositoryMongoDB>;
