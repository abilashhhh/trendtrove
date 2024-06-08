import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../Layout";
import useUserDetails from "../../Hooks/useUserDetails";

const CommentsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const userDetails = useUserDetails();
  const navigate = useNavigate();

  return (
    <Layout>
      <div>CommentsPage</div>
      <div>
        <strong>Post ID:</strong> {postId || "No post ID provided"}
      </div>
      <div>
        <strong>Username:</strong> {userDetails ? userDetails.username : "Loading..."}
      </div>
      <div>
        <strong>User ID:</strong> {userDetails ? userDetails._id : "Loading..."}
      </div>
    </Layout>
  );
};

export default CommentsPage;
