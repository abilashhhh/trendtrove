import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import ProfilePage from "./Pages/ProfilePage";
import OTPPage from "./Pages/OTPPage";
import BasePage from "./Pages/BasePage";
import ErrorPage from "./Pages/ErrorPage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PrivateRoute from "./PrivateRoute";
import { StoreType } from "./Redux/Store/reduxStore";
import EditProfilePage from "./Pages/EditProfilePage";
import SettingsPage from "./Pages/SettingsPage";
import FriendsPage from "./Pages/FriendsPage";
import AdminLoginPage from "./Pages/Admin/AdminLoginPage";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
function App() {
  const user = useSelector((state: StoreType) => state.userAuth.user);
  const [isVerifiedAccount, setIsVerifiedAccount] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setIsVerifiedAccount(user?.isVerifiedAccount);
      console.log("User from app.tsx:", user);
      console.log("isVerifiedAccount : ", isVerifiedAccount);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePage />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<HomePage />} path={""} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<ProfilePage />} path={""} />}
        />
        <Route
          path="/editprofile"
          element={<PrivateRoute element={<EditProfilePage />} path={""} />}
        />
        <Route
          path="/settings"
          element={<PrivateRoute element={< SettingsPage />} path={""} />}
        /> 
        <Route
          path="/friends"
          element={<PrivateRoute element={< FriendsPage />} path={""} />}
        /> 
        <Route
          path="/adminhome"
          element={<PrivateRoute element={< AdminHomePage />} path={""} />}
        />
   
        <Route path="/adminsignin" element={<AdminLoginPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />{" "}
        {/* for undefined paths err pg will load */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
