import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatLeftSidebar from "./ChatLeftSidebar";
import ChatCenter from "./ChatCenter";

const ChatMiddlePage: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <main className="flex-1 pt-2 p-2 bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900  h-full">
          <div className="flex flex-col md:flex-row gap-1 h-full">
            <ChatLeftSidebar />
            <ChatCenter />
          </div>
        </div>
      </main>
    </>
  );
};

export default ChatMiddlePage;
