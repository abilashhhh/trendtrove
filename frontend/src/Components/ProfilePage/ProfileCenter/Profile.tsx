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
    <main className="flex-1 p-2 bg-gray-800 min-h-screen w-full dark:bg-gray-700 text-white">
      
    </main>
  );
};

export default Profile;
