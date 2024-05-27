import React from "react";
import { UserInfo } from "../../Types/userProfile";
import { FaEnvelopeOpenText, FaImage, FaTextHeight, FaTextWidth, FaUser, FaVideo } from "react-icons/fa";


interface AddPostProps {
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

const AddPostMiddlePage: React.FC<AddPostProps> = ({ userDetails }) => {
  return (
    <main className="flex-1 p-2 overflow-auto bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <div className="flex flex-row md:flex-row items-center md:items-start bg-slate-200 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex-shrink-0">
            <img
              src={userDetails.dp}
              alt={`${userDetails.username}'s profile`}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 mb-4 md:mb-0"
            />
          </div>
          <div className="text-center ml-2 md:text-left md:ml-6">
            <h1 className="text-l text-gray-400 font-bold mb-1">Posting as</h1>
            <h1 className="text-2xl font-bold mb-1">{userDetails.username}</h1>
            <h1 className="text-l text-gray-400 font-bold">
              {formatDate(new Date().toISOString())}
            </h1>
          </div>
        </div>
        {/* ///////////////////////////////////// */}
        <div className="flex md:flex-row mt-2 justify-evenly items-center gap-2 rounded-lg  ">
      <div className="flex-1 flex flex-row items-center justify-center gap-2 font-extrabold bg-slate-200 dark:bg-slate-700  p-2 rounded-lg text-center">
        <FaTextHeight className="text-4xl" />
        <span>Text</span>
      </div>
      <div className="flex-1 flex flex-row items-center justify-center gap-2 font-extrabold bg-slate-200 dark:bg-slate-700 p-2 rounded-lg text-center">
        <FaImage className="text-4xl" />
        <span>Photos</span>
      </div>
      <div className="flex-1 flex flex-row items-center justify-center gap-2 font-extrabold bg-slate-200 dark:bg-slate-700 p-2 rounded-lg text-center">
        <FaVideo className="text-4xl" />
        <span>Video</span>
      </div>
    </div>

        {/* ///////////////////////////////////// */}
      </div>
    </main>
  );
};

export default AddPostMiddlePage;
