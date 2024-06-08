import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserAuthSlice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./HomePage/HomePageHeaderComponent";
import LeftSidebar from "./HomePage/HomePageLeftSidebar";
import BottomNavBar from "./HomePage/HomePageLeftSidebarMobileView";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(true);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

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
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar
            isLeftSidebarOpen={isLeftSidebarOpen}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            handleLogout={handleLogout}
          />
          {children}
        </div>
        <BottomNavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      </div>
    </>
  );
};

export default Layout;