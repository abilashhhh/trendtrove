 
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatLeftSidebar from "./ChatLeftSidebar";
import ChatCenter from "./ChatCenter";
import { FaComments } from "react-icons/fa";
import useConversation from "../../Hooks/useConversations";

const ChatMiddlePage: React.FC = () => {
  const [chatSelected, setChatSelected] = useState(false);

  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <>
      <ToastContainer />
      <main className="flex-1 pt-2 p-2 bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 h-full">
          <div className="flex flex-col md:flex-row gap-1 h-full">
            <ChatLeftSidebar setChatSelected={setChatSelected} />
            <div className="flex-grow">
              {!chatSelected ? <NoChatSelected /> : <ChatCenter />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChatMiddlePage;

function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg">
      <FaComments className="text-6xl mb-4 text-blue-500" />
      <div className="text-2xl font-semibold mb-2">No Chat Selected</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Please select a chat to start messaging.
      </div>
    </div>
  );
}
