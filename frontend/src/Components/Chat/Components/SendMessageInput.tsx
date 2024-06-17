import React, { useState } from "react";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import useSendMessages from "../../../Hooks/useSendMessages";
import useConversation from "../../../Hooks/useConversations";
import useUserDetails from "../../../Hooks/useUserDetails";

const SendMessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessages();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { selectedConversation } = useConversation();
  const currentUser = useUserDetails();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Message cannot be empty or just spaces.");
      return;
    }
    await sendMessage(message);
    setMessage("");
  };

  const canChat =
    !selectedConversation?.isPrivate ||
    selectedConversation?.followers.some(
      (follower: { userId: string }) => follower.userId === currentUser._id
    );

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 shadow-sm sticky bottom-0">
      {canChat && (
        <>
          <form className="flex items-center w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 mr-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              className="p-2 bg-gray-300 dark:bg-gray-700 text-yellow-500 rounded-lg mr-2"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FaSmile />
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? <div className="loading loading-spinner"></div> : "Send"}
            </button>
          </form>
          {showEmojiPicker && (
            <div className="absolute bottom-16 right-4">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SendMessageInput;
