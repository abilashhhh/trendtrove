import { toast } from "react-toastify";
import { sendUnollowRequest } from "../API/User/user";
import { User } from "../Components/Friends/FriendsMiddlePage";

export const unfollowUser = async (
  currentUser: User,
  targetUserId: string, 
  targetUserUserName: string, 
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
) => {
  try {
    console.log("Follow user pressed for: ", targetUserId, targetUserUserName);
    console.log("Main user: ", currentUser._id, currentUser.name);



    const targetUser = users.find(user => user._id === targetUserId);
    const isFollowing = targetUser?.followers.some(follower => follower.userId === currentUser._id);
    const isRequestSent = targetUser?.requestsForMe?.some(request => request.userId === currentUser._id);
  
    if (!isFollowing) {
      toast.info("You are not following this user");
      return;
    }
  
    if (!isRequestSent) {
      toast.info("You have not sent a friend request");
      return;
    }


    const unfollowResult = await sendUnollowRequest(currentUser._id, targetUserId);

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

    setUsers(updatedUsers);
  } catch (error) {
    toast.error("Failed to unfollow user");
  }
};
