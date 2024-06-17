import React from "react";
import SendMessageInput from "./Components/SendMessageInput";
import ChatIndividualTopPortion from "./Components/ChatIndividualTopPortion";
import ChatCenter from "./ChatCenter";
 

const ChatInnerMain: React.FC = () => {

  return (
    <div className="flex-grow p-4 h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col">
      <ChatIndividualTopPortion />
      <ChatCenter />
      <SendMessageInput />
    </div>
  );
};

export default ChatInnerMain;
