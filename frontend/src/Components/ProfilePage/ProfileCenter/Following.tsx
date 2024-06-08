import React from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../Redux/Store/reduxStore";
import { useNavigate } from "react-router-dom";

const Following = () => {
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const navigate = useNavigate();

  const formatDate = (date: string | undefined) => {
    if (!date) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <aside className="hidden pl-2 lg:block bg-gray-800 dark:bg-gray-700 h-full w-64">
      <div className="p-4 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
        <h2 className="text-lg font-semibold mb-4 text-center underline">
          Following
        </h2>

        {currentUser?.following.map((followings, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 mb-2 bg-gray-100 dark:bg-gray-800 rounded-md shadow-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200">
            <div className="flex items-center">
              <img
                src={followings.dp}
                alt={followings.username}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h1
                  className="text-base font-semibold cursor-pointer"
                  onClick={() => navigate(`/profiles/${followings.username}`)}>
                  {followings.username}
                </h1>
                <p className="text-sm text-gray-400">
                  Since {formatDate(followings.followedAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Following;
