import { toast } from "react-toastify";
import { sendCancelFollowRequest } from "../API/User/user";

export const cancelFollowRequest = async (
  currentUser: string,
  targetUserId: string,
  targetUserUserName: string,
) => {
  try {
    console.log("Follow user pressed for: ", targetUserId, targetUserUserName);
    console.log("Main user: ", currentUser._id, currentUser.name);
 

    const cancelResult = await sendCancelFollowRequest(
      currentUser,
      targetUserId
    );
    console.log("cancelResult: ", cancelResult);
    if (cancelResult.status === "success") {
      toast.success(`Successfully cancelled friend request for ${targetUserUserName}`);
      return true

    } else {
      toast.error(`Failed to cancell friend request for ${targetUserUserName}: ${cancelResult.message}`);
      return false
    }
  } catch (error) {
    toast.error("Failed to cancel follow request");
  }
};
