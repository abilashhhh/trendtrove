import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/HomePage/HomePageHeaderComponent";
import LeftSidebar from "../Components/HomePage/HomePageLeftSidebar";
import RightSidebar from "../Components/HomePage/HomePageRightSidebar";
import BottomNavBar from "../Components/HomePage/HomePageLeftSidebarMobileView";
import LoadingSpinner from "../Components/LoadingSpinner";
import useCommonFunctionality from "../hooks/useCommonFunctionality";

const PageLayout: React.FC = ({ children }) => {
  const {
    isLeftSidebarOpen,
    isDarkMode,
    loading,
    toggleDarkMode,
    toggleLeftSidebar,
    handleLogout
  } = useCommonFunctionality();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ToastContainer />
      <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
        <Header toggleLeftSidebar={toggleLeftSidebar} />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar
            isLeftSidebarOpen={isLeftSidebarOpen}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            handleLogout={handleLogout}
          />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
          <RightSidebar />
        </div>
        <BottomNavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </div>
    </>
  );
};

export default PageLayout;
