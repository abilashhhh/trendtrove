import React from "react";
import TrendTroveLogo from "../Logo/TrendTroveLogo";

const AdminPageMiddleContainer = () => {
  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold">Welcome to the admin page</h1>
         
        <img src="/TrendTroveLogo2.jpg" className="w-60 mt-4 rounded-full" alt="Trend Trove Logo" />
      </div>
    </main>
  );
};

export default AdminPageMiddleContainer;