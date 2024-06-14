 
    import React, { useEffect, useState } from "react";
    import { ToastContainer, toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";

    const ChatMiddlePage: React.FC = () => {
     

      return (
        <>
          <ToastContainer />
          <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full ">
              <div className="flex flex-col md:flex-row gap-2 h-full">
                 chat middle page
              </div>
            </div>
          </main>
        </>
      );
    };

    export default ChatMiddlePage;
