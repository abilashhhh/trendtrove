import React, { useState, useEffect } from "react";
import "./styles.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserAuthSlice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/HomePage/HomePageHeaderComponent";
import LeftSidebar from "../Components/HomePage/HomePageLeftSidebar";
import RightSidebar from "../Components/HomePage/HomePageRightSidebar";
import LoadingSpinner from "../Components/LoadingSpinner";
import SettingsMiddlePage from "../Components/Settings/SettingsMiddlePage";
import BottomNavBar from "../Components/HomePage/HomePageLeftSidebarMobileView";

function SettingsPage() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(true);
  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      toast.error("Logging Out");
      setTimeout(() => {
        dispatch(logout());
      }, 3000);
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Log out failed");
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ToastContainer />

      <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
        <Header toggleLeftSidebar={toggleLeftSidebar} />

        {/* <SmallViewRightSidebar isDarkMode={isDarkMode} /> */}

        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar
            isLeftSidebarOpen={isLeftSidebarOpen}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            handleLogout={handleLogout}
          />

          <SettingsMiddlePage />

          {/* <RightSidebar /> */}
        </div>
        <BottomNavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </div>
    </>
  );
}

export default SettingsPage;
