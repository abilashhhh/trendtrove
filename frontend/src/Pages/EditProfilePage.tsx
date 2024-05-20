 
import "./styles.css";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/UserAuthSlice/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Components/HomePage/HomePageHeaderComponent";
import LeftSidebar from "../Components/HomePage/HomePageLeftSidebar";
import EditProfileMainCenterComponent from "../Components/ProfilePage/EditProfileMainCenterComponent";
import HomePageRightSidebar from "../Components/HomePage/HomePageRightSidebar";
import SmallViewRightSidebar from "../Components/HomePage/HomePageSmallViewRightSidebar";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../Components/LoadingSpinner";
import { UserInfo } from "../Types/userProfile";
import { getUserInfo } from "../API/Profile/profile";
import { StoreType } from '../Redux/Store/reduxStore';

function EditProfilePage() {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  
  const initialUserInfo: UserInfo = {
    name: "",
    username: "",
    email: "",
    phone: undefined,
    password: "",
    dp: undefined,
    coverPhoto: undefined,
    bio: undefined,
    gender: undefined,
    address: undefined,
    isBlocked: false,
    isPrivate: false,
    isVerifiedAccount: false,
    isGoogleSignedIn: false,
    isPremium: false,
    refreshToken: null,
    refreshTokenExpiresAt: null,
    posts: [],
    requests: [],
    requested: [],
    followers: [],
    following: [],
    savedPosts: [],
    notifications: [],
    blockedUsers: [],
    createdAt: undefined,
    updatedAt: undefined,
  };
  
  const [userDetails, setUserDetails] = useState<UserInfo>(initialUserInfo);
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const userId = currentUser?._id;

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
      console.log("handle logout runned");
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
    const fetchUserInfo = async () => {
      if (!userId) return;
      try {
        console.log("userId: ", userId);
        const userDetailsFromDB: any = await getUserInfo(userId);
        console.log("userDetailsFromDB: ", userDetailsFromDB.user);
        setUserDetails(userDetailsFromDB.user);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user info", error);
        setLoading(false);
        toast.error("Failed to load user details");
      }
    };

    fetchUserInfo();
  }, [userId]); // Add userId as a dependency

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ToastContainer />
      <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
        <Header toggleLeftSidebar={toggleLeftSidebar} />
        <SmallViewRightSidebar isDarkMode={isDarkMode} />
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar
            isLeftSidebarOpen={isLeftSidebarOpen}
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
            handleLogout={handleLogout}
          />
          <EditProfileMainCenterComponent userDetails={userDetails} />
          <HomePageRightSidebar />
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
