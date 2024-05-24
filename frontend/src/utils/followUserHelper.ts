import { toast } from "react-toastify";
import { sendFollowRequest } from "../API/User/user";
import { User } from "../Components/Friends/FriendsMiddlePage";

export const followUser = async (
  currentUser: User,
  targetUserId: string,
  targetUserUserName: string,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setFollowRequests: React.Dispatch<React.SetStateAction<string[]>>
) => {
  console.log("Follow user pressed for: ", targetUserId, targetUserUserName);
  console.log("Main user: ", currentUser._id, currentUser.name);

  const targetUser = users.find(user => user._id === targetUserId);
  const isFollowing = targetUser?.followers.some(follower => follower.userId === currentUser._id);
  const isRequestSent = targetUser?.requestsForMe?.some(request => request.userId === currentUser._id);

  if (isFollowing) {
    toast.info("You are already following this user");
    return;
  }

  if (isRequestSent) {
    toast.info("Friend request already sent");
    return;
  }

  try {
    const followRequestResult = await sendFollowRequest(currentUser._id, targetUserId);
    console.log("followRequestResult: ", followRequestResult);

    const updatedUsers = users.map(user => {
      if (user._id === targetUserId) {
        if (followRequestResult.message === "You are now following this user") {
          toast.success("You are now following this user");
          return {
            ...user,
            followers: [...user.followers, { userId: currentUser._id, followedAt: new Date().toISOString() }],
          };
        } else if (followRequestResult.message === "Friend request sent") {
          toast.success("Friend request sent");
          return {
            ...user,
            requestsForMe: [...user.requestsForMe, { userId: currentUser._id, followedAt: new Date().toISOString() }],
          };
        } else if (followRequestResult.message === "Friend request already sent") {
          toast.info("Friend request already sent");
        } else if (followRequestResult.message === "Already following this user") {
          toast.info("You are already following this user");
        }
      }
      return user;
    });

    setUsers(updatedUsers);
    setFollowRequests(prev => [...prev, targetUserId]);
  } catch (error) {
    toast.error("Failed to send follow request");
  }
};
