 
import React, { useEffect, useRef } from "react";
import IndividualMessage from "./Components/IndividualMessage";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "./Components/MessageSkeleton";
import useListenMessages from "../../Hooks/useListenMessages";
import useConversation from "../../Hooks/useConversations";

const ChatCenter: React.FC = () => {
  const { messages, loading, getMessages } = useGetMessages();
  const { selectedConversation } = useConversation();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useListenMessages();

  useEffect(() => {
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-grow overflow-y-auto mt-4 h-96 no-scrollbar">
      {!loading && Array.isArray(messages) && messages.length > 0 && (
        <div className="flex-grow overflow-y-auto">
          {messages.map((message, index) => (
            <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
              <IndividualMessage message={message} />
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, idx) => (
            <MessageSkeleton key={idx} />
          ))}
        </div>
      )}

      {!loading && Array.isArray(messages) && messages.length === 0 && (
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 h-full">
          Send a message and start chatting
        </div>
      )}
    </div>
  );
};

export default ChatCenter;
