 
import { useState } from "react";
import useConversation from "./useConversations";
import { toast } from "react-toastify";
import { sendMessageToUser } from "../API/Chat/chat";
import { Message } from "../Types/userProfile";
import { useSocketContext } from "../Context/SocketContext";
import useGetMessages from "./useGetMessages";

const useSendMessages = () => {
  const { socket } = useSocketContext();
  const [loading, setLoading] = useState(false);
  const { setMessages, selectedConversation } = useConversation();

  

  const sendMessage = async (message: string) => {
    if (!selectedConversation?._id) {
      toast.error("No conversation selected");
      return;
    }

    setLoading(true);
    try {
      const { data } = await sendMessageToUser(selectedConversation._id, message);
      if (data.error) throw new Error(data.error);

      socket?.emit("sendMessage", {
        senderId: data.senderId,
        receiverId: selectedConversation._id,
        message: data,
      });

      setMessages((prevMessages: Message[]) => [...prevMessages, data]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessages;

