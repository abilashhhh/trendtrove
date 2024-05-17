import React from "react";

const Header = ({  toggleLeftSidebar }) => {
  return (
    <div className="bg-gray-800 dark:bg-gray-700 pl-2 pr-2 pt-2">
      <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white p-4 flex justify-between items-center rounded-lg">
        <div className="space-x-4 md:hidden flex">
          <button onClick={toggleLeftSidebar}>☰</button>
        </div>
        <h1 className="text-2xl flex items-center">
          <span className="text-gray-500 dark:text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            Trend
          </span>
          <span className="ml-1 text-black dark:text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold">
            Trove
          </span>
        </h1>
       
      </div>
    </div>
  );
};

export default Header;