// // ProfileMainCenterComponent.js
// import React from "react";
// import Followers from "./ProfileCenter/Followers";
// import Following from "./ProfileCenter/Following";
// import Profile from "./ProfileCenter/Profile";

// const ProfileMainCenterComponent: React.FC = () => {
//   return (
//     <main className="flex flex-auto md:flex-row bg-gray-800 dark:bg-gray-700 text-black dark:text-white min-h-screen overflow-y-auto  no-scrollbar">
//       <div className="flex-1 w-full overflow-y-auto  no-scrollbar">
//         <Profile />
//       </div>
//       <div className=" flex ">
//         <div className="   no-scrollbar overflow-y-auto">
//           <Followers />
//         </div>
//         <div className="overflow-y-auto  no-scrollbar ">
//           <Following />
//         </div>
//       </div>
//     </main>
//   );
// };

// export default ProfileMainCenterComponent;


import React from "react";
import Followers from "./ProfileCenter/Followers";
import Following from "./ProfileCenter/Following";
import Profile from "./ProfileCenter/Profile";

const ProfileMainCenterComponent: React.FC = () => {
  return (
    <main className="flex flex-auto md:flex-row bg-gray-800 dark:bg-gray-700 text-black dark:text-white min-h-screen overflow-y-auto no-scrollbar">
      <div className="flex-1 w-full overflow-y-auto no-scrollbar">
        <Profile />
      </div>

      <div className="hidden md:flex overflow-y-auto">
        <div className="no-scrollbar overflow-y-auto">
          <Followers />
        </div>
        
        <div className="overflow-y-auto no-scrollbar">
          <Following />
        </div>
      </div>
    </main>
  );
};

export default ProfileMainCenterComponent;
