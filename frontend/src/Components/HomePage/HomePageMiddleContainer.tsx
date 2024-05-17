import React from "react";

const MiddleContainer = () => {
  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-semibold">Main Content</h1>
        <p>This is the main content of the page.</p>
      </div>
    </main>
  );
};

export default MiddleContainer;