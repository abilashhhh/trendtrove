// import React, { useCallback, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { UserInfo } from "../../Types/userProfile";
// import { Post } from "../../Types/Post";
// import {
//   FaTextHeight,
//   FaUpload,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaPlus,
//   FaTrash,
// } from "react-icons/fa";
// import upload from "../../utils/cloudinary";
// import { Oval } from "react-loader-spinner";
// import { uploadPost } from "../../API/Post/post";
// import { useNavigate } from "react-router-dom";
// import debounce from "../../utils/debouncer";
// import { usernameAvailability } from "../../API/Auth/auth";

// interface AddPostProps {
//   userDetails: UserInfo;
// }

// const formatDate = (date: string | undefined) => {
//   if (!date) return "N/A";
//   const options: Intl.DateTimeFormatOptions = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   return new Date(date).toLocaleDateString(undefined, options);
// };

// const AddPostMiddlePage: React.FC<AddPostProps> = ({ userDetails }) => {
//   const [postData, setPostData] = useState<Partial<Post>>({
//     userId: userDetails._id,
//     isArchived: false,
//     captions: "",
//     images: [],
//     videos: [],
//     hashtags: [],
//     mentions: [],
//   });

//   const [mentionStatuses, setMentionStatuses] = useState<
//     { username: string; available: boolean | null }[]
//   >([]);

//   const [hashtags, setHashtags] = useState<string[]>([]);
//   const navigate = useNavigate();
//   const [isUploading, setIsUploading] = useState<boolean>(false);

//   const debouncedCheckUsernameAvailability = useCallback(
//     debounce(async (index: number, username: string) => {
//       if (!username) {
//         setMentionStatuses(prevState =>
//           prevState.map((mention, idx) =>
//             idx === index ? { ...mention, available: null } : mention
//           )
//         );
//         return;
//       }
//       try {
//         const response = await usernameAvailability(username);
//         setMentionStatuses(prevState =>
//           prevState.map((mention, idx) =>
//             idx === index
//               ? { ...mention, available: response.available }
//               : mention
//           )
//         );
//       } catch (error) {
//         console.error("Error checking username availability:", error);
//       }
//     }, 500),
//     []
//   );

//   const handleMentionChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const { value } = e.target;
//     setMentionStatuses(prevState =>
//       prevState.map((mention, idx) =>
//         idx === index ? { ...mention, username: value } : mention
//       )
//     );
//     debouncedCheckUsernameAvailability(index, value);
//   };

//   const handleAddHashtag = () => {
//     setHashtags([...hashtags, ""]);
//   };

//   const handleRemoveHashtag = (index: number) => {
//     const updatedHashtags = [...hashtags];
//     updatedHashtags.splice(index, 1);
//     setHashtags(updatedHashtags);
//     setPostData(prevState => ({
//       ...prevState,
//       hashtags: updatedHashtags,
//     }));
//   };

//   const handleHashtagChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const { value } = e.target;
//     const updatedHashtags = [...hashtags];
//     updatedHashtags[index] = value;
//     setHashtags(updatedHashtags);
//     setPostData(prevState => ({
//       ...prevState,
//       hashtags: updatedHashtags,
//     }));
//   };

//   const handleAddMention = () => {
//     setMentionStatuses([...mentionStatuses, { username: "", available: null }]);
//   };

//   const handleRemoveMention = (index: number) => {
//     const updatedMentions = [...mentionStatuses];
//     updatedMentions.splice(index, 1);
//     setMentionStatuses(updatedMentions);
//     setPostData(prevState => ({
//       ...prevState,
//       mentions: updatedMentions.map(mention => mention.username),
//     }));
//   };

//   const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length > 0) {
//       if (
//         postData.images!.length + postData.videos!.length + files.length >
//         5
//       ) {
//         toast.error(
//           "You can only upload up to a total of 5 images and videos."
//         );
//         return;
//       }
//       setIsUploading(true);
//       try {
//         const urls = await Promise.all(
//           files.map(async file => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             return new Promise<string>((resolve, reject) => {
//               reader.onloadend = async () => {
//                 try {
//                   const imgData = reader.result as string;
//                   const response = await upload(
//                     imgData,
//                     err => toast.error(err),
//                     "postimage",
//                     "image"
//                   );
//                   if (response?.url) {
//                     resolve(response.url);
//                   } else {
//                     reject("Failed to upload image");
//                   }
//                 } catch (error) {
//                   reject(error);
//                 }
//               };
//             });
//           })
//         );
//         setPostData(prevState => ({
//           ...prevState,
//           images: [...(prevState.images || []), ...urls],
//         }));
//         toast.success("Images uploaded successfully");
//       } catch (error) {
//         toast.error("Failed to upload images");
//         console.log("Error uploading images: ", error);
//       } finally {
//         setIsUploading(false);
//       }
//     }
//   };

//   const handleAddVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length > 0) {
//       if (
//         postData.images!.length + postData.videos!.length + files.length >
//         5
//       ) {
//         toast.error(
//           "You can only upload up to a total of 5 images and videos."
//         );
//         return;
//       }
//       setIsUploading(true);
//       try {
//         const urls = await Promise.all(
//           files.map(async file => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             return new Promise<string>((resolve, reject) => {
//               reader.onloadend = async () => {
//                 try {
//                   const videoData = reader.result as string;
//                   const response = await upload(
//                     videoData,
//                     err => toast.error(err),
//                     "postVideo",
//                     "video"
//                   );
//                   if (response?.url) {
//                     resolve(response.url);
//                   } else {
//                     reject("Failed to upload video");
//                   }
//                 } catch (error) {
//                   reject(error);
//                 }
//               };
//             });
//           })
//         );
//         setPostData(prevState => ({
//           ...prevState,
//           videos: [...(prevState.videos || []), ...urls],
//         }));
//         toast.success("Videos uploaded successfully");
//       } catch (error) {
//         toast.error("Failed to upload videos");
//         console.log("Error uploading videos: ", error);
//       } finally {
//         setIsUploading(false);
//       }
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setPostData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const validMentions = mentionStatuses
//       .filter(mention => mention.available === false)
//       .map(mention => mention.username);

//     const dataToSubmit = {
//       ...postData,
//       mentions: validMentions,
//     };

//     if (
//       postData.images.length > 0 ||
//       postData.videos.length > 0 ||
//       postData.captions.trim() !== ""
//     ) {
//       try {
//         const response = await uploadPost(dataToSubmit);
//         if (response.status === "success") {
//           toast.success("Post created successfully");
//           setTimeout(() => {
//             navigate("/home");
//           }, 1500);
//         } else {
//           toast.error("Failed to create post");
//         }
//       } catch (error) {
//         toast.error("Failed to create post");
//         console.log("Error creating post: ", error);
//       }
//     } else {
//       toast.error("Please add at least one image, video, or caption.");
//     }
//   };

//   return (
//     <main className="flex-1 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
//       <ToastContainer />
//       <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
//         <div className="flex flex-row md:flex-row items-center md:items-start bg-slate-200 dark:bg-gray-800 rounded-lg p-2">
//           <div className="flex-shrink-0">
//             <img
//               src={userDetails.dp}
//               alt={`${userDetails.username}'s profile`}
//               className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-800 mb-4 md:mb-0"
//             />
//           </div>
//           <div className="text-center ml-2 md:text-left md:ml-6">
//             <h1 className="text-l text-gray-400 font-bold mb-1">Posting as</h1>
//             <h1 className="text-2xl font-bold mb-1">{userDetails.username}</h1>
//             <h1 className="text-l text-gray-400 font-bold">
//               {formatDate(new Date().toISOString())}
//             </h1>
//           </div>
//         </div>

//         <div className="flex mt-2 gap-2 rounded-lg">
//           <div className="flex-1 flex flex-row items-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
//             <div>
//               <label
//                 htmlFor="addText"
//                 className="flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-900 text-gray-600 mr-5 dark:text-gray-300 p-6 rounded-lg cursor-pointer">
//                 <FaTextHeight className="text-4xl" />
//                 <span className="font-extrabold mt-2">Add</span>
//                 <span className="font-extrabold">text</span>
//               </label>
//             </div>
//             <div className="flex-1">
//               <textarea
//                 name="captions"
//                 id="captions"
//                 placeholder="Add texts here..."
//                 className="bg-slate-300 dark:bg-gray-700 text-black dark:text-white w-full h-40 p-3 no-scrollbar rounded-lg"
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex mt-2 gap-2 rounded-lg">
//           <div className="flex-1 flex flex-row items-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
//             <div>
//               <label
//                 htmlFor="addImage"
//                 className="flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-900 mr-5 text-gray-600 dark:text-gray-300 p-4 rounded-lg cursor-pointer">
//                 <FaUpload className="text-4xl" />
//                 <span className="font-extrabold mt-2">Upload</span>
//                 <span className="font-extrabold">Image</span>
//               </label>
//               <input
//                 type="file"
//                 name="addImage"
//                 onChange={handleAddImage}
//                 id="addImage"
//                 className="hidden"
//                 accept="image/*"
//                 multiple
//               />
//             </div>
//             <div className="flex-1">
//               {postData.images && postData.images.length > 0 && (
//                 <div className="flex flex-wrap mt-2 gap-2">
//                   {postData.images.map((url, index) => (
//                     <img
//                       key={index}
//                       src={url}
//                       alt={`Uploaded ${index + 1}`}
//                       className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
//                     />
//                   ))}
//                 </div>
//               )}
//               {isUploading && (
//                 <div className="flex justify-center mt-2">
//                   <Oval color="#00BFFF" height={40} width={40} />
//                   <span className="ml-2">Uploading...</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex mt-2 gap-2 rounded-lg">
//           <div className="flex-1 flex flex-row items-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
//             <div>
//               <label
//                 htmlFor="addVideo"
//                 className="flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-900 mr-5 text-gray-600 dark:text-gray-300 p-4 rounded-lg cursor-pointer">
//                 <FaUpload className="text-4xl" />
//                 <span className="font-extrabold mt-2">Upload</span>
//                 <span className="font-extrabold">Video</span>
//               </label>
//               <input
//                 type="file"
//                 name="addVideo"
//                 id="addVideo"
//                 className="hidden"
//                 accept="video/*"
//                 onChange={handleAddVideo}
//                 multiple
//               />
//             </div>
//             <div className="flex-1">
//               {postData.videos && postData.videos.length > 0 && (
//                 <div className="flex flex-wrap mt-2 gap-2">
//                   {postData.videos.map((url, index) => (
//                     <video
//                       key={index}
//                       src={url}
//                       controls
//                       className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
//                     />
//                   ))}
//                 </div>
//               )}
//               {isUploading && (
//                 <div className="flex justify-center mt-2">
//                   <Oval color="#00BFFF" height={40} width={40} />
//                   <span className="ml-2">Uploading...</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="lg:flex mt-2 justify-evenly items-center gap-2 rounded-lg">
//           <div className="flex-1 flex flex-col items-center justify-center gap-2 font-extrabold p-2 rounded-lg text-center cursor-pointer bg-slate-200 dark:bg-slate-800 min-h-full">
//             <h3 className="underline">Hashtags</h3>
//             {hashtags.map((hashtag, index) => (
//               <div key={index} className="flex gap-2">
//                 <input
//                   type="text"
//                   value={hashtag}
//                   onChange={e => handleHashtagChange(e, index)}
//                   placeholder="Add a hashtag"
//                   className="bg-slate-300 p-2 rounded-lg dark:bg-slate-700"
//                 />
//                 <button onClick={() => handleRemoveHashtag(index)}>
//                   <FaTrash />
//                 </button>
//               </div>
//             ))}
//             <button onClick={handleAddHashtag}>
//               <div className="flex items-center gap-2 ">
//                 {" "}
//                 <FaPlus /> Add Hashtag
//               </div>
//             </button>
//           </div>
//           <div className="flex-1 flex flex-col items-center justify-center gap-2 font-extrabold p-2 rounded-lg text-center cursor-pointer bg-slate-200 dark:bg-slate-800 h-full">
//             <h3 className="underline">Mentions</h3>
//             {mentionStatuses.map((mention, index) => (
//               <div key={index} className="flex gap-2 items-center ">
//                 <input
//                   type="text"
//                   value={mention.username}
//                   onChange={e => handleMentionChange(e, index)}
//                   placeholder="Add a mention"
//                   className="bg-slate-300 p-2 rounded-lg dark:bg-slate-700"
//                 />
//                 {mention.available !== null &&
//                   (mention.available ? (
//                     <FaCheckCircle className="text-green-500" />
//                   ) : (
//                     <FaTimesCircle className="text-red-500" />
//                   ))}
//                 <button onClick={() => handleRemoveMention(index)}>
//                   <FaTrash />
//                 </button>
//               </div>
//             ))}
//             <button onClick={handleAddMention}>
//               <div className="flex items-center gap-2 ">
//                 {" "}
//                 <FaPlus /> Add Mention
//               </div>
//             </button>
//           </div>
//         </div>
//         <div className="flex-1 flex flex-col items-center justify-center gap-2 font-extrabold p-2 mt-2 rounded-lg text-center cursor-pointer bg-slate-200 dark:bg-slate-800">
//           <span>Add location:</span>
//           <textarea
//             name="location"
//             placeholder="Add your location here.."
//             className="bg-slate-200 dark:bg-slate-800 text-black dark:text-white w-full h-20 p-3 no-scrollbar rounded-lg"
//             onChange={handleInputChange}
//           />
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="bg-red-600 font-extrabold rounded-lg mt-2 p-4 w-1/5">
//           POST
//         </button>
//       </div>
//     </main>
//   );
// };

// export default AddPostMiddlePage;


import React, { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UserInfo } from "../../Types/userProfile";
import { Post } from "../../Types/Post";
import {
  FaTextHeight,
  FaUpload,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaTrash,
  FaHashtag,
} from "react-icons/fa";
import upload from "../../utils/cloudinary";
import { Oval } from "react-loader-spinner";
import { uploadPost } from "../../API/Post/post";
import { useNavigate } from "react-router-dom";
import debounce from "../../utils/debouncer";
import { usernameAvailability } from "../../API/Auth/auth";
import "react-toastify/dist/ReactToastify.css";

interface AddPostProps {
  userDetails: UserInfo;
}

const formatDate = (date: string | undefined) => {
  if (!date) return "N/A";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

const AddPostMiddlePage: React.FC<AddPostProps> = ({ userDetails }) => {
  const [postData, setPostData] = useState<Partial<Post>>({
    userId: userDetails._id,
    isArchived: false,
    captions: "",
    location: "",
    images: [],
    videos: [],
    hashtags: [],
    mentions: [],
  });

  const [mentionStatuses, setMentionStatuses] = useState<
    { username: string; available: boolean | null }[]
  >([]);

  const [hashtags, setHashtags] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const debouncedCheckUsernameAvailability = useCallback(
    debounce(async (index: number, username: string) => {
      if (!username) {
        setMentionStatuses(prevState =>
          prevState.map((mention, idx) =>
            idx === index ? { ...mention, available: null } : mention
          )
        );
        return;
      }
      try {
        const response = await usernameAvailability(username);
        setMentionStatuses(prevState =>
          prevState.map((mention, idx) =>
            idx === index
              ? { ...mention, available: response.available }
              : mention
          )
        );
      } catch (error) {
        console.error("Error checking username availability:", error);
      }
    }, 500),
    []
  );

  const handleMentionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setMentionStatuses(prevState =>
      prevState.map((mention, idx) =>
        idx === index ? { ...mention, username: value } : mention
      )
    );
    debouncedCheckUsernameAvailability(index, value);
  };

  const handleAddHashtag = () => {
    setHashtags([...hashtags, ""]);
  };

  const handleRemoveHashtag = (index: number) => {
    const updatedHashtags = [...hashtags];
    updatedHashtags.splice(index, 1);
    setHashtags(updatedHashtags);
    setPostData(prevState => ({
      ...prevState,
      hashtags: updatedHashtags,
    }));
  };

  const handleHashtagChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const updatedHashtags = [...hashtags];
    updatedHashtags[index] = value;
    setHashtags(updatedHashtags);
    setPostData(prevState => ({
      ...prevState,
      hashtags: updatedHashtags,
    }));
  };

  const handleAddMention = () => {
    setMentionStatuses([...mentionStatuses, { username: "", available: null }]);
  };

  const handleRemoveMention = (index: number) => {
    const updatedMentions = [...mentionStatuses];
    updatedMentions.splice(index, 1);
    setMentionStatuses(updatedMentions);
    setPostData(prevState => ({
      ...prevState,
      mentions: updatedMentions.map(mention => mention.username),
    }));
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (
        postData.images!.length + postData.videos!.length + files.length >
        5
      ) {
        toast.error(
          "You can only upload up to a total of 5 images and videos."
        );
        return;
      }
      setIsUploading(true);
      try {
        const urls = await Promise.all(
          files.map(async file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise<string>((resolve, reject) => {
              reader.onloadend = async () => {
                try {
                  const imgData = reader.result as string;
                  const response = await upload(
                    imgData,
                    err => toast.error(err),
                    "postimage",
                    "image"
                  );
                  if (response?.url) {
                    resolve(response.url);
                  } else {
                    reject("Failed to upload image");
                  }
                } catch (error) {
                  reject(error);
                }
              };
            });
          })
        );
        setPostData(prevState => ({
          ...prevState,
          images: [...(prevState.images || []), ...urls],
        }));
        toast.success("Images uploaded successfully");
      } catch (error) {
        toast.error("Failed to upload images");
        console.log("Error uploading images: ", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = postData.images!.filter((_, i) => i !== index);
    setPostData(prevState => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleAddVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (
        postData.images!.length + postData.videos!.length + files.length >
        5
      ) {
        toast.error(
          "You can only upload up to a total of 5 images and videos."
        );
        return;
      }
      setIsUploading(true);
      try {
        const urls = await Promise.all(
          files.map(async file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise<string>((resolve, reject) => {
              reader.onloadend = async () => {
                try {
                  const videoData = reader.result as string;
                  const response = await upload(
                    videoData,
                    err => toast.error(err),
                    "postVideo",
                    "video"
                  );
                  if (response?.url) {
                    resolve(response.url);
                  } else {
                    reject("Failed to upload video");
                  }
                } catch (error) {
                  reject(error);
                }
              };
            });
          })
        );
        setPostData(prevState => ({
          ...prevState,
          videos: [...(prevState.videos || []), ...urls],
        }));
        toast.success("Videos uploaded successfully");
      } catch (error) {
        toast.error("Failed to upload videos");
        console.log("Error uploading videos: ", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveVideo = (index: number) => {
    const updatedVideos = postData.videos!.filter((_, i) => i !== index);
    setPostData(prevState => ({
      ...prevState,
      videos: updatedVideos,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const validMentions = mentionStatuses
      .filter(mention => mention.available === false)
      .map(mention => mention.username);

    const dataToSubmit = {
      ...postData,
      mentions: validMentions,
    };

    if (
      postData.images.length > 0 ||
      postData.videos.length > 0 ||
      postData.captions.trim() !== ""
    ) {
      try {
        const response = await uploadPost(dataToSubmit);
        if (response.status === "success") {
          toast.success("Post created successfully");
          setTimeout(() => {
            navigate("/home");
          }, 1500);
        } else {
          toast.error("Failed to create post");
        }
      } catch (error) {
        toast.error("Failed to create post");
        console.log("Error creating post: ", error);
      }
    } else {
      toast.error("Please add at least one image, video, or caption.");
    }
  };

  return (
    <main className="flex-1 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white ">
      <ToastContainer />
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 h-full">
        <div className="flex flex-row md:flex-row items-center md:items-start bg-slate-200 dark:bg-gray-800 rounded-lg p-2">
          <div className="flex-shrink-0">
            <img
              src={userDetails.dp}
              alt={`${userDetails.username}'s profile`}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-800 mb-4 md:mb-0"
            />
          </div>
          <div className="text-center ml-2 md:text-left md:ml-6">
            <h1 className="text-l text-gray-400 font-bold mb-1">Posting as</h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              {userDetails.username}
            </h2>
            <p className="text-sm md:text-base text-gray-500">
              {userDetails.email}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2 mt-5  flex items-center">
          <FaTextHeight className="mr-2" />
          Add a Caption
        </h2>
        <textarea
          className="w-full p-2 mb-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white resize-none"
          name="captions"
          rows={4}
          placeholder="Add your caption here..."
          value={postData.captions}
          onChange={handleInputChange}
        />
        <div className="flex items-center justify-start gap-8 mb-4">
          <div
            className="flex items-center 
          ">
            <FaUpload className="mr-2 text-blue-500" />
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleAddImage}
              />
              <span className="text-blue-500">Upload Images</span>
            </label>
          </div>
          <div className="flex items-center">
            <FaUpload className="mr-2 text-blue-500" />
            <label className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                multiple
                onChange={handleAddVideo}
              />
              <span className="text-blue-500">Upload Videos</span>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap">
          {postData.images!.map((url, index) => (
            <div key={index} className="relative m-2">
              <img
                src={url}
                alt={`uploaded-${index}`}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <button
                className="absolute top-0 right-0 m-1 text-white bg-red-500 rounded-full p-1"
                onClick={() => handleRemoveImage(index)}>
                <FaTrash />
              </button>
            </div>
          ))}
          {postData.videos!.map((url, index) => (
            <div key={index} className="relative m-2">
              <video
                src={url}
                className="w-32 h-32 object-cover rounded-lg"
                controls
              />
              <button
                className="absolute top-0 right-0 m-1 text-white bg-red-500 rounded-full p-1"
                onClick={() => handleRemoveVideo(index)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-start gap-3 mb-4 mt-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            <FaHashtag className="mr-2" />
            Hashtags
          </h2>
          <button
            className="flex items-center justify-center bg-blue-500 text-white px-2 py-1 rounded-lg"
            onClick={handleAddHashtag}>
            <FaPlus className="mr-1" /> Add Hashtag
          </button>
        </div>
        {hashtags.map((hashtag, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={hashtag}
              onChange={e => handleHashtagChange(e, index)}
              className="flex-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
              placeholder="#Hashtag"
            />
            <button
              className="ml-2 text-white bg-red-500 rounded-full p-1"
              onClick={() => handleRemoveHashtag(index)}>
              <FaTrash />
            </button>
          </div>
        ))}
        <div className="flex items-center justify-start gap-3  mb-4 mt-4">
          <h2 className="text-xl font-semibold mb-2 flex items-center">
            @ Mention Users
          </h2>
          <button
            className="flex items-center justify-center bg-blue-500 text-white px-2 py-1 rounded-lg"
            onClick={handleAddMention}>
            <FaPlus className="mr-1" /> Add Mention
          </button>
        </div>
        {mentionStatuses.map((mention, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={mention.username}
              onChange={e => handleMentionChange(e, index)}
              className="flex-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
              placeholder="@username"
            />
            {mention.available !== null && (
              <span className="ml-2">
                {mention.available ? (
                  <FaTimesCircle className="text-red-500" />
                ) : (
                  <FaCheckCircle className="text-green-500" />
                )}
              </span>
            )}
            <button
              className="ml-2 text-white bg-red-500 rounded-full p-1"
              onClick={() => handleRemoveMention(index)}>
              <FaTrash />
            </button>
          </div>
        ))}
        <div className="flex-1 flex flex-col gap-2 font-extrabold p-2 mt-2 rounded-lg  cursor-pointer  ">
          <span>Add location:</span>
          <input
            name="location"
            placeholder="Add your location here.."
            className="bg-slate-200 dark:bg-gray-800 text-black dark:text-white w-full h-20 p-3 no-scrollbar rounded-lg"
            onChange={handleInputChange}
          />
        </div>
        <button
          className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg  mt-4"
          onClick={handleSubmit}>
          {isUploading ? (
            <Oval height={24} width={24} color="white" secondaryColor="white" />
          ) : (
            "Submit Post"
          )}
        </button>
      </div>
    </main>
  );
};

export default AddPostMiddlePage;
