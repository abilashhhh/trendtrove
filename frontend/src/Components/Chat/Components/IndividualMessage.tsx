import React from "react";
import useConversation from "../../../Hooks/useConversations";
import useUserDetails from "../../../Hooks/useUserDetails";
import { Message } from "../../../Types/userProfile";

interface IndividualMessageProps {
  message: Message;
}

const IndividualMessage: React.FC<IndividualMessageProps> = ({ message }) => {
  const { selectedConversation } = useConversation();
  const currentUser = useUserDetails();

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-400">
        No conversation selected
      </div>
    );
  }

  const fromMe = message.senderId === currentUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? currentUser.dp : selectedConversation?.dp;
  const bubbleColor = fromMe ? 'bg-blue-300 dark:bg-blue-700' : 'bg-slate-300 dark:bg-slate-700';

  return (
    <div className={`chat mb-5 ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="User avatar" src={profilePic} />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 ml-2">12:45</time>
      </div>
      <div className={`chat-bubble text-black dark:text-white ${bubbleColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs mt-1">Delivered</div>
    </div>
  );
};

export default IndividualMessage;
