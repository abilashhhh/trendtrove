import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StoreType } from "../../Redux/Store/reduxStore";
import { FaBell } from "react-icons/fa";

interface HeaderProps {
  toggleLeftSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleLeftSidebar }) => {
  const currentUser: any = useSelector((state: StoreType) => state.userAuth.user);

  return (
    <div className="bg-gray-800 dark:bg-gray-700 pl-2 pr-2 pt-2">
      <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white p-4 flex justify-between items-center rounded-lg">
        <div className="flex gap-3">
          <div className="space-x-4 lg:hidden flex">
            <button onClick={toggleLeftSidebar}>☰</button>
          </div>
          <h1 className="text-2xl flex items-center">
            <span className="text-gray-500 dark:text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Trend
            </span>
            <span className="ml-1 text-black dark:text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Trove
            </span>
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {currentUser && currentUser.dp && (
            <Link to="/notifications" className="relative p-2 text-gray-600 dark:text-gray-400">
              <FaBell className="text-lg" />
            </Link>
          )}
          {currentUser && currentUser.dp && (
            <Link to="/profile">
              <img
                className="rounded-full h-8 w-8 object-cover"
                src={currentUser.dp}
                alt="User Profile"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
