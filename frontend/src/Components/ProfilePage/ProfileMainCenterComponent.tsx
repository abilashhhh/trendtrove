import React from "react";
import Followers from "./ProfileCenter/Followers";
import Following from "./ProfileCenter/Following";
import Profile from "./ProfileCenter/Profile";
import { UserInfo } from "../../Types/userProfile";

interface ProfileMainCenterComponentProps {
  userDetails: UserInfo;
}

const ProfileMainCenterComponent: React.FC<ProfileMainCenterComponentProps> = ({ userDetails }) => {
  return (
   
        <main className="flex-1 p-2 overflow-auto bg-slate-800 dark:bg-gray-700 text-black dark:text-white flex">
 
        <div className="flex-1 w-full overflow-y-auto no-scrollbar">
        <Profile userDetails={userDetails} />
      </div>

      <div className=" md:flex overflow-y-auto">
        <div className="no-scrollbar overflow-y-auto">
          <Followers userDetails={userDetails} />
        </div>
        
        <div className="overflow-y-auto no-scrollbar">
          <Following userDetails={userDetails} />
        </div>
      </div>
    </main>
  );
};

export default ProfileMainCenterComponent;
