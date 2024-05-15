import React from "react";
import { FaGoogle } from "react-icons/fa";

function Google() {
  return (
    <button
      type="button"
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-green-600 hover:bg-green-800 focus:outline-none"  >
      <div className="flex items-center">
        <FaGoogle className="mr-2" />
        <span>Continue with Google</span>
      </div>
    </button>
  );
}

export default Google;
