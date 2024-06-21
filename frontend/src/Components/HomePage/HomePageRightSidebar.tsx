import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import useUserDetails from "../../Hooks/useUserDetails";
import { rightSidebar } from "../../API/Profile/profile";

const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useUserDetails();

  const toggleSidebar = async () => {
    setIsOpen(!isOpen);
    await rightSidebar();
  };

  useEffect(() => {
    if (currentUser.isRightSidebarOpen !== undefined) {
      setIsOpen(currentUser.isRightSidebarOpen);
    }
  }, [currentUser.isRightSidebarOpen]);

 


  return (
    <>
      <aside
        className={`${
          !isOpen ? "w-28" : "md:w-72 w-full"
        } md:block hidden bg-gray-800 dark:bg-gray-700 pt-2  pb-2 pl-2 transition-width duration-300 ease-in-out h-full`}
      >
        <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-900 mr-2 text-black dark:text-white h-full overflow-y-auto no-scrollbar flex flex-col items-center">
          <div className="flex mb-2 w-full justify-center">
            <button
              onClick={toggleSidebar}
              className="p-2 bg-gray-800 text-white rounded-full"
            >
              < FaChevronRight  className={`${!isOpen ? "hidden" : "block"}`} />
              < FaChevronLeft className={`${!isOpen ? "block" : "hidden"}`} />
            </button>
          </div>
          <h2
            className={`text-lg font-semibold underline text-center ${
              !isOpen ? "hidden" : "block"
            }`}
          >
            Latest Trends
          </h2>
          <div className={`grid ${!isOpen ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-2 w-full`}>
            {[...Array(18)].map((_, index) => (
              <div
                key={index}
                className={`${
                  !isOpen ? "w-full h-24" : "h-60"
                } bg-red-300 rounded-lg relative overflow-hidden`}
              >
                <img
                  src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt="Story"
                  className="object-cover w-full h-full"
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 py-1 px-2 text-white text-center ${
                    !isOpen ? "text-xs" : "text-sm"
                  } font-semibold`}
                >
                  sampleUser
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default RightSidebar;
