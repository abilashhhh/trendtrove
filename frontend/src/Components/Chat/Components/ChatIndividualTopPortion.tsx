import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import useConversation from "../../../Hooks/useConversations";
import { useSocketContext } from "../../../Context/SocketContext";
import { IoIosCall } from "react-icons/io";
import { RxDotsVertical } from "react-icons/rx";
import { MdVideoCall } from "react-icons/md";

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

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(selectedConversation._id);

  return (
    <div className="h-16 bg-gray-300 dark:bg-gray-700 rounded-lg shadow-sm flex items-center p-4">
      <FaArrowLeft
        className="text-xl cursor-pointer mr-4 text-gray-900 dark:text-gray-100 md:hidden"
        onClick={handleBackClick}
      />
      <div className="flex-shrink-0 mr-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            alt={`${selectedConversation.username}'s avatar`}
            src={selectedConversation.dp}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {selectedConversation.username}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {isOnline ? "Online" : "Offline"}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <IoIosCall className="text-2xl text-gray-900 dark:text-gray-100 cursor-pointer" />
        <MdVideoCall className="text-2xl text-gray-900 dark:text-gray-100 cursor-pointer" />
        <RxDotsVertical  className="text-2xl text-gray-900 dark:text-gray-100 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatIndividualTopPortion;
