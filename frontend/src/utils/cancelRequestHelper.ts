import { toast } from "react-toastify";
import { sendCancelFollowRequest } from "../API/User/user";
import { User } from "../Components/Friends/FriendsMiddlePage";

export const cancelFollowRequest = async (
  currentUser: User,
  targetUserId: string,
  targetUserUserName: string,
) => {
  try {
    console.log("Follow user pressed for: ", targetUserId, targetUserUserName);
    console.log("Main user: ", currentUser._id, currentUser.name);
 

    const cancelResult = await sendCancelFollowRequest(
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

  } catch (error) {
    toast.error("Failed to cancel follow request");
  }
};
