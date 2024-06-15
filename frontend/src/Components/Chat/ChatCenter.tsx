import React, { useState } from "react";
import IndividualMessage from "./Components/IndividualMessage";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "./Components/MessageSkeleton";

const ChatCenter: React.FC = () => {
  const { messages, loading } = useGetMessages();
  console.log("messages : ", messages);
  return (
    <>
      {loading && (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, idx) => (
            <MessageSkeleton key={idx} />
          ))}
        </div>
      )}

      {!loading && messages?.data?.length === 0 && (
        <div className="flex-grow flex items-center justify-center text-gray-500 dark:text-gray-400">
          Send a message and start chatting
        </div>
      )}

      {!loading && messages?.data?.length > 0 && (
        <div className="flex-grow overflow-y-auto mt-4">
          {messages.data.map(message => (
            <IndividualMessage key={message._id} message={message} />
          ))}
        </div>
      )}
    </>
  );
};

export default ChatCenter;
