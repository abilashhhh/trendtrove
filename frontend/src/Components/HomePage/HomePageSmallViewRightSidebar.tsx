import React from "react";

const SmallViewRightSidebar = () => {
  return (
    <div className="block md:hidden bg-gray-800 dark:bg-gray-700 pl-2 pr-2 pt-2">
      <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white overflow-x-auto flex gap-2 no-scrollbar">
        
        {/* Add circular story views */}
        <div className="bg-white h-16 w-16 rounded-full overflow-hidden p-0.5 flex-shrink-0">
          <img
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Story"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="bg-white h-16 w-16 rounded-full overflow-hidden p-0.5 flex-shrink-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzuGvSdLLmAgWiCTgUD-6-7GCA_t35cM4o7w3WQXq2w&s"
            alt="Story"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="bg-white h-16 w-16 rounded-full overflow-hidden p-0.5 flex-shrink-0">
          <img
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Story"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="bg-white h-16 w-16 rounded-full overflow-hidden p-0.5 flex-shrink-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzuGvSdLLmAgWiCTgUD-6-7GCA_t35cM4o7w3WQXq2w&s"
            alt="Story"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="bg-white h-16 w-16 rounded-full overflow-hidden p-0.5 flex-shrink-0">
          <img
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Story"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
        <div className="bg-white h-16 w-16 rounded-full overflow-hidden p-0.5 flex-shrink-0">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYzuGvSdLLmAgWiCTgUD-6-7GCA_t35cM4o7w3WQXq2w&s"
            alt="Story"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SmallViewRightSidebar;
