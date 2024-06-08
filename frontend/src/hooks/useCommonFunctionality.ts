import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserAuthSlice/authSlice";
import { toast } from "react-toastify";

const useCommonFunctionality = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return {
    isLeftSidebarOpen,
    isDarkMode,
    loading,
    toggleDarkMode,
    toggleLeftSidebar,
    handleLogout
  };
};

export default useCommonFunctionality;
