// import { useEffect } from "react";
// import { useSocketContext } from "../Context/SocketContext";
// import useConversation from "./useConversations";

// const useListenMessages = () => {
//   const { socket } = useSocketContext();
//   const { messages, setMessages } = useConversation();

//   useEffect(() => {
//     const handleNewMessage = (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     };

//     socket?.on("newMessage", handleNewMessage);

//     return () => {
//       socket?.off("newMessage", handleNewMessage);
//     };
//   }, [socket, setMessages]);

//   return null;
// };

// export default useListenMessages;



import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext";
import useConversation from "./useConversations";
import { Message } from "../Types/userProfile";
// import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
		socket?.on("newMessage", (newMessage: Message) => {
			newMessage.shouldShake = true;
			// const sound = new Audio(notificationSound);
			// sound.play();
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};

export default useListenMessages;
