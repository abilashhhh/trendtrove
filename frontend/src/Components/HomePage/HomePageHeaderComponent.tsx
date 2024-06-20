import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSocketContext } from "../../Context/SocketContext";
import unReadNotificationsFunction from "../../utils/unReadNotificationsFunction";

interface HeaderProps {
  toggleLeftSidebar: () => void;
  userDetails: any;
}

const Header: React.FC<HeaderProps> = ({ toggleLeftSidebar, userDetails }) => {
  const currentUser: any = userDetails;
  const location = useLocation();
  const { notifications } = useSocketContext();
  const unreadNotifications = unReadNotificationsFunction(notifications);

  const [bellShake, setBellShake] = useState(false);

  useEffect(() => {
    if (unreadNotifications.length > 0) {
      setBellShake(true);
      const timer = setTimeout(() => setBellShake(false), 3000);  
      return () => clearTimeout(timer);
    }
  }, [unreadNotifications.length]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-gray-800 dark:bg-gray-700 pl-2 pr-2 pt-2 items-center">
      <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white p-1 flex justify-between items-center rounded-lg">
        <div className="flex gap-3">
          <div className="space-x-4 lg:hidden flex ml-2">
            <button onClick={toggleLeftSidebar}>☰</button>
          </div>
          <h1 className="text-2xl flex items-center  lg:ml-2">
            <span className="text-gray-500 dark:text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Trend
            </span>
            <span className="ml-1 text-black dark:text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold">
              Trove
            </span>
          </h1>
        </div>

        <div className="flex items-center lg:space-x-4">
          {currentUser && currentUser.dp && (
            <Link
              to="/notifications"
              className={`relative p-1 text-gray-900 dark:text-gray-400 rounded-full ${
                isActive("/notifications") ? "dark:bg-slate-700 bg-slate-500" : ""
              }`}
            >
              <div className={`relative flex items-center justify-center p-[15px] rounded-full cursor-pointer transition duration-300 bg-transparent border-none hover:bg-[rgba(170,170,170,0.062)] notification ${bellShake ? 'shake' : ''}`}>
                <div className="absolute top-[8px] right-[8px] z-[1000] flex p-2 items-center justify-center w-[12px] h-[12px] text-white text-[10px] bg-red-500 rounded-full">
                  {unreadNotifications.length} 
                </div>
                <div className="bell-container relative">
                  <div className="bell relative w-[20px] h-[20px] border-[2.17px] border-white border-t-white border-l-white border-r-white border-b-transparent rounded-t-[10px] rounded-b-none top-[-3px]"></div>
                </div>
              </div>
            </Link>
          )}
          {currentUser && currentUser.dp && (
            <Link to="/profile">
              <img
                className="rounded-full h-8 w-8 object-cover mr-2"
                src={currentUser.dp}
                alt="User Profile"
              />
            </Link>
          )}
        </div>
      </div>
      <style>
        {`
          /* Bell shape with one div */
          .bell::before,
          .bell::after {
            content: "";
            background: white;
            display: block;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            height: 2.17px;
          }
          .bell::before {
            top: 100%;
            width: 20px;
          }
          .bell::after {
            top: calc(100% + 4px);
            width: 7px;
          }
          /* Container animations */
          .notification:hover > .bell-container,
          .notification.shake > .bell-container {
            animation: bell-animation 650ms ease-out 0s 1 normal both;
          }
          /* Bell ring and scale animation */
          @keyframes bell-animation {
            20% {
              transform: rotate(15deg);
            }
            40% {
              transform: rotate(-15deg);
              scale: 1.1;
            }
            60% {
              transform: rotate(10deg);
              scale: 1.1;
            }
            80% {
              transform: rotate(-10deg);
            }
            0%,
            100% {
              transform: rotate(0deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Header;
