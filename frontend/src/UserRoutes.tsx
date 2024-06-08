import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "./Pages/SignInPage";
import ProfilePage from "./Pages/ProfilePage";
import OTPPage from "./Pages/OTPPage";
import BasePage from "./Pages/BasePage";
import ErrorPage from "./Pages/ErrorPage";
import EditProfilePage from "./Pages/EditProfilePage";
import SettingsPage from "./Pages/SettingsPage";
import FriendsPage from "./Pages/FriendsPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import Addpost from "./Pages/Addpost";
import ProfilePageIndividual from "./Pages/ProfilePageIndividual";
import ReportPost from "./Components/Post/ReportPost";
import EditPost from "./Pages/EditPost";
import CommentsPage from "./Components/Comments/CommentsPage";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<BasePage />} />

      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/profiles/:username" element={<ProfilePageIndividual />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/addpost" element={<Addpost />} />
        <Route path="/editpost/:postId" element={<EditPost />} />
        <Route path="/reportpost/:postId" element={<ReportPost />} />
        <Route path="/comment/:postId" element={<CommentsPage />} />
      </Route>

      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default UserRoutes;
