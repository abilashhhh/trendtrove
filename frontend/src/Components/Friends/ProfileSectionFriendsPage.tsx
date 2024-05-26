import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faUser,
  faInfoCircle,
  faLock,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
  cancelFollowRequest,
  followUser,
  unfollowUser,
  acceptFollowRequests,
  rejectFollowRequests,
} from "../../utils/userRequestsHelper";
import Modal from "../../utils/Modal";

interface UserInfo {
  coverPhoto: string;
  _id: string;
  username: string;
  name: string;
  dp: string;
  isPrivate: boolean;
  bio: string;
  createdAt?: string;
  posts?: any[];
  followers: { userId: string; username: string; followedAt: string }[];
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
  const [hasPendingRequest, setHasPendingRequest] = useState<boolean>(false);
  const [isMutualFollower, setIsMutualFollower] = useState<boolean>(false);
  const [followDate, setFollowDate] = useState<string | undefined>("");

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const handleOpenFollowersModal = () => {
    setShowFollowersModal(true);
  };

  const handleCloseFollowersModal = () => {
    setShowFollowersModal(false);
  };

  const handleOpenFollowingModal = () => {
    setShowFollowingModal(true);
  };

  const handleCloseFollowingModal = () => {
    setShowFollowingModal(false);
  };

  useEffect(() => {
    const follower = userDetails.followers.find(
      (f) => f.userId === currentUser._id
    );

    const request = userDetails.requestedByMe?.find(
      (r) => r.userId === currentUser._id
    );

    const pendingRequest = userDetails.requestsForMe?.find(
      (r) => r.userId === currentUser._id
    );

    const mutualFollower =
      currentUser.followers.find((f) => f.userId === userDetails._id) &&
      userDetails.followers?.find((r) => r.userId === currentUser._id);

    setIsFollower(!!follower);
    setHasRequested(!!request);
    setHasPendingRequest(!!pendingRequest);
    setIsMutualFollower(!!mutualFollower);

    if (follower) {
      setFollowDate(follower.followedAt);
    }
  }, [userDetails, currentUser]);

  const handleFollowUser = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    const res = await followUser(
      currentUser._id,
      targetUserId,
      targetUserUserName
    );
    if (res) {
      if (userDetails.isPrivate) {
        setHasRequested(true);
      } else {
        setIsFollower(true);
      }
    }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await unfollowUser(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setIsFollower(false);
          setIsMutualFollower(false);
        }
      }
    });
  };

  const handleOnCancelRequest = async (
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
      confirmButtonText: "Cancel Request",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await cancelFollowRequest(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setHasRequested(false);
        }
      }
    });
  };

  const handleAcceptUserRequest = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    const res = await acceptFollowRequests(
      currentUser._id,
      targetUserId,
      targetUserUserName
    );
    if (res) {
      setHasPendingRequest(false);
      setIsMutualFollower(true);
    }
  };

  const handleRejectUserRequest = async (
    targetUserId: string,
    targetUserUserName: string
  ) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to reject the follow request from ${targetUserUserName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Reject Request",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await rejectFollowRequests(
          currentUser._id,
          targetUserId,
          targetUserUserName
        );
        if (res) {
          setHasPendingRequest(false);
        }
      }
    });
  };

  return (
    <div className="mx-auto rounded-lg shadow-lg bg-white dark:bg-gray-800 overflow-hidden ">
      
      <div className="bg-cover bg-center h-72">
        <img
          src={userDetails?.coverPhoto || "/"}
          alt={`${userDetails.username}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-center flex-col">
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-slate-600 -mt-16">
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
                  className="ml-2 text-green-500"
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
            {userDetails.bio && (
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Bio: {userDetails.bio}
              </p>
            )}
            <div className="mt-4">
              <div className="inline-flex items-center mr-4">
                <FontAwesomeIcon
                  icon={faImage}
                  className="mr-2 text-gray-600"
                />
                <span className="text-gray-800 dark:text-gray-200">
                  {userDetails.posts?.length || 0} Posts
                </span>
              </div>
              <div className="inline-flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-600" />
                <span
                  onClick={handleOpenFollowersModal}
                  className="text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  {userDetails.followers.length} Followers
                </span>
              </div>
              <div className="inline-flex items-center ml-4">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-600" />
                <span
                  onClick={handleOpenFollowingModal}
                  className="text-gray-800 dark:text-gray-200 cursor-pointer"
                >
                  {userDetails.following?.length || 0} Following
                </span>
              </div>
            </div>
            <div className="mt-4">
              {isMutualFollower && (
                <p className="text-green-500">
                  Following each other since {formatDate(followDate)}
                </p>
              )}
              {isFollower && !isMutualFollower && (
                <p className="text-green-500">You are following</p>
              )}
              {!isFollower && isMutualFollower && (
                <p className="text-green-500">Following you</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          {userDetails.isPrivate ? (
            <>
              {!isFollower && !hasRequested && !hasPendingRequest && (
                <button
                  onClick={() =>
                    handleFollowUser(userDetails._id, userDetails.username)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Send Follow Request
                </button>
              )}
              {hasRequested && (
                <button
                  onClick={() =>
                    handleOnCancelRequest(userDetails._id, userDetails.username)
                  }
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel Request
                </button>
              )}
              {hasPendingRequest && (
                <>
                  <button
                    onClick={() =>
                      handleAcceptUserRequest(
                        userDetails._id,
                        userDetails.username
                      )
                    }
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Accept Request
                  </button>
                  <button
                    onClick={() =>
                      handleRejectUserRequest(
                        userDetails._id,
                        userDetails.username
                      )
                    }
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Reject Request
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {!isFollower && (
                <button
                  onClick={() =>
                    handleFollowUser(userDetails._id, userDetails.username)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Follow
                </button>
              )}
            </>
          )}
          {isFollower && (
            <button
              onClick={() =>
                handleOnUnfollowUser(userDetails._id, userDetails.username)
              }
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Unfollow
            </button>
          )}
        </div>
      </div>

      <Modal
        isOpen={showFollowersModal}
        onClose={handleCloseFollowersModal}
        title="Followers"
        users={userDetails.followers}
      />
      <Modal
        isOpen={showFollowingModal}
        onClose={handleCloseFollowingModal}
        title="Following"
        users={userDetails.following}
      />
    </div>
  );
};

export default ProfileSectionFriendsPage;
