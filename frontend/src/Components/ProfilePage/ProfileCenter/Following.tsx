import React from "react";

const Following = () => {
  return (
    <aside className="hidden p-2 lg:block bg-gray-800 dark:bg-gray-700 h-screen w-64">
      <div className="p-4 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <h2 className="text-lg font-semibold mb-4 text-center underline">
          Following
        </h2>

        {[...Array(40)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 mb-2 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <h1 className="text-sm font-medium">Sample user</h1>
            <button className="bg-red-500 text-white text-sm rounded-md px-3 py-1 hover:bg-red-600 transition-colors duration-200">
              Unfollow
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Following;
