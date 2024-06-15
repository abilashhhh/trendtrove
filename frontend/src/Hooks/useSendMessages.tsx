import React, { useState } from "react";
import useConversation from "./useConversations";
import { toast } from "react-toastify";
import { sendMessageToUser } from "../API/Chat/chat";

const useSendMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message:string) => {
    setLoading(true);
    try {
      const data = await sendMessageToUser(selectedConversation?._id, message);
      if(data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessages;
