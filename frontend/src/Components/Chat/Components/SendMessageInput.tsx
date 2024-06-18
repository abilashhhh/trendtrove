import React, { useState } from "react";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  FaPaperPlane,
  FaSmile,
  FaImage,
  FaVideo,
  FaFileAudio,
} from "react-icons/fa";
import useSendMessages from "../../../Hooks/useSendMessages";
import useConversation from "../../../Hooks/useConversations";
import useUserDetails from "../../../Hooks/useUserDetails";
import { FiPaperclip } from "react-icons/fi";

const SendMessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileIcons, setShowFileIcons] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { sendMessage } = useSendMessages();
  const { selectedConversation } = useConversation();
  const currentUser = useUserDetails();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) {
      toast.error("Message or file cannot be empty.");
      return;
    }
    setLoading(true);

    try {
      await sendMessage(message, selectedFile);
      toast.success("Message sent successfully!");
      setMessage("");
      setSelectedFile(null);
    } catch (error: any) {
      toast.error(`Error sending message: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage(prevMessage => prevMessage + emojiData.emoji);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const toggleFileIcons = () => {
    setShowFileIcons(prev => !prev);
  };

  const handleFileInputClick = (fileType: string) => {
    const input = document.getElementById(`${fileType}Input`);
    if (input) {
      (input as HTMLInputElement).click();
    }
  };

  const canChat =
    !selectedConversation?.isPrivate ||
    selectedConversation?.followers.some(
      (follower: { userId: string }) => follower.userId === currentUser._id
    );

  return (
    <div className="bg-gray-100 dark:bg-gray-800 shadow-sm sticky bottom-0 p-4">
      {canChat && (
        <>
          <form className="flex items-center w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="flex-grow p-2 mr-2 rounded-lg border border-gray-700 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              aria-label="Toggle Emoji Picker"
              className="p-2 bg-gray-300 dark:bg-gray-700 text-yellow-500 rounded-lg mr-2"
              onClick={() => setShowEmojiPicker(prev => !prev)}>
              <FaSmile />
            </button>
            <button
              type="button"
              aria-label="Attach File"
              className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg mr-2"
              onClick={toggleFileIcons}>
              <FiPaperclip />
            </button>
            <button
              type="submit"
              aria-label="Send Message"
              className="p-2 bg-blue-500 text-white rounded-lg"
              disabled={loading}>
              {loading ? (
                <div className="loading loading-spinner"></div>
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </form>

          {showEmojiPicker && (
            <div className="absolute bottom-16 right-4">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          {showFileIcons && (
            <div className="absolute bottom-16 right-4 flex  rounded-lg">
              <div
                className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg cursor-pointer"
                onClick={() => handleFileInputClick('image')}>
                <FaImage />
              </div>
              <div
                className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg cursor-pointer ml-2"
                onClick={() => handleFileInputClick('video')}>
                <FaVideo />
              </div>
              <div
                className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg cursor-pointer ml-2"
                onClick={() => handleFileInputClick('audio')}>
                <FaFileAudio />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="imageInput"
              />

              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                id="videoInput"
              />
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
                id="audioInput"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SendMessageInput;
