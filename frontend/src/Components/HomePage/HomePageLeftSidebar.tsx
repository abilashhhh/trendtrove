import React from "react";

const LeftSidebar = ({ isLeftSidebarOpen,  toggleDarkMode, isDarkMode, handleLogout  }) => {
  return (
    <aside
      className={`bg-gray-800 dark:bg-gray-700 pt-2 pb-2 pl-2 w-64 ${
        isLeftSidebarOpen ? "block" : "hidden"
      } md:block`}
    >
      <div className="p-4 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Left Sidebar</h2>
          <p>Some content for the left sidebar</p>
          <p>Some content for the left sidebar</p>
          <p>Some content for the left sidebar</p>
          <p>Some content for the left sidebar</p>
          <p>Some content for the left sidebar</p>
          <button
          onClick={toggleDarkMode}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded ml-4 md:ml-0"
        >
          Logout
        </button>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;