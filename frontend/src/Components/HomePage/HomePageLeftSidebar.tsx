import React, { useState } from "react";
import { FaHome, FaPlusCircle, FaCommentAlt, FaPhoneAlt, FaUserFriends, FaCog, FaUser, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsExposure } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";

const LeftSidebar = ({ isLeftSidebarOpen, toggleDarkMode, isDarkMode, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const home = () => navigate("/home");
  const profile = () => navigate("/profile");
  const settings = () => navigate("/settings");
  const findFriends = () => navigate("/friends");
  const addPost = () => navigate("/addpost");
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const buttonClasses = "flex items-center justify-center w-full p-2 rounded  transition-colors duration-300";
  const buttonHoverClasses = "hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-black";
  const activeButtonClasses = "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white dark:text-black shadow-lg";

  const isActive = (path) => location.pathname === path ? activeButtonClasses : "";

  return (
    <aside className="h-full flex pl-2 pt-2 pb-2 bg-slate-900 dark:bg-slate-700 shadow-lg">
      <div className={`bg-gray-800 rounded-lg dark:bg-gray-800 ${isCollapsed ? "w-16" : "w-64"} ${isLeftSidebarOpen ? "block" : "hidden"} lg:block transition-all duration-300`}>
        <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar flex flex-col items-center">
          <button onClick={toggleCollapse} className="mb-2 p-2 bg-gray-700 text-white rounded-full">
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
          <div className="flex flex-col gap-2 w-full items-center">
            <button onClick={home} className={`${buttonClasses} ${buttonHoverClasses} ${isActive("/home")}`}>
              <FaHome className="inline-block mr-2" />
              {!isCollapsed && "Home"}
            </button>
            <button className={`${buttonClasses} ${buttonHoverClasses} ${isActive("/explore")}`}>
              <BsExposure className="inline-block mr-2" />
              {!isCollapsed && "Explore"}
            </button>
            <button onClick={addPost} className={`${buttonClasses} ${buttonHoverClasses} ${isActive("/addpost")}`}>
              <FaPlusCircle className="inline-block mr-2" />
              {!isCollapsed && "Add Post"}
            </button>
            <button className={`${buttonClasses} ${buttonHoverClasses} ${isActive("/chats")}`}>
              <FaCommentAlt className="inline-block mr-2" />
              {!isCollapsed && "Chats"}
            </button>
            <button className={`${buttonClasses} ${buttonHoverClasses} ${isActive("/calls")}`}>
              <FaPhoneAlt className="inline-block mr-2" />
              {!isCollapsed && "Calls"}
            </button>
            <button onClick={findFriends} className={`${buttonClasses} ${buttonHoverClasses} ${isActive("/friends")}`}>
              <FaUserFriends className="inline-block mr-2" />
              {!isCollapsed && "Friends"}
            </button>
            <button onClick={profile} className={`${buttonClasses} ${buttonHoverClasses} ${isActive("/profile")}`}>
              <FaUser className="inline-block mr-2" />
              {!isCollapsed && "Profile"}
            </button>
            <button onClick={settings} className={`${buttonClasses} ${buttonHoverClasses} ${isActive("/settings")}`}>
              <FaCog className="inline-block mr-2" />
              {!isCollapsed && "Settings"}
            </button>
            <button onClick={toggleDarkMode} className={`${buttonClasses} ${buttonHoverClasses}`}>
              {!isCollapsed ? (isDarkMode ? "Light Mode" : "Dark Mode") : (isDarkMode ? "🌙" : "☀️")}
            </button>
            <button onClick={handleLogout} className={`${buttonClasses} bg-red-600 hover:bg-red-700`}>
              <FaUser className="inline-block mr-2" />
              {!isCollapsed && "Logout"}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;


