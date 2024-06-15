import { useEffect, useState } from "react";
import { getAllUsers } from "../API/User/user";
import { getFriendsUserInfo } from "../API/Chat/chat";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const [allUsersResponse, mutualFriendsResponse] = await Promise.all([
          getAllUsers(),
          getFriendsUserInfo(),
        ]);

        const allUsers = allUsersResponse?.user || [];
        const mutualFriends = mutualFriendsResponse?.data || [];

        const combinedUsers = [
          ...mutualFriends,
          ...allUsers.filter(
            (user: { _id: any; }) => !mutualFriends.some((friend: { _id: any; }) => friend._id === user._id)
          ),
        ];

        setConversations(combinedUsers);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const conversationsData = conversations.filter((user) =>
    user?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("conversationsData: ", conversationsData)
  console.log("setSearchQuery: ", setSearchQuery)
  console.log("loading: ", loading)

  return { loading, conversationsData, setSearchQuery };
};

export default useGetConversations;


