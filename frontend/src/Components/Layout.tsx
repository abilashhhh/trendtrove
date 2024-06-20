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
import useUserDetails from "../Hooks/useUserDetails";
import LoggingOut from "./LoggingOut";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [isDarkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const currentUser = useUserDetails();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.isDarkMode !== undefined) {
      setDarkMode(currentUser.isDarkMode);
    }
  }, [currentUser.isDarkMode]);

  useEffect(() => {
    if (currentUser.isLeftSidebarOpen !== undefined) {
      setLeftSidebarOpen(currentUser.isLeftSidebarOpen);
    }
  }, [currentUser.isLeftSidebarOpen]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(prevState => !prevState);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    setTimeout(async () => {
      try {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        toast.error("Logging Out");
        setTimeout(() => {
          dispatch(logout());
        }, 2000);
      } catch (error) {
        console.error("Logout failed", error);
        toast.error("Log out failed");
        setLoggingOut(false);
      }
    }, 2000);
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

  if (loggingOut) {
    return <LoggingOut />;
  }

  return (
    <>
      <ToastContainer />
      <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
        <Header
          toggleLeftSidebar={toggleLeftSidebar}
          userDetails={currentUser}
        />
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
