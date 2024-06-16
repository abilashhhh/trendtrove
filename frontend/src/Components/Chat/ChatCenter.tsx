import React, { useEffect, useRef } from "react";
import IndividualMessage from "./Components/IndividualMessage";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "./Components/MessageSkeleton";

const ChatCenter: React.FC = () => {
  const { messages, loading } = useGetMessages();
  console.log("messages : ", messages);

  const lastMessageRef = useRef()
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behaior: "smooth"})
  })

  return (
    <div className="flex-grow overflow-y-auto mt-4 h-96 no-scrollbar">  
      {loading && (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, idx) => (
            <MessageSkeleton key={idx} />
          ))}
        </div>
      )}

      {!loading && messages?.data?.length === 0 && (
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 h-full">
          Send a message and start chatting
        </div>
      )}

      {!loading && messages?.data?.length > 0 && (
        <div className="flex-grow overflow-y-auto">
          {messages.data.map(message => (
            <div  key={message._id} ref={lastMessageRef}>
              <IndividualMessage message={message}  />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatCenter;
