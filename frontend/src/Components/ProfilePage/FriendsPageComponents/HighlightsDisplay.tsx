import React, { useEffect, useState } from "react";
import { getHighlightsUsingUsername, getStoriesForHighlightsUsingUsername } from "../../../API/Post/post";

const HighlightsDisplay =({ username }: { username: string }) => {
  const [highlightsData, setHighlightsData] = useState([]);
  const [storyhighlights, setStoryhighlights] = useState([]);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [storyDetails, setStoryDetails] = useState([]);

  useEffect(() => {
    const getAllUserHighlights = async () => {
      const stories = await getHighlightsUsingUsername(username);
      if (stories.status === "success") {
        setHighlightsData(stories?.data);
      }
    };
    getAllUserHighlights();
  }, []);

  useEffect(() => {
    const getAllStoriesOfUser = async () => {
      const stories = await getStoriesForHighlightsUsingUsername(username);
      if (stories.status === "success") {
        setStoryhighlights(stories?.data);
      }
    };
    getAllStoriesOfUser();
  }, []);


  console.log("selected highlight id; ", selectedHighlight)
  console.log("highlights 1 : ", highlightsData)
  console.log("Stories  : ", storyhighlights)

  return <div className="">
    
    
    <div className="rounded-lg flex gap-2 overflow-y-auto no-scrollbar w-full h-full">
        {highlightsData &&
          highlightsData.map((highlights, index) => (
            <div
              key={index}

              className="flex flex-col items-center rounded-lg p-2 flex-shrink-0 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setSelectedHighlight(highlights._id)}
            >
              <div>
                <img
                  className="rounded-full w-16 h-1w-16 sm:w-16 sm:h-1w-16 md:w-16 md:h-1w-16 lg:w-24 lg:h-24"
                  src={highlights.coverImage}
                  alt="highlights Highlight"
                />
              </div>
              <div className="text-center text-sm mt-2 flex gap-2 items-center">
                {highlights.highlightName}
              </div>
            </div>
          ))}
      </div>
  </div>;
};

export default HighlightsDisplay;
