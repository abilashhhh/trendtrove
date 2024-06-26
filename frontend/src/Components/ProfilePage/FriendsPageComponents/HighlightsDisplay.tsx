import React, { useEffect, useState } from "react";
import { getHighlightsUsingUsername, getStoriesForHighlightsUsingUsername } from "../../../API/Post/post";

const HighlightsDisplay =({ username }: { username: string }) => {
  const [storyhighlights, setStoryhighlights] = useState([]);
  const [storyhighlights2, setStoryhighlights2] = useState([]);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [storyDetails, setStoryDetails] = useState([]);
  useEffect(() => {
    const getAllUserHighlights = async () => {
      const stories = await getHighlightsUsingUsername(username);
      if (stories.status === "success") {
        setStoryhighlights(stories?.data);
      }
    };
    getAllUserHighlights();
  }, []);

  useEffect(() => {
    const getAllStoriesOfUser = async () => {
      const stories = await getStoriesForHighlightsUsingUsername(username);
      if (stories.status === "success") {
        setStoryhighlights2(stories?.data);
      }
    };
    getAllStoriesOfUser();
  }, []);

  console.log("Story highlights 1 : ", storyhighlights)
  console.log("Story highlights 2 : ", storyhighlights2)

  return <div className="">
    
    
    <div className="rounded-lg flex gap-2 overflow-y-auto no-scrollbar w-full h-full">
        {storyhighlights &&
          storyhighlights.map((story, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg p-2 flex-shrink-0 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            //   onClick={() => handleHighlightClick(story)}
            >
              <div>
                <img
                  className="rounded-full w-32 h-32"
                  src={story.coverImage}
                  alt="Story Highlight"
                />
              </div>
              <div className="text-center text-sm mt-2 flex gap-2 items-center">
                {story.highlightName}
              </div>
            </div>
          ))}
      </div>
  </div>;
};

export default HighlightsDisplay;
