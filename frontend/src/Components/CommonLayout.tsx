// Components/CommonLayout.tsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './HomePage/HomePageHeaderComponent';
import LeftSidebar from './HomePage/HomePageLeftSidebar';
import BottomNavBar from './HomePage/HomePageLeftSidebarMobileView';
import { useCommonFunctionalityContext } from '../context/CommonFunctionalityContext';

const CommonLayout: React.FC = ({ children }) => {
  const {
    isLeftSidebarOpen,
    isDarkMode,
    toggleDarkMode,
    toggleLeftSidebar,
    handleLogout,
  } = useCommonFunctionalityContext();

  return (
    <>
      <ToastContainer />
      <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Header toggleLeftSidebar={toggleLeftSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar
            isLeftSidebarOpen={isLeftSidebarOpen}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            handleLogout={handleLogout}
          />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
        <BottomNavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </div>
    </>
  );
};

export default CommonLayout;
