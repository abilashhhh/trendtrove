import React, { useEffect, useState } from "react";
import {
  getStoriesForHighlights,
  gethighlightsdata,
} from "../../API/Post/post";
import { formatDateTime } from "../../utils/timeAgo";
import { FaPen } from "react-icons/fa";

const DisplayHighlight = () => {
  const [storyhighlights, setStoryhighlights] = useState([]);
  const [storyhighlights2, setStoryhighlights2] = useState([]);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [storyDetails, setStoryDetails] = useState([]);

  useEffect(() => {
    const getAllStoriesOfUserHighlights = async () => {
      const stories = await gethighlightsdata();
      if (stories.status === "success") {
        setStoryhighlights(stories?.data);
      }
    };
    getAllStoriesOfUserHighlights();
  }, []);

  useEffect(() => {
    const getAllStoriesOfUser = async () => {
      const stories = await getStoriesForHighlights();
      if (stories.status === "success") {
        setStoryhighlights2(stories?.data);
      }
    };
    getAllStoriesOfUser();
  }, []);

  const handleHighlightClick = async highlight => {
    setSelectedHighlight(highlight);
    const storyIds = highlight.selectedStories;
    const details = storyhighlights2.filter(story =>
      storyIds.includes(story._id)
    );
    setStoryDetails(details);
    document.getElementById("editHighlight").showModal();
  };

  return (
    <>
      <div>
        <dialog id="editHighlight" className="modal">
          <div className="modal-box w-full max-w-3xl text-black dark:text-gray-300 overflow-auto no-scrollbar bg-gray-200 dark:bg-gray-800">
            {selectedHighlight && (
              <div className="items-center">
                <div className="bg-gray-800 p-2 items-center flex flex-col">
                  <h3 className="font-bold text-lg underline p-2">
                    {selectedHighlight.highlightName}{" "}
                    <button className="  absolute right-7 top-10">
                      <FaPen />
                    </button>
                  </h3>
                  <div className="mb-4">
                    <img
                      className="rounded-full w-32 h-32"
                      src={selectedHighlight.coverImage}
                      alt="Selected Highlight"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Stories:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                    {storyDetails.map((story, index) => (
                      <li
                        key={index}
                        className="bg-slate-200 dark:bg-slate-900 p-2 m-2 flex flex-col items-center rounded-lg shadow-lg">
                        <div className="w-full h-44 relative">
                          {story.mediaType === "video" ? (
                            <video
                              className="w-full h-full object-cover rounded-lg"
                              controls>
                              <source src={story.mediaUrl} type="video/mp4" />
                            </video>
                          ) : (
                            <img
                              className="w-full h-full object-cover rounded-lg"
                              src={story.mediaUrl}
                              alt="Story Media"
                            />
                          )}
                        </div>
                        <div className="p-2 text-center">
                          <p className="font-semibold">{story.captions}</p>
                          <p className="text-xs text-gray-500">
                            {formatDateTime(story.createdAt)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
         
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      <div className="rounded-lg flex gap-2 overflow-y-auto no-scrollbar w-full h-full">
        {storyhighlights &&
          storyhighlights.map((story, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-lg p-2 flex-shrink-0 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => handleHighlightClick(story)}>
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
    </>
  );
};

export default DisplayHighlight;
