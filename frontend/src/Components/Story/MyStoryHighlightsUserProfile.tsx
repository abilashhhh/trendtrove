import React from "react";
import { FaPen, FaPlusCircle } from "react-icons/fa";

const MyStoryHighlightsUserProfile = () => {
  return (
    <>
      <div className="rounded-lg flex gap-2 overflow-y-auto no-scrollbar p-4 w-full h-full">
        <div
          onClick={() => document.getElementById(`addNewHighlight`).showModal()}
          className="bg-slate-200 flex flex-col justify-center items-center cursor-pointer p-4 dark:bg-slate-800 w-32 h-32 rounded-full flex-shrink-0">
          <FaPlusCircle className="text-2xl" />
          <div className="text-center text-sm">Create new highlight</div>
        </div>
        <div className="flex flex-col items-center w-32 h-32 rounded-lg p-2 flex-shrink-0">
          <img src={"http://res.cloudinary.com/ddiqmcmxy/image/upload/v1718875646/postimage/uqccqmwfk2udjscahkz7.jpg"}
            className="rounded-full  w-32 h-32"
          />
          <div className="text-center text-sm mt-2 flex gap-2 items-center ">
            dsfsdffdss{" "}
            <span>
            <FaPen className="cursor-pointer"  onClick={() => document.getElementById(`editHighlight`).showModal()}
       />
            </span>
          </div>
        </div>
      </div>


{/* //////////////// Edit Highlight ////////////  */}

      <div>
        <dialog id={`editHighlight`} className="modal">
          <div className="modal-box w-full max-w-3xl text-black dark:text-gray-300 bg-gray-200 dark:bg-gray-800">
            <h3 className="font-bold text-lg underline my-2">Edit highlight</h3>

            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex flex-col md:flex-row gap-3">ashdbahf</div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>



{/* //////////////// Add New Highlight ////////////  */}

      <div>
        <dialog id={`addNewHighlight`} className="modal">
          <div className="modal-box w-full max-w-3xl text-black dark:text-gray-300 bg-gray-200 dark:bg-gray-800">
            <h3 className="font-bold text-lg underline my-2">Create new highlight</h3>

            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="flex flex-col md:flex-row gap-3">ADIBABFIAS</div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default MyStoryHighlightsUserProfile;
