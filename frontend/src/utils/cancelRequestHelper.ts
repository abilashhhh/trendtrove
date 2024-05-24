import { toast } from "react-toastify";
import { cancelFollowRequestAPI } from "../API/User/user";
import { User } from "../Components/Friends/FriendsMiddlePage";

export const cancelFollowRequest = async (
  currentUser: User,
  targetUserId: string,
  targetUserUserName: string,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  try {
    console.log("Follow user pressed for: ", targetUserId, targetUserUserName);
    console.log("Main user: ", currentUser._id, currentUser.name);

    const targetUser = users.find(user => user._id === targetUserId);
    const isFollowing = targetUser?.followers.some(
      follower => follower.userId === currentUser._id
    );
    const isRequestSent = targetUser?.requestsForMe?.some(
      request => request.userId === currentUser._id
    );

    if (isFollowing) {
      toast.info("You are already following this user");
      return;
    }

    if (isRequestSent) {
      toast.info("Friend request already sent");
      return;
    }

    const cancelResult = await cancelFollowRequestAPI(
      currentUser._id,
      targetUserId
    );
    console.log("cancelResult: ", cancelResult);

    const updatedUsers = users.map(user => {
      if (user._id === targetUserId) {
        toast.success("Follow request cancelled");
        return {
          ...user,
          requestsForMe:
            user.requestsForMe?.filter(
              request => request.userId !== currentUser._id
            ) || [],
        };
      }
      return user;
    });

    setUsers(updatedUsers);
  } catch (error) {
    toast.error("Failed to cancel follow request");
  }
};
