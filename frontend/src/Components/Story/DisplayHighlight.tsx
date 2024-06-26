import React, { useEffect, useState } from "react";
import { FaPen, FaPlusCircle, FaTimes } from "react-icons/fa";
import { gethighlightsdata } from "../../API/Post/post";

const DisplayHighlight = () => {
  const [storyhighlights, setStoryhighlights] = useState([]);

  useEffect(() => {
    const getAllStoriesOfUserHighlights = async () => {
      const stories = await gethighlightsdata();
      console.log("Stories of user :stories.data:  ", stories.data);
      if (stories.status === "success") {
        setStoryhighlights(stories?.data);
      }
    };
    getAllStoriesOfUserHighlights();
  }, []);
  return (
    <>
      <div>
        <dialog id={`editHighlight`} className="modal">
          <div className="modal-box w-full max-w-3xl text-black dark:text-gray-300   overflow-auto no-scrollbar bg-gray-200 dark:bg-gray-800">
            <h3 className="font-bold text-lg underline my-2">Edit highlight</h3>

            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="  gap-3 flex justify-between">
              <label className="form-control  w-full max-w-xs">
                <div className="flex">
                  <div className="label ">
                    <span className="label-text  text-black dark:text-gray-300 bg-gray-200 dark:bg-gray-800">
                      Edit name of highlight:
                    </span>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input  text-black dark:text-gray-300 bg-gray-200 dark:bg-gray-800 input-bordered w-full max-w-xs"
                    />
                  </div>
                </div>
              </label>

              <div>
                <button className="btn  text-black dark:text-gray-400 bg-gray-200  hover:bg-slate-300  hover:dark:bg-slate-800 dark:bg-gray-900 ">
                  Submit
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 "></div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>


      <div className="rounded-lg flex gap-2 overflow-y-auto no-scrollbar  w-full h-full">
        {storyhighlights &&
          storyhighlights.map((story, index) => (
            <div
              className="flex flex-col items-center  rounded-lg p-2 flex-shrink-0"
              onClick={() =>
                document.getElementById(`editHighlight`).showModal()
              }>
              <div key={index} className=" ">
                <img
                  className=" rounded-full  w-32 h-32"
                  src={story.coverImage}
                  alt="Story Highlight"
                />
              </div>
              <div className="text-center text-sm mt-2 flex gap-2 items-center ">
                {story.highlightName}{" "}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default DisplayHighlight;
