import React, { useState } from "react";
import { FaHome, FaPlusCircle, FaCommentAlt, FaPhoneAlt, FaUserFriends, FaCog, FaUser, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsExposure } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const LeftSidebar = ({ isLeftSidebarOpen, toggleDarkMode, isDarkMode, handleLogout }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const home = () => {
    navigate("/home");
  };

  const profile = () => {
    navigate("/profile");
  };

  const settings = () => {
    navigate("/settings");
  };

  const findFriends = () => {
    navigate("/friends");
  };

  const addPost = () => {
    navigate("/addpost")
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`bg-gray-800 dark:bg-gray-700 pt-2 pl-2 pb-2 ${isCollapsed ? "w-16" : "w-64"} ${isLeftSidebarOpen ? "block" : "hidden"} lg:block transition-all duration-300`}>
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar flex flex-col items-center">
        <button onClick={toggleCollapse} className="mb-2  p-2 bg-gray-800 text-white rounded-full">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
        <div className="flex flex-col gap-2 w-full items-center">
          <button onClick={home} className="flex items-center justify-center w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded font-bold hover:bg-slate-600 hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            <FaHome className="inline-block mr-2" />
            {!isCollapsed && "Home"}
          </button>
          <button className="flex items-center justify-center w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded font-bold hover:bg-slate-600 hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            <BsExposure className="inline-block mr-2" />
            {!isCollapsed && "Explore"}
          </button>
          <button onClick={addPost} className="flex items-center justify-center w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded font-bold hover:bg-slate-600 hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            < FaPlusCircle className="inline-block mr-2" />
            {!isCollapsed && "Add Post"}
          </button>
          <button className="flex items-center justify-center w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded font-bold hover:bg-slate-600 hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            <FaCommentAlt className="inline-block mr-2" />
            {!isCollapsed && "Chats"}
          </button>
          <button className="flex items-center justify-center w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded font-bold hover:bg-slate-600 hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            <FaPhoneAlt className="inline-block mr-2" />
            {!isCollapsed && "Calls"}
          </button>
          <button onClick={findFriends} className="flex items-center justify-center w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded font-bold hover:bg-slate-600 hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            <FaUserFriends className="inline-block mr-2" />
            {!isCollapsed && "Friends"}
          </button>
          <button onClick={profile} className="flex items-center justify-center w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded font-bold hover:bg-slate-600 hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            <FaUser className="inline-block mr-2" />
            {!isCollapsed && "Profile"}
          </button>
          <button onClick={settings} className="flex items-center justify-center w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded font-bold hover:bg-slate-600 hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            <FaCog className="inline-block mr-2" />
            {!isCollapsed && "Settings"}
          </button>
          <button onClick={toggleDarkMode} className="flex items-center justify-center w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded font-bold hover:bg-slate-600 hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            {!isCollapsed ? (isDarkMode ? "Light Mode" : "Dark Mode") : (isDarkMode ? "🌙" : "☀️")}
          </button>
          <button onClick={handleLogout} className="flex items-center justify-center w-full bg-red-500 hover:bg-red-700 text-white p-2 rounded font-bold">
            <FaUser className="inline-block mr-2" />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
