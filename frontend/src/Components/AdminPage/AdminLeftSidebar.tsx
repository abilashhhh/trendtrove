import React from "react";
import {
  FaHome,
  FaSearch,
  FaCommentAlt,
  FaPhoneAlt,
  FaUserFriends,
  FaCog,
  FaUser,
} from "react-icons/fa";
import { BsExposure } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AdminLeftSidebar = ({
  isLeftSidebarOpen,
  toggleDarkMode,
  isDarkMode,
  handleLogout,
}) => {
  const navigate = useNavigate();

  const home = () => {
    navigate("/adminhome");
  };

  const allUsers = () => {
    navigate("/adminusers");
  };

 

  return (
    <aside
      className={`bg-gray-800 dark:bg-gray-700 pt-2 pb-2 pl-2 w-64 ${
        isLeftSidebarOpen ? "block" : "hidden"
      } md:block`}>
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-2">
          <button
            onClick={home}
            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0 font-bold hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            <FaHome className="inline-block mr-2" />
            Home
          </button>

          <button
            onClick={allUsers}
            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0 font-bold hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            <FaUserFriends className="inline-block mr-2" />
            Users
          </button>

          <button
            onClick={toggleDarkMode}
            className="bg-gray-300 dark:bg-gray-700 text-black font-bold dark:text-white p-2 rounded ml-4 md:ml-0  hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500  hover:bg-red-700 hover:text-white text-white p-2 rounded ml-4 font-bold md:ml-0">
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminLeftSidebar;
