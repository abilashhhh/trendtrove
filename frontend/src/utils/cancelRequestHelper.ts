import { toast } from "react-toastify";
import { cancelFollowRequestAPI } from "../API/User/user";
import { User } from "../Components/Friends/FriendsMiddlePage";

export const cancelFollowRequest = async (
  currentUser: User,
  targetUserId: string,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setCancelFollowRequests: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    const cancelResult = await cancelFollowRequestAPI(currentUser._id, targetUserId);
    console.log("cancelResult: ", cancelResult);

    const updatedUsers = users.map(user => {
      if (user._id === targetUserId) {
        toast.success("Follow request cancelled");
        return {
          ...user,
          requestsForMe: user.requestsForMe?.filter(request => request.userId !== currentUser._id) || [],
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setCancelFollowRequests(prev => prev.filter(id => id !== targetUserId));
  } catch (error) {
    toast.error("Failed to cancel follow request");
  }
};
