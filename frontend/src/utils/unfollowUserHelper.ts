import { toast } from "react-toastify";
import { unfollowUserAPI } from "../API/User/user";
import { User } from "../Components/Friends/FriendsMiddlePage";

export const unfollowUser = async (
  currentUser: User,
  targetUserId: string,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setUnFollowRequests: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const unfollowResult = await unfollowUserAPI(currentUser._id, targetUserId);
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
    setUnFollowRequests(prev => [...prev, targetUserId]);
  } catch (error) {
    toast.error("Failed to unfollow user");
  }
};
