import React, { useEffect, useRef } from "react";
import IndividualMessage from "./Components/IndividualMessage";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "./Components/MessageSkeleton";
import useListenMessages from "../../Hooks/useListenMessages";
import useConversation from "../../Hooks/useConversations";
import { useNavigate } from "react-router-dom";
import useUserDetails from "../../Hooks/useUserDetails";

const ChatCenter: React.FC = () => {
  const { messages, loading, getMessages } = useGetMessages();
  const { selectedConversation } = useConversation();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useListenMessages();

  

  useEffect(() => {
    if (selectedConversation?._id) {
      getMessages();
  
   
    }
  }, [messages.length]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 
  const currentUser = useUserDetails();
  const navigate = useNavigate();

  const isPrivateAndNotAFollower =
    selectedConversation?.isPrivate &&
    !selectedConversation?.followers.some(
      (follower: { userId: string }) => follower.userId === currentUser._id
    );

  const canChat =
    !selectedConversation?.isPrivate ||
    selectedConversation?.followers.some(
      (follower: { userId: string }) => follower.userId === currentUser._id
    );

  return (
    <div className="flex-grow overflow-y-auto mt-4 h-96 no-scrollbar">
      {!loading && isPrivateAndNotAFollower && (
        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 h-full">
          <div>
            Please send a request to chat with{" "}
            <span
              className="cursor-pointer"
              onClick={() => {
                navigate(`/profiles/${selectedConversation.username}`);
              }}>
              {" "}
              @{selectedConversation.username}{" "}
            </span>
          </div>
          <div
            className="cursor-pointer font-bold text-red-600"
            onClick={() => {
              navigate(`/profiles/${selectedConversation.username}`);
            }}>
            View Profile
          </div>
        </div>
      )}

      {!loading && canChat && (
        <>
          {Array.isArray(messages) && messages.length > 0 ? (
            <div className="flex-grow overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={message._id}
                  ref={index === messages.length - 1 ? lastMessageRef : null}>
                  <IndividualMessage message={message} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 h-full">
              Send a message and start chatting
            </div>
          )}
        </>
      )}

      {loading && (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, idx) => (
            <MessageSkeleton key={idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatCenter;
