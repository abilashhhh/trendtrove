import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faUser,
  faInfoCircle,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { cancelFollowRequest } from "../../utils/cancelRequestHelper";
import { unfollowUser } from "../../utils/unfollowUserHelper";

interface UserInfo {
  requestedByMe: any;
  _id: string;
  username: string;
  name: string;
  dp: string;
  isPrivate: boolean;
  followers: { userId: string; followedAt: string }[];
  bio: string;
  createdAt?: string;
  posts?: any[];
  following?: { userId: string; followedAt: string }[];
  requestsForMe?: { userId: string; followedAt: string }[];
}

interface ProfileProps {
  userDetails: UserInfo;
  currentUser: UserInfo;
  onFollowUser: (targetUserId: string, targetUserUserName: string) => void;
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

const ProfileSectionFriendsPage: React.FC<ProfileProps> = ({
  userDetails,
  currentUser,
  onFollowUser,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [hasRequested, setHasRequested] = useState<boolean>(false);

  useEffect(() => {
    const follower = userDetails.followers.find(
      (f) => f.userId === currentUser._id
    );
    const request = userDetails.requestsForMe?.find(
      (r) => r.userId === currentUser._id
    );

    setIsFollowing(!!follower);
    setHasRequested(!!request);
  }, [userDetails, currentUser]);

  const handleOnCancelRequest = (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to cancel the follow request to ${targetUserUserName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Cancel Request!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await cancelFollowRequest(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setHasRequested(false);
          setTimeout(()=>{
            window.location.reload()
           },500)
        }
      }
    });
  };

  const handleOnUnfollowUser = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to unfollow ${targetUserUserName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, unfollow!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await unfollowUser(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setIsFollowing(false);
         setTimeout(()=>{
          window.location.reload()
         },500)
          
        }
      }
    });
  };

  const followStatus = () => {
    if (isFollowing) {
      return <div>{`Following since ${formatDate(
        userDetails.followers.find((f) => f.userId === currentUser._id)?.followedAt
      )}`}</div>;
    } else if (hasRequested) {
      return <div>{`Requested at ${formatDate(
        userDetails.requestsForMe?.find((r) => r.userId === currentUser._id)
          ?.followedAt
      )}`}</div>;
    } else {
      return (
        <button
          onClick={() => onFollowUser(userDetails._id, userDetails.username)}
          className="bg-blue-500 text-white py-1 px-2 ml-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out shadow-sm"
        >
          Follow
        </button>
      );
    }
  };

  return (
    <main className="flex-1 p-4 bg-gray-800 min-h-screen w-full no-scrollbar dark:bg-gray-700 text-white">
      <div className="overflow-y-auto no-scrollbar">
        <div className="max-w-full mx-auto relative">
          <div className="px-6 py-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg mb-6 relative">
            <div className="flex items-center justify-center mb-6">
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

          <div className="flex justify-between px-8 py-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg gap-6">
            <div className="text-center md:w-1/3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Posts
              </h2>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {userDetails.posts ? userDetails.posts.length : "0"}
              </p>
            </div>

            <div className="text-center md:w-1/3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Followers
              </h2>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {userDetails.followers ? userDetails.followers.length : "0"}
              </p>
            </div>

            <div className="text-center md:w-1/3">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                Following
              </h2>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {userDetails.following ? userDetails.following.length : "0"}
              </p>
            </div>
          </div>

          <div className="text-center mt-6 flex gap-4 justify-center align-center">
            <div>{userDetails._id !== currentUser._id && followStatus()}</div>
            <div>
              {hasRequested && (
                <button
                  onClick={() =>
                    handleOnCancelRequest(userDetails._id, userDetails.username)
                  }
                  className="bg-yellow-500 text-white py-1 px-2 ml-2 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out shadow-sm"
                >
                  Cancel Request
                </button>
              )}
            </div>

            <div>
              {isFollowing && (
                <button
                  onClick={() =>
                    handleOnUnfollowUser(userDetails._id, userDetails.username)
                  }
                  className="bg-red-500 text-white py-1 px-2 ml-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out shadow-sm"
                >
                  Unfollow User
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileSectionFriendsPage;
