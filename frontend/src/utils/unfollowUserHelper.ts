import { toast } from "react-toastify";
import { sendUnfollowRequest } from "../API/User/user";

export const unfollowUser = async (
  currentUser: string,
  targetUserId: string, 
  targetUserUserName: string, 
) => {
  try {
    console.log("Follow user pressed for: ", targetUserId, targetUserUserName);

    const unfollowResult = await sendUnfollowRequest(currentUser, targetUserId);

    console.log("unfollowResult: ", unfollowResult);

    if (unfollowResult.status === "success") {
      toast.success(`Successfully unfollowed ${targetUserUserName}`);
      return true
    } else {
      toast.error(`Failed to unfollow ${targetUserUserName}: ${unfollowResult.message}`);
      return false
    }


  } catch (error) {
    console.error("Failed to unfollow user:", error);
    toast.error("Failed to unfollow user");
  }
};
