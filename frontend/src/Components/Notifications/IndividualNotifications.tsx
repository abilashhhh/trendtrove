// import React, { useEffect, useState } from 'react';
// import { FaEnvelope, FaThumbsUp, FaThumbsDown, FaComment, FaUserPlus, FaUserCheck, FaUserTimes, FaUsers, FaUserMinus, FaPhoneSlash, FaEye } from 'react-icons/fa';
// import { useSocketContext } from "../../Context/SocketContext";
// import useUserDetails from '../../Hooks/useUserDetails';
// import useGetMessages from '../../Hooks/useGetMessages';
// import unReadNotificationsFunction from '../../utils/unReadNotificationsFunction';
// import { getAllUsers } from '../../API/User/user';

// // const notifications = [
// //   { id: 1, type: 'message', content: 'You have a new message from John Doe', time: '2 minutes ago', userDp: 'https://via.placeholder.com/40', username: 'John Doe' },
// //   { id: 2, type: 'like', content: 'Alice liked your post', time: '10 minutes ago', userDp: 'https://via.placeholder.com/40', username: 'Alice' },
// //   { id: 3, type: 'dislike', content: 'Bob disliked your post', time: '15 minutes ago', userDp: 'https://via.placeholder.com/40', username: 'Bob' },
// //   { id: 4, type: 'comment', content: 'Charlie commented on your post', time: '20 minutes ago', userDp: 'https://via.placeholder.com/40', username: 'Charlie' },
// //   { id: 5, type: 'follow', content: 'David sent you a follow request', time: '1 hour ago', userDp: 'https://via.placeholder.com/40', username: 'David' },
// //   { id: 6, type: 'accept', content: 'Ella accepted your friend request', time: '2 hours ago', userDp: 'https://via.placeholder.com/40', username: 'Ella' },
// //   { id: 7, type: 'reject', content: 'Frank rejected your follow request', time: '3 hours ago', userDp: 'https://via.placeholder.com/40', username: 'Frank' },
// //   { id: 8, type: 'groupAdd', content: 'Grace added you to the group "React Developers"', time: '4 hours ago', userDp: 'https://via.placeholder.com/40', username: 'Grace' },
// //   { id: 9, type: 'groupRemove', content: 'Henry removed you from the group "NodeJS Enthusiasts"', time: '5 hours ago', userDp: 'https://via.placeholder.com/40', username: 'Henry' },
// //   { id: 10, type: 'missedCall', content: 'You missed a call from Ian', time: '6 hours ago', userDp: 'https://via.placeholder.com/40', username: 'Ian' },
// //   // Add more dummy notifications as needed
// // ];

// const getNotificationIcon = (type) => {
//   switch (type) {
//     case 'message':
//       return <FaEnvelope className="text-blue-500" />;
//     case 'like':
//       return <FaThumbsUp className="text-green-500" />;
//     case 'dislike':
//       return <FaThumbsDown className="text-red-500" />;
//     case 'comment':
//       return <FaComment className="text-purple-500" />;
//     case 'follow':
//       return <FaUserPlus className="text-yellow-500" />;
//     case 'accept':
//       return <FaUserCheck className="text-green-500" />;
//     case 'reject':
//       return <FaUserTimes className="text-red-500" />;
//     case 'groupAdd':
//       return <FaUsers className="text-blue-500" />;
//     case 'groupRemove':
//       return <FaUserMinus className="text-red-500" />;
//     case 'missedCall':
//       return <FaPhoneSlash className="text-orange-500" />;
//     default:
//       return null;
//   }
// };

// const IndividualNotifications = () => {
//  const [allUsers, setAllUsers] = useState()
// const {notifications} = useSocketContext()
// const currentUser = useUserDetails()
// const {getMessages} = useGetMessages()

// console.log("allusers:", allUsers)

// const unreadNotifications=  unReadNotificationsFunction(notifications)
// console.log("unreadnotidficatons: ", unreadNotifications)

// const modifiedNotifications = notifications.map((n) => {
//   const sender = allUsers?.user?.find(user => user._id === n.senderId)
//   console.log("Sender: ",sender)
//   return { ...n , senderName : sender.username , dp: sender.dp  }
// })
// console.log("modified notifications : ", modifiedNotifications)
// useEffect(()=>{
//   getAllUsersData()
// },[])

// const getAllUsersData = async () => {
//   const allUsersData = await getAllUsers();
//   if (allUsersData) {
//     setAllUsers(allUsersData);
//   }
// };

//   const [viewedNotifications, setViewedNotifications] = useState<number[]>([]);

//   const markAsViewed = (id: number) => {
//     setViewedNotifications((prev) => [...prev, id]);
//   };

//   const markAllAsViewed = () => {
//     setViewedNotifications(notifications.map((notification) => notification.id));
//   };

//   return (
//     <div className="flex flex-col w-full p-4 space-y-4">

//    {unreadNotifications?.length >= 1 && (
//   <button className="p-2 w-2/6 bg-slate-700 text-white rounded-lg mb-4">
//     <h1>{unreadNotifications.length}</h1>
//   </button>
// )}

//       <button onClick={markAllAsViewed} className=" p-2 w-2/6 bg-slate-700 text-white rounded-lg mb-4">
//         Mark all as viewed
//       </button>

//       {modifiedNotifications && modifiedNotifications.map((notification) => (
//         <div
//           key={notification.id}
//           className={`flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md ${
//             viewedNotifications.includes(notification.id) ? 'opacity-50' : ''
//           }`}
//         >
//           <img src={notification.userDp} alt="User DP" className="w-10 h-10 rounded-full mr-4" />
//           <div className="mr-4">{getNotificationIcon(notification.type)}</div>
//           <div className="flex-1">
//             <div className="text-gray-900 dark:text-gray-100">
//               <span className="font-bold">{notification.username}</span> {notification.content}
//             </div>
//             <div className="text-gray-500 dark:text-gray-400 text-sm">{notification.time}</div>
//           </div>
//           <button onClick={() => markAsViewed(notification.id)} className="text-sm text-blue-500">
//             Mark as Viewed
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default IndividualNotifications;

import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaUserPlus,
  FaUserCheck,
  FaUserTimes,
  FaUsers,
  FaUserMinus,
  FaPhoneSlash,
} from "react-icons/fa";
import { useSocketContext } from "../../Context/SocketContext";
import useUserDetails from "../../Hooks/useUserDetails";
import useGetMessages from "../../Hooks/useGetMessages";
import unReadNotificationsFunction from "../../utils/unReadNotificationsFunction";
import { getAllUsers } from "../../API/User/user";
import { getTimeDifference } from "../../utils/timeAgo";

const getNotificationIcon = type => {
  switch (type) {
    case "message":
      return <FaEnvelope className="text-blue-500" />;
    case "like":
      return <FaThumbsUp className="text-green-500" />;
    case "dislike":
      return <FaThumbsDown className="text-red-500" />;
    case "comment":
      return <FaComment className="text-purple-500" />;
    case "follow":
      return <FaUserPlus className="text-yellow-500" />;
    case "accept":
      return <FaUserCheck className="text-green-500" />;
    case "reject":
      return <FaUserTimes className="text-red-500" />;
    case "groupAdd":
      return <FaUsers className="text-blue-500" />;
    case "groupRemove":
      return <FaUserMinus className="text-red-500" />;
    case "missedCall":
      return <FaPhoneSlash className="text-orange-500" />;
    default:
      return null;
  }
};

const getNotificationMsg = msg => {
  switch (msg) {
    case "message":
      return "sent you a message";
    case "like":
      return "liked your post";
    case "dislike":
      return "disliked your post";
    case "comment":
      return "commented on your post";
    case "follow":
      return "sent you a follow request";
    case "accept":
      return "accepted your friend request";
    case "reject":
      return "rejected your follow request";
    case "groupAdd":
      return "added you to the group";
    case "groupRemove":
      return "removed you from the group";
    case "missedCall":
      return "tried calling you earlier.";
    default:
      return null;
  }
};

const IndividualNotifications = () => {
  const [allUsers, setAllUsers] = useState(null);
  const { notifications, markAllNotificationAsRead } = useSocketContext();

  useEffect(() => {
    getAllUsersData();
  }, []);

  const getAllUsersData = async () => {
    const allUsersData = await getAllUsers();
    if (allUsersData) {
      setAllUsers(allUsersData.user);
    }
  };

  const unreadNotifications = unReadNotificationsFunction(notifications);

  const modifiedNotifications = unreadNotifications.map(n => {
    const sender = allUsers?.find(user => user._id === n.senderId);
    return {
      ...n,
      senderName: sender?.username,
      userDp: sender?.dp,
      type: "message",
      msg: "message",
      time: getTimeDifference(new Date()),
    };
  });

  const [viewedNotifications, setViewedNotifications] = useState([]);

  const markAllAsViewed = () => {
    markAllNotificationAsRead(notifications);
    setViewedNotifications(notifications.map(notification => notification._id));
  };

  return (
    <div className="flex flex-col w-full p-4 space-y-4">
      <button
        onClick={markAllAsViewed}
        className="p-2  bg-slate-700 text-white rounded-lg mb-4">
        Mark all as viewed
      </button>

      {modifiedNotifications &&
        modifiedNotifications.map(notification => (
          <div
            key={notification._id}
            className={`flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg ${
              viewedNotifications.includes(notification._id) ? "opacity-50" : ""
            }`}>
            <img
              src={notification.userDp}
              alt="User DP"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="mr-4">{getNotificationIcon(notification.type)}</div>
            <div>
              <span className="font-bold">{notification.senderName}</span>{" "}
              {getNotificationMsg(notification.msg)}
         

              <div className="text-xs text-gray-500">{notification?.message.message}</div>
              <div className="text-xs text-gray-500">{notification.time}</div>
            </div>
          </div>
        ))}

      {modifiedNotifications?.length <= 0 && (
        <>
          <p>No notifications</p>
        </>
      )}
    </div>
  );
};

export default IndividualNotifications;
