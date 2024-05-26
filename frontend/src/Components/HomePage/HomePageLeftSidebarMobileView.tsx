import React from "react";
import { FaHome, FaUserFriends, FaPlusSquare, FaCog, FaCommentAlt  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomNavBar = ({ toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 dark:bg-gray-700 shadow-lg p-2 flex justify-between md:hidden">
      <button onClick={() => navigate("/home")} className="text-white p-2 flex flex-col items-center">
        <FaHome className="text-xl" />
        <span className="text-xs">Home</span>
      </button>
      <button onClick={() => navigate("/friends")} className="text-white p-2 flex flex-col items-center">
        <FaUserFriends className="text-xl" />
        <span className="text-xs">Friendds</span>
      </button>
      <button onClick={() => navigate("/add")} className="text-white p-2 flex flex-col items-center">
        <FaPlusSquare className="text-xl" />
        <span className="text-xs">Add</span>
      </button>
      <button onClick={() => navigate("/chats")} className="text-white p-2 flex flex-col items-center">
        <FaCommentAlt className="text-xl" />
        <span className="text-xs">Chats</span>
      </button>
      <button onClick={() => navigate("/settings")} className="text-white p-2 flex flex-col items-center">
        <FaCog className="text-xl" />
        <span className="text-xs">Settings</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;
