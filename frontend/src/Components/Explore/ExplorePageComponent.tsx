import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { getAllPublicPostsForExplore } from "../../API/Post/post";
import { useNavigate } from "react-router-dom";

const MediaItem = ({ type, src }) => {
  if (type === "image") {
    return <img src={src} alt="Media" className="w-full h-full object-cover" />;
  } else if (type === "video") {
    return (
      <video autoPlay loop controls className="w-full h-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
    );
  }
  return null;
};


const getRandomSpan = () => {
  const spans = [ 5, 4, 5,6, 3 , 4 ];
  return spans[Math.floor(Math.random() * spans.length)];
};

const ExplorePageComponent = () => {
  const [allPosts, setAllPosts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const allPosts = await getAllPublicPostsForExplore();
        setAllPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <Layout>
      <main className="bg-gray-800 min-h-screen dark:bg-gray-700 text-black dark:text-white p-2 w-full sm:-ml-2">
        <div className="h-full w-full overflow-y-auto no-scrollbar p-2 bg-gray-200 dark:bg-gray-900 mb-2 md:mb-4 lg:mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {allPosts.map((post, index) => (
              <React.Fragment key={post._id + index}>
                {post.images && (
                  <div
                    onClick={() => navigate(`/post/${post._id}`)} 
                    className={`col-span-${getRandomSpan()} row-span-${getRandomSpan()} w-full h-full cursor-pointer`}
                  >
                    <MediaItem type="image" src={post.images} />
                  </div>
                )}
                {post.videos && (
                  <div
                    onClick={() => navigate(`/post/${post._id}`)} 
                    className={`col-span-${getRandomSpan()} row-span-${getRandomSpan()} w-full h-full cursor-pointer`}
                  >
                    <MediaItem type="video" src={post.videos} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ExplorePageComponent;
