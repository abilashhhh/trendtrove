import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faUser,
  faEnvelope,
  faPhone,
  faInfoCircle,
  faMapMarkerAlt,
  faTransgender,
  faCrown,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { UserInfo } from "../../../Types/userProfile";
import { useNavigate } from "react-router-dom";
import PostInProfilePage from "../../Post/PostInProfilePage";

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

const Profile: React.FC<ProfileProps> = ({ userDetails }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/editProfile");
  };

  return (
    <main className="flex-1  bg-slate-800 min-h-screen w-full p-3 rounded-lg dark:bg-slate-900 text-white">
      <div className="overflow-y-auto no-scrollbar">
        <div className="max-w-full mx-auto relative">
          {/* Profile Info */}
          <div className="px-6 py-4 bg-white dark:bg-slate-700 rounded-lg shadow-lg mb-4 relative">
            {/* Edit Profile Button */}
            <button
              className="absolute top-4 right-4 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleEdit}>
              Edit Profile
            </button>

            {/* Profile Picture */}
            <div className="bg-cover bg-center h-72 w-full">
        <img
          src={userDetails?.coverPhoto || "/"}
          alt={`${userDetails.username}'s profile`}
          className="w-full h-full object-cover "
        />
      </div>
            <div className="flex items-center justify-center mb-4">
              <img
                src={userDetails.dp}
                alt="Profile Picture"
                className="h-40 w-40 rounded-full object-cover border-4 border-white dark:border-gray-100 -mt-16"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="flex flex-col gap-4">
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
              </div>

              <div className="flex flex-col gap-4 col-span-1 sm:col-span-2 lg:col-span-1">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Email
                  </p>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white break-all">
                    {userDetails.email}
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    Phone Number
                  </p>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {userDetails.phone || "N/A"}
                  </h2>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  Address
                </p>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {userDetails.address || "N/A"}
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <FontAwesomeIcon icon={faTransgender} className="mr-2" />
                    Gender
                  </p>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {userDetails.gender || "N/A"}
                  </h2>
                </div>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faCrown} className="mr-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                  Premium Account
                </p>
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {userDetails.isPremium ? (
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

          <div className="flex flex-col md:flex-row justify-between px-8 py-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg gap-4">
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



<div>
  <PostInProfilePage />
</div>









 
        </div>
      </div>
    </main>
  );
};

export default Profile;
