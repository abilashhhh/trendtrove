import React, { useEffect, useState } from "react";
import { FaPen, FaPlusCircle, FaTimes } from "react-icons/fa";
import { getStoriesForHighlights } from "../../API/Post/post";
import { TiTick } from "react-icons/ti";

const EditHighlight = () => {
  const [storyhighlights, setStoryhighlights] = useState([]);

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
    <>
      {/* //////////////// Edit Highlight ////////////  */}

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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
              {storyhighlights &&
                storyhighlights.map((story, index) => (
                  <div key={index} className="p-2 ">
                    {story.mediaType === "video" ? (
                      <video
                        className="w-32 h-44 object-cover   rounded-lg"
                        controls>
                        <source src={story.mediaUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        className="w-32 h-44 object-cover rounded-lg"
                        src={story.mediaUrl}
                        alt="Story Highlight"
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>

      {/* //////////////// Add New Highlight ////////////  */}

      <div className="rounded-lg flex gap-2 overflow-y-auto no-scrollbar p-4 w-full h-full">
        <div
          onClick={() => document.getElementById(`addNewHighlight`).showModal()}
          className="bg-slate-200 flex flex-col justify-center items-center cursor-pointer p-4 dark:bg-slate-800 w-32 h-32 rounded-full flex-shrink-0">
          <FaPlusCircle className="text-2xl" />
          <div className="text-center text-sm">Create new highlight</div>
        </div>
        <div className="flex flex-col items-center w-32 h-32 rounded-lg p-2 flex-shrink-0">
          <img
            src={
              "http://res.cloudinary.com/ddiqmcmxy/image/upload/v1718875646/postimage/uqccqmwfk2udjscahkz7.jpg"
            }
            className="rounded-full  w-32 h-32"
          />
          <div className="text-center text-sm mt-2 flex gap-2 items-center ">
            dsfsdffdss{" "}
            <span>
              <FaPen
                className="cursor-pointer"
                onClick={() =>
                  document.getElementById(`editHighlight`).showModal()
                }
              />
            </span>
          </div>
        </div>
      </div>
 
    </>
  );
};

export default EditHighlight;
