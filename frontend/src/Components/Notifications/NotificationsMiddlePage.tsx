import React from 'react';
import { ToastContainer } from 'react-toastify';
import IndividualNotifications from './IndividualNotifications';

const NotificationsMiddlePage = () => {
  return (
    <>
      <ToastContainer />
      <main className="flex-1 pt-1 pr-2 pl-2  lg:pb-2 pb-1 bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 h-full">
          <div className="flex flex-col md:flex-row gap-1 h-full w-full overflow-auto no-scrollbar">
            <IndividualNotifications />
          </div>
        </div>
      </main>
    </>
  );
}

export default NotificationsMiddlePage;
