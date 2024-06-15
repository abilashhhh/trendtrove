import React from "react";

const ChatCenter: React.FC = () => {
  
  return (
    <div className="flex-grow p-4 h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col">
      <div className="h-16 mb-5 -m-3 bg-gray-100 dark:bg-gray-900 rounded-t-lg shadow-sm flex items-center p-4">
        <div className="chat-image avatar mr-3">
          <div className="w-10 rounded-full">
            <img
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">Chat with Anakin</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Online</div>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        <div className="chat chat-start mb-4">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50 ml-2">12:45</time>
          </div>
          <div className="chat-bubble bg-blue-500 text-white">
            You were the Chosen One!
          </div>
          <div className="chat-footer opacity-50 text-xs mt-1">Delivered</div>
        </div>
        <div className="chat chat-end mb-4">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50 ml-2">12:46</time>
          </div>
          <div className="chat-bubble bg-green-500 text-white">I hate you!</div>
          <div className="chat-footer opacity-50 text-xs mt-1">Seen at 12:46</div>
        </div>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-b-lg shadow-sm">
        <form className="flex items-center">
          <input
            type="text"
            placeholder="Type your message"
            className="flex-grow p-2 mr-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button type="button" className="p-2 bg-blue-500 text-white rounded-lg">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatCenter;
