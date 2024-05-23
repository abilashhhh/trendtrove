import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHomePage from "./Pages/Admin/AdminHomePage";
import AdminLoginPage from "./Pages/Admin/AdminLoginPage";
import PrivateRoute from "./PrivateRoute";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/signin" element={<AdminLoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<AdminHomePage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
