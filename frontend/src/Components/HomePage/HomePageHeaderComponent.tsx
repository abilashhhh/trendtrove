// import React from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { StoreType } from "../../Redux/Store/reduxStore";

// interface HeaderProps {
//   toggleLeftSidebar: () => void;
// }

// const Header: React.FC<HeaderProps> = ({ toggleLeftSidebar }) => {
//   const currentUser: any = useSelector(
//     (state: StoreType) => state.userAuth.user
//   );

//   console.log("use selector", currentUser);

//   return (
//     <div className="bg-gray-800 dark:bg-gray-700 pl-2 pr-2 pt-2">
//       <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white p-4 flex justify-between items-center rounded-lg">
//         <div className="space-x-4 md:hidden flex">
//           <button onClick={toggleLeftSidebar}>☰</button>
//         </div>
//         <h1 className="text-2xl flex items-center">
//           <span className="text-gray-500 dark:text-slate-300 text-2xl sm:text-3xl lg:text-4xl font-extrabold">
//             Trend
//           </span>
//           <span className="ml-1 text-black dark:text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold">
//             Trove
//           </span>
//         </h1>

//         <div className="flex items-center space-x-2">
//           {currentUser ? (
//             <Link to="/profile">
//               <img
//                 className="rounded-full h-12 w-12 object-cover"
//                 src={currentUser.dp}
//                 alt="User Profile"
//               />
//             </Link>
//           ) : (
//             <span className="text-white">
//               <Link to="/profile">
//                 <img
//                   className="rounded-full h-12 w-12 object-cover"
//                   src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
//                   alt="User Profile"
//                 />
//               </Link>
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;



import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { StoreType } from "../../Redux/Store/reduxStore";

interface HeaderProps {
  toggleLeftSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleLeftSidebar }) => {
  const currentUser: any = useSelector((state: StoreType) => state.userAuth.user);

  console.log("use selector", currentUser);

  return (
    <div className="bg-gray-800 dark:bg-gray-700 pl-2 pr-2 pt-2">
      <div className="bg-gray-200 dark:bg-gray-900 text-black dark:text-white p-4 flex justify-between items-center rounded-lg">
        <div className="space-x-4 md:hidden flex">
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

        <div className="flex items-center space-x-2">
          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-12 w-12 object-cover"
                src={currentUser.dp || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                alt="User Profile"
              />
            </Link>
          ) : (
            <span className="text-white">
              <Link to="/profile">
                <img
                  className="rounded-full h-12 w-12 object-cover"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt="User Profile"
                />
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
