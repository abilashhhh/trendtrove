import React, { useState } from "react";
import useSendMessages from "../../../Hooks/useSendMessages";

const SendMessageInput = () => {
  const [message, setMessage] = useState("");

  const { loading, sendMessage } = useSendMessages();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-b-lg shadow-sm">
      <form className="flex items-center">
        <input
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="flex-grow p-2 mr-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="p-2 bg-blue-500 text-white rounded-lg">
          {loading ? <div className="loading loading-spinner"> </div> : "Send"}
        </button>
      </form>
    </div>
  );
};

export default SendMessageInput;
