import React from "react";
import { UserInfo } from "../../../Types/userProfile";

interface ProfileProps {
  userDetails: UserInfo;
}

const Profile: React.FC<ProfileProps> = ({ userDetails }) => {
  return (
    <>
      <main className="flex-1 p-2 bg-gray-800 min-h-screen w-full dark:bg-gray-700 text-white">
        <div className="overflow-y-auto no-scrollbar">
          <div className="max-w-full mx-auto relative">
            {/* Profile Info */}
            <div className="px-6 py-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg mb-4 relative">
              {/* Edit Profile Button */}
              <button className="absolute top-4 right-4 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Edit Profile
              </button>

              {/* Profile Picture */}
              <div className="flex items-center justify-between mb-4">
                <img
                  src={userDetails.dp}
                  alt="Profile Picture"
                  className="h-40 w-40 rounded-full object-cover border-4 border-white dark:border-gray-100"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Username
                    </p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {userDetails.username}
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Name
                    </p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {userDetails.name}
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Email
                    </p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {userDetails.email}
                    </h2>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Phone Number
                    </p>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {userDetails.phone || "N/A"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between p-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg gap-4">
              <div className="text-center cursor-pointer md:w-1/3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Posts
                </h2>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {userDetails.posts}
                </p>
              </div>
              <div className="text-center cursor-pointer md:w-1/3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Followers
                </h2>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {userDetails.followers}
                </p>
              </div>
              <div className="text-center cursor-pointer md:w-1/3">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Following
                </h2>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {userDetails.following}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
