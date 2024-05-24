import { toast } from "react-toastify";
import { sendUnfollowRequest } from "../API/User/user";
import { User } from "../Components/Friends/FriendsMiddlePage";

export const unfollowUser = async (
  currentUser: User,
  targetUserId: string, 
  targetUserUserName: string, 
) => {
  try {
    console.log("Follow user pressed for: ", targetUserId, targetUserUserName);
    console.log("Main user: ", currentUser._id, currentUser.name);


 

    const unfollowResult = await sendUnfollowRequest(currentUser._id, targetUserId);

    console.log("unfollowResult: ", unfollowResult);

    const updatedUsers = users.map(user => {
      if (user._id === targetUserId) {
        toast.success("You have unfollowed this user");
        return {
          ...user,
          followers: user.followers.filter(follower => follower.userId !== currentUser._id),
        };
      }
      return user;
    });

  } catch (error) {
    toast.error("Failed to unfollow user");
  }
};
