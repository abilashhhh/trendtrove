import React, { useState } from "react";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { FaPaperPlane, FaSmile, FaImage, FaVideo, FaFileAudio } from "react-icons/fa";
import useSendMessages from "../../../Hooks/useSendMessages";
import useConversation from "../../../Hooks/useConversations";
import useUserDetails from "../../../Hooks/useUserDetails";
import { FiPaperclip } from "react-icons/fi";
import useGetMessages from "../../../Hooks/useGetMessages";

const SendMessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileIcons, setShowFileIcons] = useState(false) 
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  
  const { sendMessage } = useSendMessages();
  const { selectedConversation } = useConversation();
  const currentUser = useUserDetails();
  const {  getMessages } = useGetMessages();


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
      getMessages()
    } catch (error) {
      toast.error(`Error sending message: ${error.message}`);
    } finally {
      setLoading(false); 
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
    // setShowEmojiPicker(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const toggleFileIcons = () => {
    setShowFileIcons((prev) => !prev);
  };
  const handleImageClick = () => {
    document.getElementById("fileInput")?.click();
    setSelectedFile((prevFile) => {
      if (prevFile?.type.includes("image")) {
        return prevFile;
      }
      return null;
    });
  };
  
  const handleVideoClick = () => {
    document.getElementById("fileInput")?.click();
    setSelectedFile((prevFile) => {
      if (prevFile?.type.includes("video")) {
        return prevFile;
      }
      return null;
    });
  };
  
  const handleAudioClick = () => {
    document.getElementById("fileInput")?.click();
    setSelectedFile((prevFile) => {
      if (prevFile?.type.includes("audio")) {
        return prevFile;
      }
      return null;
    });
  };

  const canChat =
    !selectedConversation?.isPrivate ||
    selectedConversation?.followers.some(
      (follower: { userId: string }) => follower.userId === currentUser._id
    );

  return (
    <div className=" bg-gray-100  dark:bg-gray-800 shadow-sm sticky bottom-0">
      {canChat && (
        <>
          <form className="flex items-center w-full" onSubmit={handleSubmit}>
           
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 mr-2 rounded-lg border border-gray-700 dark:border-gray-700 bg-white  dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
             <button
              type="button"
              className="p-2 bg-gray-300 dark:bg-gray-700 text-yellow-500 rounded-lg mr-2"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FaSmile />
            </button>
            <button
              type="button"
              className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg mr-2"
              onClick={toggleFileIcons} 
            >
              <FiPaperclip />
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-lg"
              disabled={loading}
            >
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
            <div className="absolute bottom-16 right-4 flex bg-slate-900 p-2 rounded-lg">
              <div
                className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg cursor-pointer"
                onClick={handleImageClick}
              >
                <FaImage />
              </div>
              <div
                className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg cursor-pointer ml-2"
                onClick={handleVideoClick}
              >
                <FaVideo />
              </div>
              <div
                className="p-2 bg-gray-300 dark:bg-gray-700 rounded-lg cursor-pointer ml-2"
                onClick={handleAudioClick}
              >
                <FaFileAudio />
              </div>
              <input
                type="file"
                accept="image/*, video/*, audio/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SendMessageInput;
