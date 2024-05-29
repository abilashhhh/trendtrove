import React from "react";
import { FaHome, FaUserFriends, FaPlusSquare, FaCog, FaCommentAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomNavBar = ({ toggleDarkMode, isDarkMode }) => {
  const navigate = useNavigate();
  const navHeight = 45; // Set this to the height of your nav bar in pixels

  return (
    <>
      <div className="block md:hidden" style={{ height: navHeight }} />
      <nav
        className="fixed bottom-0 left-0 right-0 bg-gray-800 dark:bg-gray-900  shadow-lg  flex justify-between md:hidden"
        style={{ height: navHeight }}
      >
        <button onClick={() => navigate("/home")} className="text-white p-2 flex flex-col items-center">
          <FaHome className="text-xl" />
          <span className="text-xs">Home</span>
        </button>
        <button onClick={() => navigate("/friends")} className="text-white p-2 flex flex-col items-center">
          <FaUserFriends className="text-xl" />
          <span className="text-xs">Friends</span>
        </button>
        <button onClick={() => navigate("/addpost")} className="text-white p-2 flex flex-col items-center">
          <FaPlusSquare className="text-xl" />
          <span className="text-xs">Post</span>
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
    </>
  );
};

export default BottomNavBar;
