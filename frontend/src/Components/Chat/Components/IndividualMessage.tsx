import React from "react";
import useConversation from "../../../Hooks/useConversations";
import useUserDetails from "../../../Hooks/useUserDetails";

const IndividualMessage = () => {
  const { selectedConversation } = useConversation();
  const currentUser = useUserDetails();

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-400">
        No conversation selected
      </div>
    );
  }
  return (
    <div className="flex-grow overflow-auto">
      <div className="chat chat-start mb-4">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="User avatar" src={selectedConversation.dp} />
          </div>
        </div>
        <div className="chat-header">
          Obi-Wan Kenobi
          <time className="text-xs opacity-50 ml-2">12:45</time>
        </div>
        <div className="chat-bubble bg-blue-500 text-white">
          You were the Chosen One! {selectedConversation._id}
        </div>
        <div className="chat-footer opacity-50 text-xs mt-1">Delivered</div>
      </div>

      <div className="chat chat-end mb-4">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="User avatar" src={currentUser.dp} />
          </div>
        </div>
        <div className="chat-header">
          Anakin
          <time className="text-xs opacity-50 ml-2">12:46</time>
        </div>
        <div className="chat-bubble bg-green-500 text-white">I hate you!</div>
        <div className="chat-footer opacity-50 text-xs mt-1">Seen at 12:46</div>
      </div>
    </div>
  );
};

export default IndividualMessage;
