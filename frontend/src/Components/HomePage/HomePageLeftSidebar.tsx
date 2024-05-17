import React from "react";

const LeftSidebar = ({
  isLeftSidebarOpen,
  toggleDarkMode,
  isDarkMode,
  handleLogout,
}) => {
  return (
    <aside
      className={`bg-gray-800 dark:bg-gray-700 pt-2 pb-2 pl-2 w-64 ${
        isLeftSidebarOpen ? "block" : "hidden"
      } md:block`}>
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-2">
          <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0 font-bold hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            Home
          </button>

          <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0 font-bold hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            Explore
          </button>

          <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0 font-bold hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            Chats
          </button>

          <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0 font-bold hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            Calls
          </button>

          <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0 font-bold hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            Friends
          </button>
          <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0 font-bold hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            Search
          </button>
          <button className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0 font-bold hover:bg-slate-600  hover:dark:bg-slate-200 hover:dark:text-black hover:text-white">
            Settings
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

export default LeftSidebar;
