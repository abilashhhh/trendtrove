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

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      await Promise.all([conversation.save(), newMessage.save()]);
      return newMessage;
    } catch (error: any) {
      console.log(
        "Error in send message, messageRepositoryDatabase",
        error.message
      );
      throw new Error("Error in sending message!");
    }
  };

  const getMessages = async (
    senderId: string,
    receiverId: string
  ) => {
    try {
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
      }).populate('messages');
      return conversation ? conversation.messages : [];
    } catch (error: any) {
      console.log(
        "Error in get messages, messageRepositoryDatabase",
        error.message
      );
      throw new Error("Error in getting messages!");
    }
  };

  return {
    sendMessage,
    getMessages,
  };
};

export type MessagesRepositoryMongoDB = typeof messageRepositoryMongoDB
