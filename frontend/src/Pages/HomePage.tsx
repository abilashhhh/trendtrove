import React, { useState } from "react";
import "./styles.css";
import { logoutUser } from "../API/Auth/auth";

function HomePage() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
    if (isRightSidebarOpen) {
      setRightSidebarOpen(false);
    }
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!isRightSidebarOpen);
    if (isLeftSidebarOpen) {
      setLeftSidebarOpen(false);
    }
  };


  const handleLogout = async () => {
    await logoutUser()
  }

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gray-800 dark:bg-gray-700 pl-2 pr-2 pt-2">
        <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white  p-4 flex justify-between items-center rounded-lg">
          <div className="space-x-4 md:hidden flex">
            <button onClick={toggleLeftSidebar}>☰ </button>
          </div>
          <h1 className="text-2xl flex items-center">
            <span className="text-gray-500 dark:text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Trend
            </span>
            <span className="ml-1 text-black dark:text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Trove
            </span>
          </h1>

          <div className="space-x-4 md:hidden flex">
            <button onClick={toggleRightSidebar}>☰ Right</button>
          </div>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white p-2 rounded ml-4 md:ml-0">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <aside
          className={`bg-gray-800 dark:bg-gray-700 pt-2 pb-2 pl-2 w-64 ${
            isLeftSidebarOpen ? "block" : "hidden"
          } md:block`}>
          <div className="p-4 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
            <div>
              <h2 className="text-lg font-semibold">Left Sidebar</h2>
              <p>Some content for the left sidebar</p>
            </div>
            <div className="bg-red-300">
              <button type="button" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </aside>

        {/* center    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <main className="flex-1 pt-2 p-2  overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white ">
          <div className="p-4   rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
            <h2 className="text-lg font-semibold">Main Content</h2>
            <p>This is the main content area.</p>{" "}
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
          </div>
        </main>

        {/* right Sidebar     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <aside
          className={`bg-gray-800 dark:bg-gray-700 pt-2 pr-2 pb-2 w-64 ${
            isRightSidebarOpen ? "block" : "hidden"
          } md:block`}>
          <div className="p-4 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
            <div className="text-lg font-semibold">Right Sidebar</div>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
            <p>Some content for the right sidebar</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default HomePage;
