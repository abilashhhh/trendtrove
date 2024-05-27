import React from "react";
import { UserInfo } from "../../Types/userProfile";

interface AddPPostProps {
  userDetails: UserInfo;
}

const formatDate = (date: string | undefined) => {
  if (!date) return "N/A";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const AddPostMiddlePage: React.FC<AddPPostProps> = ({ userDetails }) => {
  return (
    <main className="flex-1 pt-2 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-semibold">add post.</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Username : {userDetails.username}
        </p>
        <img
          src={userDetails?.coverPhoto || "/"}
          alt={`${userDetails.username}'s profile`}
          className="w-full h-full object-cover "
        />
      </div>
    </main>
  );
};

export default AddPostMiddlePage;
