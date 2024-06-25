import React, { useEffect, useState } from "react";
import { getStoriesForHighlights } from "../../API/Post/post";

const StoryHighlightsUserProfile = () => {
  const [storyhighlights, setStoryhighlights] = useState<string[]>([]);

  useEffect(() => {
    const getAllStoriesOfUser = async () => {
      const stories = await getStoriesForHighlights();
      console.log("Stories of user :stories.data:  ", stories.data);
      if (stories.status === "success") {
        setStoryhighlights(stories?.data);
      }
    };
    getAllStoriesOfUser();
  }, []);

  return (
    <div className="rounded-lg bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar justify-center">
      {storyhighlights && storyhighlights.map((story, index) => (
        <div key={index} className="p-2">
          {story.mediaType === "video" ? (
            <video className="w-full h-80 object-cover rounded-lg" controls>
              <source src={story.mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              className="w-full h-80 object-cover rounded-lg"
              src={story.mediaUrl}
              alt="Story Highlight"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StoryHighlightsUserProfile;
