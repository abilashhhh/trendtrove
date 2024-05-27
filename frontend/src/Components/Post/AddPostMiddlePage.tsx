import React, { useState } from "react";
import { UserInfo } from "../../Types/userProfile";
import {
  FaTextHeight,
  FaImage,
  FaVideo,
  FaUpload,
} from "react-icons/fa";

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
  const [postType, setPostType] = useState<"text" | "image" | "video">("text");

  return (
    <main className="flex-1 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <div className="flex flex-row md:flex-row items-center md:items-start bg-slate-200 dark:bg-gray-800 rounded-lg p-2">
          <div className="flex-shrink-0">
            <img
              src={userDetails.dp}
              alt={`${userDetails.username}'s profile`}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-800 mb-4 md:mb-0"
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
        <div className="flex md:flex-row mt-2 justify-evenly items-center gap-2 rounded-lg">
          <div
            className={`flex-1 flex flex-row items-center justify-center gap-2 font-extrabold p-2 rounded-lg text-center cursor-pointer ${
              postType === "text" ? "bg-gray-400 dark:bg-gray-600" : "bg-slate-200 dark:bg-slate-800"
            }`}
            onClick={() => setPostType("text")}
          >
            <FaTextHeight className="text-4xl" />
            <span>Text</span>
          </div>
          <div
            className={`flex-1 flex flex-row items-center justify-center gap-2 font-extrabold p-2 rounded-lg text-center cursor-pointer ${
              postType === "image" ? "bg-gray-400 dark:bg-gray-600" : "bg-slate-200 dark:bg-slate-800"
            }`}
            onClick={() => setPostType("image")}
          >
            <FaImage className="text-4xl" />
            <span>Photos</span>
          </div>
          <div
            className={`flex-1 flex flex-row items-center justify-center gap-2 font-extrabold p-2 rounded-lg text-center cursor-pointer ${
              postType === "video" ? "bg-gray-400 dark:bg-gray-600" : "bg-slate-200 dark:bg-slate-800"
            }`}
            onClick={() => setPostType("video")}
          >
            <FaVideo className="text-4xl" />
            <span>Video</span>
          </div>
        </div>
        {/* ///////////////////////////////////// */}
        {postType === "text" && (
          // <div className="flex mt-2 justify-evenly items-center gap-2 rounded-lg">
          //   <div className="flex-1 flex flex-row items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
              
          //     <textarea
          //       type="text"
          //       name="textPost"
          //       id="textPost"
          //       placeholder="Type here..."
          //       className="bg-slate-200 dark:bg-slate-800 text-black dark:text-white w-full h-60 p-3 no-scrollbar rounded-lg"
          //     />
          //   </div>
          // </div>
          <div className="flex mt-2 justify-evenly items-center gap-2 rounded-lg">
          <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
            <label
              htmlFor="addImage"
              className="flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-900 text-gray-600 dark:text-gray-300 p-4 rounded-lg cursor-pointer"
            >
              <FaTextHeight className="text-4xl" />
              <span className="font-extrabold mt-2" >Add text</span>
            </label>
            <input
              type="file"
              name="addImage"
              id="addImage"
              className="hidden"
            />
            <textarea
              type="text"
              name="imageCaption"
              id="imageCaption"
              placeholder="Add caption..."
              className="bg-slate-200 dark:bg-slate-800 text-black dark:text-white w-full h-40 p-3 no-scrollbar  rounded-lg"
            />
          </div>
        </div>
        )}
        {postType === "image" && (
          <div className="flex mt-2 justify-evenly items-center gap-2 rounded-lg">
            <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
              <label
                htmlFor="addImage"
                className="flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-900 text-gray-600 dark:text-gray-300 p-4 rounded-lg cursor-pointer"
              >
                <FaUpload className="text-4xl" />
                <span className="font-extrabold mt-2" >Upload Image</span>
              </label>
              <input
                type="file"
                name="addImage"
                id="addImage"
                className="hidden"
              />
              <textarea
                type="text"
                name="imageCaption"
                id="imageCaption"
                placeholder="Add caption..."
                className="bg-slate-200 dark:bg-slate-800 text-black dark:text-white w-full h-40 p-3 no-scrollbar  rounded-lg"
              />
            </div>
          </div>
        )}
        {postType === "video" && (
          <div className="flex mt-2 justify-evenly items-center gap-2 rounded-lg">
            <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
              <label
                htmlFor="addVideo"
                className="flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-900 text-gray-600 dark:text-gray-300 p-4 rounded-lg cursor-pointer"
              >
                <FaUpload className="text-4xl" />
                <span className="font-extrabold mt-2">Upload Video</span>
              </label>
              <input
                type="file"
                name="addVideo"
                id="addVideo"
                className="hidden"
              />
              <textarea
                type="text"
                name="videoCaption"
                id="videoCaption"
                placeholder="Add caption..."
                className="bg-slate-200 dark:bg-slate-800 text-black dark:text-white w-full h-40 p-3 no-scrollbar resize-none rounded-lg"
              />
            </div>
          </div>
        )}
        <button className="bg-red-600 font-extrabold rounded-lg mt-2 p-4 w-1/5">
          POST
        </button>
      </div>
    </main>
  );
};

export default AddPostMiddlePage;
