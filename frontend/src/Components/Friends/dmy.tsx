import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { StoreType } from "../../Redux/Store/reduxStore";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../API/User/user";
import ProfileSectionFriendsPage from "./ProfileSectionFriendsPage";
import { followUser } from "../../utils/followUserHelper";
import { unfollowUser } from "../../utils/unfollowUserHelper";
import { cancelFollowRequest } from "../../utils/cancelRequestHelper";
import ConfirmationModal from "../../Constants/ConfirmationModal";

interface User {
  _id: string;
  username: string;
  name: string;
  dp: string;
  isPrivate: boolean;
  followers: { userId: string, followedAt?: string }[];
  bio: string;
  createdAt?: string;
  posts?: any[];
  following?: { userId: string }[];
  requestsForMe?: { userId: string }[];
}

const FriendsMiddlePage: React.FC = () => {
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const [users, setUsers] = useState<User[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [followRequests, setFollowRequests] = useState<string[]>([]);
  const [unFollowRequests, setUnFollowRequests] = useState<string[]>([]);
  const [cancelFollowRequests, setCancelFollowRequests] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [modalMessage, setModalMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers(currentUser._id);
        console.log("result from get all users:", allUsers);
        console.log("current user:", currentUser);
        setUsers(allUsers.user);
      } catch (error) {
        toast.error("Failed to load users");
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const handleFollowUser = (userId: string, username: string) => {
    setModalIsOpen(true);
    setModalMessage(`Follow ${username}?`);
    setModalAction(() => () => followUser(currentUser, userId, username, users, setUsers, setFollowRequests));
  };

  const handleUnfollowUser = (userId: string, username: string) => {
    setModalIsOpen(true);
    setModalMessage(`Unollow ${username}?`);
    setModalAction(() => () => unfollowUser(currentUser, userId, users, setUsers, setUnFollowRequests));
  };

  const handleCancelRequest = (userId: string, username: string ) => {
    setModalIsOpen(true);
    setModalMessage(`Cancel the follow request to ${username}?`);
    setModalAction(() => () => cancelFollowRequest(currentUser, userId, users, setUsers , setCancelFollowRequests));
  };

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-5xl flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        <ProfileSectionFriendsPage
          users={users}
          currentUser={currentUser}
          followUser={handleFollowUser}
          unfollowUser={handleUnfollowUser}
          cancelRequest={handleCancelRequest}
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
      </div>






      
      <ToastContainer />
      <ConfirmationModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={() => {
          if (modalAction) {
            modalAction();
            setModalIsOpen(false);
          }
        }}
        message={modalMessage}
      />
    </div>
  );
};

export default FriendsMiddlePage;
