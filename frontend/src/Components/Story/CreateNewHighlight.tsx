import React, { useEffect, useState } from "react";
import {  FaTimes } from "react-icons/fa";
import { createStoryHighlights, getStoriesForHighlights } from "../../API/Post/post";
import { TiTick } from "react-icons/ti";
import ImageCropper from "../ImageCropper";
import upload from "../../utils/cloudinary";

const CreateNewHighlight = () => {
  const [storyHighlights, setStoryhighlights] = useState([]);
  const [selectedStories, setSelectedStories] = useState([]);
  const [highlightName, setHighlightName] = useState("");
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    const getAllStoriesOfUser = async () => {
      const stories = await getStoriesForHighlights();
      // console.log("Stories of user :stories.data:  ", stories.data);
      if (stories.status === "success") {
        setStoryhighlights(stories?.data);
      }
    };
    getAllStoriesOfUser();
  }, []);

  const handleTickClick = storyId => {
    setSelectedStories(prevSelected =>
      prevSelected.includes(storyId)
        ? prevSelected.filter(id => id !== storyId)
        : [...prevSelected, storyId]
    );
  };

  const handleCoverImageUpload = event => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setImageToCrop(fileUrl);
      setIsCropping(true);
    }
  };

  const handleCropComplete = (croppedUrl: string) => {
    setCroppedImageUrl(croppedUrl);
    setIsCropping(false);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await upload(
      croppedImageUrl,
      err => console.error(err),
      "highlightsCover",
      "image"
    );

    const resUrl = response.url;
    console.log("response url: ", response.url);

    const payload = {
      highlightName,
      coverImage: resUrl,
      selectedStories
    };

    console.log("Payload:", payload);

    const createHighlight = await createStoryHighlights(payload);
    console.log("CreateHighlight:", createHighlight);


    document.getElementById("addNewHighlight").close();
  };

  return (
    <dialog id="addNewHighlight" className="modal">
      <div className="modal-box w-full  max-w-3xl text-black dark:text-gray-300 overflow-auto no-scrollbar bg-gray-200 dark:bg-gray-800">
        <h3 className="font-bold text-lg underline my-2">
          Create new highlight
        </h3>

        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <form onSubmit={handleSubmit}>
          <div className="gap-3 flex justify-between mb-2">
            <label className="form-control w-full max-w-xs">
              <div className="flex">
                <div className="label">
                  <span className="label-text text-black dark:text-gray-300 bg-gray-200 dark:bg-gray-800">
                    Name of highlight:
                  </span>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input text-black dark:text-gray-300 bg-gray-200 dark:bg-gray-800 input-bordered w-full max-w-xs"
                    value={highlightName}
                    onChange={e => setHighlightName(e.target.value)}
                  />
                </div>
              </div>
            </label>

            <div>
              <button
                type="submit"
                className="btn text-black dark:text-gray-400 bg-gray-200 hover:bg-slate-300 hover:dark:bg-slate-800 dark:bg-gray-900">
                Submit
              </button>
            </div>
          </div>

          <div className="mb-2">
            <label className="form-control w-full max-w-xs">
              <div className="flex">
                <div className="label">
                  <span className="label-text text-black dark:text-gray-300 bg-gray-200 dark:bg-gray-800">
                    Highlight Cover Image:
                  </span>
                </div>
                <div>
                  <input
                    type="file"
                    className="input text-black dark:text-gray-300 bg-gray-200 dark:bg-gray-800 input-bordered w-full max-w-xs"
                    onChange={handleCoverImageUpload}
                  />
                </div>
              </div>
              {croppedImageUrl && <img src={croppedImageUrl} alt="" />}
            </label>
          </div>
          <h1>Select stories to add </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {storyHighlights &&
              storyHighlights.map((story, index) => (
                <div key={index} className="p-2">
                  {story.mediaType === "video" ? (
                    <div>
                      <video
                        className="w-32 h-44 object-cover rounded-none rounded-tr-lg rounded-tl-lg"
                        controls>
                        <source src={story.mediaUrl} type="video/mp4" />
                      </video>
                      <div className="p-2 gap-2 bg-gray-300 dark:bg-gray-900 rounded-none rounded-br-lg rounded-bl-lg flex justify-evenly">
                        <TiTick
                          className={`cursor-pointer text-2xl ${
                            selectedStories.includes(story._id)
                              ? "bg-green-700"
                              : "bg-gray-400"
                          } rounded-full`}
                          onClick={() => handleTickClick(story._id)}
                        />
                        <FaTimes
                          className={`cursor-pointer text-2xl ${
                            !selectedStories.includes(story._id)
                              ? "bg-red-700"
                              : "bg-gray-400"
                          } rounded-full`}
                          onClick={() => handleTickClick(story._id)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <img
                        className="w-32 h-44 object-cover rounded-none rounded-tr-lg rounded-tl-lg"
                        src={story.mediaUrl}
                        alt="Story Highlight"
                      />
                      <div className="p-2 gap-2  bg-gray-300 dark:bg-gray-900 rounded-none rounded-br-lg rounded-bl-lg flex justify-evenly">
                        <TiTick
                          className={`cursor-pointer text-2xl ${
                            selectedStories.includes(story._id)
                              ? "bg-green-700"
                              : "bg-gray-400"
                          } rounded-full`}
                          onClick={() => handleTickClick(story._id)}
                        />
                        <FaTimes
                          className={`cursor-pointer text-2xl ${
                            !selectedStories.includes(story._id)
                              ? "bg-red-700"
                              : "bg-gray-400"
                          } rounded-full`}
                          onClick={() => handleTickClick(story._id)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      {isCropping && (
        <ImageCropper
          imageSrc={imageToCrop}
          aspect1={4}
          aspect2={4}
          onCropComplete={handleCropComplete}
          onClose={() => setIsCropping(false)}
        />
      )}
    </dialog>
  );
};
export default CreateNewHighlight;
