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
import Modal from "../../utils/Modal";
import { User } from "./FriendsMiddlePage";
import StatsCard from "./StatsCard";
import { followUser } from "../../utils/followUserHelper";

interface UserInfo {
  _id: string;
  username: string;
  name: string;
  dp: string;
  isPrivate: boolean;
  followers: { userId: string; username: string; followedAt: string }[];
  bio: string;
  createdAt?: string;
  posts?: any[];
  following?: { userId: string; username: string; followedAt: string }[];
  requestsForMe?: { userId: string; username: string; followedAt: string }[];
  requestedByMe?: { userId: string; username: string; followedAt: string }[];
}

interface ProfileProps {
  userDetails: UserInfo;
  currentUser: UserInfo;
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
}) => {
  const [isFollower, setIsFollower] = useState<boolean>(false);
  const [hasRequested, setHasRequested] = useState<boolean>(false);
  const [hasAcceptedReq, setHsAcceptedReq] = useState<boolean>(false);
  const [followRequests, setFollowRequests] = useState<string[]>([]);

  useEffect(() => {
    const follower = userDetails.followers.find(
      f => f.userId === currentUser._id
    );

    const request = userDetails.requestsForMe?.find(
      r => r.userId === currentUser._id
    );

    const acceptReq = userDetails.requestedByMe?.find(
      k => k.userId === currentUser._id
    );

    setHsAcceptedReq(!!acceptReq);
    setIsFollower(!!follower);
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
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await cancelFollowRequest(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setHasRequested(false);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        }
      }
    });
  };

  const handleFollowUser = async (userId: string, username: string) => {
    await followUser(
      currentUser,
      userId,
      username,
      followRequests,
      setFollowRequests
    );
  };

  const handleAcceptUserRequest = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    console.log("handleaccept user req: ", targetUserId, targetUserUserName);
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
      confirmButtonText: "Unfollow",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await unfollowUser(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setIsFollower(false);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 500);
        }
      }
    });
  };

  return (
      <div className=" mx-auto rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
        <div className="bg-cover bg-center h-32">
          <img
            src={userDetails?.dp || "/"}
            alt={`${userDetails.username}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white -mt-16">
              <img
                src={userDetails.dp || "/default-profile.jpg"}
                alt={userDetails.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {userDetails.username}
                {userDetails.isPrivate && (
                  <FontAwesomeIcon
                    icon={faLock}
                    className="ml-2 text-gray-600"
                    title="Private Account"
                  />
                )}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {userDetails.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Joined on: {formatDate(userDetails.createdAt)}
              </p>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Bio: {userDetails.bio}
              </p>
              <div className="mt-4">
                <div className="inline-flex items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 text-gray-600"
                  />
                  <span className="text-gray-800 dark:text-gray-200">
                    {userDetails.followers.length} followers
                  </span>
                </div>
                <div className="inline-flex items-center ml-4">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="mr-2 text-gray-600"
                  />
                  <span className="text-gray-800 dark:text-gray-200">
                    {userDetails.following?.length || 0} following
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            {!isFollower && !hasRequested && !hasAcceptedReq && (
              <button
                onClick={() =>
                  handleFollowUser(userDetails._id, userDetails.username)
                }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Follow
              </button>
            )}
            {hasRequested && (
              <button
                onClick={() =>
                  handleOnCancelRequest(userDetails._id, userDetails.username)
                }
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Cancel Request
              </button>
            )}
            {isFollower && (
              <button
                onClick={() =>
                  handleOnUnfollowUser(userDetails._id, userDetails.username)
                }
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Unfollow
              </button>
            )}
            {hasAcceptedReq && (
              <button
                onClick={() =>
                  handleAcceptUserRequest(userDetails._id, userDetails.username)
                }
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Accept Request
              </button>
            )}
            <Modal userDetails={userDetails} />
          </div>
        </div>
      </div>
  );
};

export default ProfileSectionFriendsPage;
