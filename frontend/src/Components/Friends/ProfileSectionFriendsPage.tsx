import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faUser,
  faInfoCircle,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { UserInfo } from "../../Types/userProfile";

interface ProfileProps {
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

const ProfileSectionFriendsPage: React.FC<ProfileProps> = ({ userDetails }) => {

  return (
    <main className="flex-1 p-2 bg-gray-800 min-h-screen w-full no-scrollbar dark:bg-gray-700 text-white">
      <div className="overflow-y-auto no-scrollbar">
        <div className="max-w-full mx-auto relative">
          {/* Profile Info */}
          <div className="px-6 py-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg mb-4 relative">
            {/* Profile Picture */}
            <div className="flex items-center justify-center mb-4">
              <img
                src={userDetails.dp}
                alt="Profile Picture"
                className="h-40 w-40 rounded-full object-cover border-4 border-white dark:border-gray-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Username
                </p>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {userDetails.username}
                </h2>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Name
                </p>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {userDetails.name}
                </h2>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                  Private Account
                </p>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {userDetails.isPrivate ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-green-500"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="text-red-500"
                    />
                  )}
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    Bio
                  </p>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {userDetails.bio || "N/A"}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {userDetails.createdAt && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    <p> Joined TrendTrove on </p>
                    <span className="text-lg font-semibold text-gray-800 dark:text-white">
                      {formatDate(userDetails.createdAt)}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex  justify-between px-8 py-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg gap-4">
            <div className="text-center md:w-1/3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Posts
              </h2>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {userDetails.posts ? userDetails.posts.length : "0"}
              </p>
            </div>

            <div className="text-center md:w-1/3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Followers
              </h2>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {userDetails.followers ? userDetails.followers.length : "0"}
              </p>
            </div>

            <div className="text-center md:w-1/3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Following
              </h2>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {userDetails.following ? userDetails.following.length : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileSectionFriendsPage;
