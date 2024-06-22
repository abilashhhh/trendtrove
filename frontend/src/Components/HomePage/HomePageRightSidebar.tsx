import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import useUserDetails from "../../Hooks/useUserDetails";
import { rightSidebar } from "../../API/Profile/profile";
import { IoAddCircleSharp } from "react-icons/io5";

const RightSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const currentUser = useUserDetails();
  const [showAddStory, setShowAddStory] = useState(false);


  useEffect(() => {
    if (currentUser.isRightSidebarOpen !== undefined) {
      setIsOpen(currentUser.isRightSidebarOpen);
    }
  }, [currentUser.isRightSidebarOpen]);

 

  const toggleSidebar = useCallback(async () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
    await rightSidebar();
  }, []);

  const handleAddStory = async () => {
  console.log("handleAddStory callsed")
  setShowAddStory(false);
    // try {
    //   const response = await deleteMessage(message._id);
    //   if (response.error) throw new Error(response.error);
    //   message.message = null;
    //   message.mediaUrl = null;
    //   message.fileType = null;
    //   toast.success("Message deleted successfully");
    //   setShowConfirmDelete(false);
    // } catch (error: any) {
    //   toast.error(`Error deleting message: ${error.message}`);
    // }
  };

  const handleCancelStory = () => {
  setShowAddStory(false);

  }

  const items = useMemo(
    () =>
      [...Array(18)].map((_, index) => (
        <div
          key={index}
          className={`relative overflow-hidden rounded-lg ${
            isOpen ? "h-60" : "w-full h-24"
          } `}>
          <img
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Story"
            className="object-cover w-full h-full"
          />
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 py-1 px-2 text-white text-center ${
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
      } md:block p-2 hidden bg-gray-800 dark:bg-gray-700 transition-width duration-300 ease-in-out h-full`}>
      <div className="flex flex-col items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <div className="flex justify-center mb-2 w-full">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-gray-800 text-white rounded-full">
            <FaChevronLeft className={`${isOpen ? "hidden" : "block"}`} />
            <FaChevronRight className={`${isOpen ? "block" : "hidden"}`} />
          </button>
        </div>
        {isOpen && (
          <h2 className="text-lg font-semibold underline text-center">
            Latest Trends
          </h2>
        )}
             <div
          className={`grid gap-2 w-full ${
            isOpen ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          }`}>
          <div
            onClick={() => setShowAddStory(true)}
            className={`relative overflow-hidden rounded-lg transition-all flex flex-col duration-300 ${
              isOpen ? "h-60" : "h-24"
            } bg-slate-400 dark:bg-slate-700  hover:bg-slate-300 hover:dark:bg-slate-800 dark:text-white p-4 cursor-pointer flex items-center justify-center`}>
            <div>
              <IoAddCircleSharp size={40} className="text-slate-900 dark:text-slate-100 group-hover:text-zinc-800" />
            </div>
            <div
              className={`text-slate-900 dark:text-slate-100 font-semibold items-center justify-center align-middle ${
                isOpen ? "text-lg" : "text-sm"
              }`}>
              Add Story
            </div>
          </div>
          {items}
        </div>

        {showAddStory && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm mx-auto">
            <p className="text-center mb-4 text-black dark:text-white">
              Are you sure you want to delete this message?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAddStory}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">
                Add Story
              </button>
              <button
                onClick={handleCancelStory}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </aside>
  );
};

export default React.memo(RightSidebar);


