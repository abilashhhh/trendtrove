import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import useConversation from "../../../Hooks/useConversations";

const ChatIndividualTopPortion = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const handleBackClick = () => {
    setSelectedConversation(null);
  };

  if (!selectedConversation) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-400">
        No conversation selected
      </div>
    );
  }

  return (
    <div className="h-16 mb-5 -m-3 bg-gray-100 dark:bg-gray-900 rounded-t-lg shadow-sm flex items-center p-4">
      <FaArrowLeft
        className="text-xl cursor-pointer mr-4 text-gray-900 dark:text-gray-100 md:hidden" // Hide on medium and larger screens
        onClick={handleBackClick}
      />
      <div className="chat-image avatar mr-3">
        <div className="w-10 rounded-full">
          <img
            alt={`${selectedConversation.username}'s avatar`}
            src={selectedConversation.dp}
          />
        </div>
      </div>
      <div>
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {selectedConversation.username}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Online</div>
      </div>
    </div>
  );
};

export default ChatIndividualTopPortion;
