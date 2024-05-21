import React from "react";
import UserPage from "./AdminUsersList";
import HomePageContent from "./AdminHomePage";

const AdminPageMiddleContainer = ({ activeSection }) => {
  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
        {activeSection === "Home" && <HomePageContent />}
        {activeSection === "Users" && <UserPage />}
    </main>
  );
};

export default AdminPageMiddleContainer;
