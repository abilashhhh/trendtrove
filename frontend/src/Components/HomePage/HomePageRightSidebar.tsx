import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useUserDetails from "../../Hooks/useUserDetails";
import { rightSidebar } from "../../API/Profile/profile";

const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const currentUser = useUserDetails();

  useEffect(() => {
    if (currentUser.isRightSidebarOpen !== undefined) {
      setIsOpen(currentUser.isRightSidebarOpen);
    }
  }, [currentUser.isRightSidebarOpen]);

  const toggleSidebar = useCallback(async () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    await rightSidebar();
  }, []);

  const items = useMemo(
    () => [...Array(18)].map((_, index) => (
      <div
        key={index}
        className={`relative overflow-hidden rounded-lg ${
          isOpen ? "h-60" : "w-full h-24"
        } bg-red-300`}
      >
        <img
          src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Story"
          className="object-cover w-full h-full"
        />
        <div className={`absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 py-1 px-2 text-white text-center ${
          isOpen ? "text-sm" : "text-xs"
        } font-semibold`}>
          sampleUser
        </div>
      </div>
    )),
    [isOpen]
  );

  return (
    <aside
      className={`${
        isOpen ? "md:w-72 w-full" : "w-28"
      } md:block p-2 hidden bg-gray-800 dark:bg-gray-700 transition-width duration-300 ease-in-out h-full`}
    >
      <div className="flex flex-col items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <div className="flex justify-center mb-2 w-full">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-800 text-white rounded-full"
          >
            <FaChevronLeft className={`${isOpen ? "hidden" : "block"}`} />
            < FaChevronRight className={`${isOpen ? "block" : "hidden"}`} />
          </button>
        </div>
        {isOpen && (
          <h2 className="text-lg font-semibold underline text-center">
            Latest Trends
          </h2>
        )}
        <div className={`grid gap-2 w-full ${isOpen ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
          {items}
        </div>
      </div>
    </aside>
  );
};

export default React.memo(RightSidebar);
