 
import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext";
import useConversation from "./useConversations";
import { Message } from "../Types/userProfile";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]);
};

export default useListenMessages;
