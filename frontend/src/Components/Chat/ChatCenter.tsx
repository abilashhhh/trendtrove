import React, { useState } from "react";
import IndividualMessage from "./Components/IndividualMessage";
import SendMessageInput from "./Components/SendMessageInput";
import ChatIndividualTopPortion from "./Components/ChatIndividualTopPortion";

const ChatCenter: React.FC = () => {
  return (
    <div className="flex-grow p-4 h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col">
      <ChatIndividualTopPortion />
      <IndividualMessage />
      <SendMessageInput />
    </div>
  );
};

export default ChatCenter;
