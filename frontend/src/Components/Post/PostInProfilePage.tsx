import React, { useEffect, useState } from "react";
import TaggedPostComponent from "./TaggedPostComponent";
import SavedPostComponent from "./SavedPostComponent";
import MyPostComponent from "./MyPostComponent";

const PostInProfilePage = () => {
  const [activeSection, setActiveSection] = useState("MY POSTS");

  const sections = ["MY POSTS", "SAVED POSTS", "TAGGED POSTS"];

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between px-8 py-2 mt-2 rounded-lg shadow-lg gap-4">
        {sections.map(section => (
          <button
            key={section}
            className={`p-3 rounded-lg border-2 font-bold ${
              activeSection === section
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-slate-300 text-black dark:text-white dark:bg-slate-900 border-red-500"
            }`}
            onClick={() => setActiveSection(section)}>
            {section}
          </button>
        ))}
      </div>

      <div className="mt-4 p-2 bg-white text-black dark:text-white dark:bg-slate-900 rounded-lg shadow-lg">
        {activeSection === "MY POSTS" && <MyPostComponent />}

        {activeSection === "SAVED POSTS" && <SavedPostComponent />}

        {activeSection === "TAGGED POSTS" && <TaggedPostComponent />}
      </div>
    </>
  );
};

export default PostInProfilePage;
