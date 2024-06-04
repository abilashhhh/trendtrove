// import React, { useCallback, useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import { UserInfo } from "../../Types/userProfile";
// import { Post } from "../../Types/Post";
// import {
//   FaTextHeight,
//   FaUpload,
//   FaCheckCircle,
//   FaTimesCircle,
// } from "react-icons/fa";
// import upload from "../../utils/cloudinary";
// import { Oval } from "react-loader-spinner";
// import { getPostUsingPostId, updatePost } from "../../API/Post/post";
// import { useNavigate, useParams } from "react-router-dom";
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

// const EditPostMiddlePage: React.FC<AddPostProps> = ({ userDetails }) => {
//   const { postId } = useParams<{ postId: string }>();
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

//   useEffect(() => {
//     const handleGetPost = async () => {
//       const postDetails = await getPostUsingPostId(postId);
//       setPostData(postDetails.postData);
//       setMentionStatuses(
//         postDetails.postData.mentions.map((mention: string) => ({
//           username: mention,
//           available: null,
//         }))
//       );
//       setHashtags(postDetails.postData.hashtags);
//     };
//     handleGetPost();
//   }, []);

//   console.log("Post postId ", postId);
//   console.log("userDetails ", userDetails);
//   console.log("Post details ", postData);

//   const navigate = useNavigate();
//   const [isUploading, setIsUploading] = useState<boolean>(false);

//   const debouncedCheckUsernameAvailability = useCallback(
//     debounce(async (index: number, username: string) => {
//       if (!username) {
//         setMentionStatuses((prevState) =>
//           prevState.map((mention, idx) =>
//             idx === index ? { ...mention, available: null } : mention
//           )
//         );
//         return;
//       }
//       try {
//         const response = await usernameAvailability(username);
//         setMentionStatuses((prevState) =>
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
//     setMentionStatuses((prevState) =>
//       prevState.map((mention, idx) =>
//         idx === index ? { ...mention, username: value } : mention
//       )
//     );
//     debouncedCheckUsernameAvailability(index, value);
//   };

//   const handleHashtagChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const newHashtags = [...hashtags];
//     newHashtags[index] = e.target.value;
//     setHashtags(newHashtags);
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
//           files.map(async (file) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             return new Promise<string>((resolve, reject) => {
//               reader.onloadend = async () => {
//                 try {
//                   const imgData = reader.result as string;
//                   const response = await upload(
//                     imgData,
//                     (err) => toast.error(err),
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
//         setPostData((prevState) => ({
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
//           files.map(async (file) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             return new Promise<string>((resolve, reject) => {
//               reader.onloadend = async () => {
//                 try {
//                   const videoData = reader.result as string;
//                   const response = await upload(
//                     videoData,
//                     (err) => toast.error(err),
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
//         setPostData((prevState) => ({
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
//     setPostData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const validMentions = mentionStatuses
//       .filter((mention) => mention.available === false)
//       .map((mention) => mention.username);

//     const dataToSubmit = {
//       ...postData,
//       mentions: validMentions,
//       hashtags: hashtags.filter((hashtag) => hashtag.trim() !== ""),
//       postId: postId,
//     };

//     if (
//       postData.images.length > 0 ||
//       postData.videos.length > 0 ||
//       postData.captions.trim() !== ""
//     ) {
//       try {
//         const response = await updatePost(dataToSubmit);
//         if (response.status === "success") {
//           toast.success("Post updated successfully");
//           setTimeout(() => {
//             navigate("/home");
//           }, 1500);
//         } else {
//           toast.error("Failed to update post");
//         }
//       } catch (error) {
//         toast.error("Failed to update post");
//         console.log("Error updating post: ", error);
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
//             <h2 className="text-2xl md:text-4xl font-bold mb-2">
//               {userDetails.username}
//             </h2>
//             <p className="text-sm md:text-base text-gray-500">
//               {userDetails.email}
//             </p>
            
//           </div>
//         </div>
//         <div className="h-full">
//           <div className="w-full mx-auto mt-5">
//             <h1 className="text-xl text-gray-800 dark:text-gray-200 font-bold mb-4 text-center">
//               Add a Post
//             </h1>
//             <div className="bg-slate-300 dark:bg-gray-800 shadow-md rounded-lg p-6">
//               <textarea
//                 className="w-full h-40 p-2 mb-4 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
//                 placeholder="Write a caption..."
//                 name="captions"
//                 value={postData.captions}
//                 onChange={handleInputChange}
//               ></textarea>
//               <div className="flex items-center justify-center mb-4">
//                 <label className="text-gray-600 dark:text-gray-300 cursor-pointer hover:underline">
//                   <FaUpload className="inline-block mr-2" />
//                   Add Images
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     multiple
//                     onChange={handleAddImage}
//                   />
//                 </label>
//               </div>
//               <div className="flex items-center justify-center mb-4">
//                 <label className="text-gray-600 dark:text-gray-300 cursor-pointer hover:underline">
//                   <FaUpload className="inline-block mr-2" />
//                   Add Videos
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="video/*"
//                     multiple
//                     onChange={handleAddVideo}
//                   />
//                 </label>
//               </div>
//               <div className="flex flex-wrap justify-center items-center">
//                 {isUploading && (
//                   <Oval
//                     height={50}
//                     width={50}
//                     color="#4fa94d"
//                     secondaryColor="#4fa94d"
//                     strokeWidth={2}
//                     strokeWidthSecondary={2}
//                   />
//                 )}
//                 {postData.images.map((image, index) => (
//                   <div key={index} className="relative m-2">
//                     <img
//                       src={image}
//                       alt={`Uploaded ${index}`}
//                       className="w-24 h-24 object-cover rounded-lg"
//                     />
//                   </div>
//                 ))}
//                 {postData.videos.map((video, index) => (
//                   <div key={index} className="relative m-2">
//                     <video
//                       controls
//                       className="w-24 h-24 object-cover rounded-lg"
//                     >
//                       <source src={video} type="video/mp4" />
//                     </video>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4">
//                 <h2 className="text-lg text-gray-800 dark:text-gray-200 font-bold mb-2">
//                   Mentions
//                 </h2>
//                 {mentionStatuses.map((mention, index) => (
//                   <div key={index} className="relative mb-4">
//                     <input
//                       type="text"
//                       value={mention.username}
//                       onChange={(e) => handleMentionChange(e, index)}
//                       className={`w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white border-2 ${
//                         mention.available === false
//                           ? "border-green-500"
//                           : mention.available === true
//                           ? "border-red-500"
//                           : "border-gray-300 dark:border-gray-600"
//                       } focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500`}
//                       placeholder={`Mention ${index + 1}`}
//                     />
//                     {mention.available === false && (
//                       <FaCheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500" />
//                     )}
//                     {mention.available === true && (
//                       <FaTimesCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500" />
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     setMentionStatuses([
//                       ...mentionStatuses,
//                       { username: "", available: null },
//                     ])
//                   }
//                   className="text-blue-500 hover:underline"
//                 >
//                   + Add another mention
//                 </button>
//               </div>
//               <div className="mt-4">
//                 <h2 className="text-lg text-gray-800 dark:text-gray-200 font-bold mb-2">
//                   Hashtags
//                 </h2>
//                 {hashtags.map((hashtag, index) => (
//                   <div key={index} className="relative mb-4">
//                     <input
//                       type="text"
//                       value={hashtag}
//                       onChange={(e) => handleHashtagChange(e, index)}
//                       className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
//                       placeholder={`Hashtag ${index + 1}`}
//                     />
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => setHashtags([...hashtags, ""])}
//                   className="text-blue-500 hover:underline"
//                 >
//                   + Add another hashtag
//                 </button>
//               </div>
//               <div className="flex justify-center mt-6">
//                 <button
//                   onClick={handleSubmit}
//                   className="px-6 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                 >
//                   Update Post
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default EditPostMiddlePage;

import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UserInfo } from "../../Types/userProfile";
import { Post } from "../../Types/Post";
import {
  FaUpload,
  FaCheckCircle,
  FaTimesCircle,
  FaTrash,
  FaTextHeight
} from "react-icons/fa";
import upload from "../../utils/cloudinary";
import { Oval } from "react-loader-spinner";
import { getPostUsingPostId, updatePost } from "../../API/Post/post";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "../../utils/debouncer";
import { usernameAvailability } from "../../API/Auth/auth";
import 'react-toastify/dist/ReactToastify.css';

interface EditPostProps {
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

const EditPostMiddlePage: React.FC<EditPostProps> = ({ userDetails }) => {
  const { postId } = useParams<{ postId: string }>();
  const [postData, setPostData] = useState<Partial<Post>>({
    userId: userDetails._id,
    isArchived: false,
    captions: "",
    images: [],
    videos: [],
    hashtags: [],
    mentions: [],
  });

  const [mentionStatuses, setMentionStatuses] = useState<
    { username: string; available: boolean | null }[]
  >([]);

  const [hashtags, setHashtags] = useState<string[]>([]);

  useEffect(() => {
    const handleGetPost = async () => {
      const postDetails = await getPostUsingPostId(postId);
      setPostData(postDetails.postData);
      setMentionStatuses(
        postDetails.postData.mentions.map((mention: string) => ({
          username: mention,
          available: null,
        }))
      );
      setHashtags(postDetails.postData.hashtags);
    };
    handleGetPost();
  }, []);

  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const debouncedCheckUsernameAvailability = useCallback(
    debounce(async (index: number, username: string) => {
      if (!username) {
        setMentionStatuses((prevState) =>
          prevState.map((mention, idx) =>
            idx === index ? { ...mention, available: null } : mention
          )
        );
        return;
      }
      try {
        const response = await usernameAvailability(username);
        setMentionStatuses((prevState) =>
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
    setMentionStatuses((prevState) =>
      prevState.map((mention, idx) =>
        idx === index ? { ...mention, username: value } : mention
      )
    );
    debouncedCheckUsernameAvailability(index, value);
  };

  const handleHashtagChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newHashtags = [...hashtags];
    newHashtags[index] = e.target.value;
    setHashtags(newHashtags);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = postData.images!.filter((_, i) => i !== index);
    setPostData(prevState => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleRemoveVideo = (index: number) => {
    const updatedVideos = postData.videos!.filter((_, i) => i !== index);
    setPostData(prevState => ({
      ...prevState,
      videos: updatedVideos,
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
          files.map(async (file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise<string>((resolve, reject) => {
              reader.onloadend = async () => {
                try {
                  const imgData = reader.result as string;
                  const response = await upload(
                    imgData,
                    (err) => toast.error(err),
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
        setPostData((prevState) => ({
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
          files.map(async (file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise<string>((resolve, reject) => {
              reader.onloadend = async () => {
                try {
                  const videoData = reader.result as string;
                  const response = await upload(
                    videoData,
                    (err) => toast.error(err),
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
        setPostData((prevState) => ({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const validMentions = mentionStatuses
      .filter((mention) => mention.available === false)
      .map((mention) => mention.username);

    const dataToSubmit = {
      ...postData,
      mentions: validMentions,
      hashtags: hashtags.filter((hashtag) => hashtag.trim() !== ""),
      postId: postId,
    };

    if (
      postData.images.length > 0 ||
      postData.videos.length > 0 ||
      postData.captions.trim() !== ""
    ) {
      try {
        const response = await updatePost(dataToSubmit);
        if (response.status === "success") {
          toast.success("Post updated successfully");
          setTimeout(() => {
            navigate("/home");
          }, 1500);
        } else {
          toast.error("Failed to update post");
        }
      } catch (error) {
        toast.error("Failed to update post");
        console.log("Error updating post: ", error);
      }
    } else {
      toast.error("Please add at least one image, video, or caption.");
    }
  };

  return (
    <main className="flex-1 p-2 overflow-auto bg-gray-800 dark:bg-gray-700 text-black dark:text-white">
      <ToastContainer />
      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white h-full overflow-y-auto no-scrollbar">
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
        <div className="h-full">
          <div className="w-full mx-auto mt-5">
            <h1 className="text-xl text-gray-800 dark:text-gray-200 font-bold mb-4 text-center">
              Edit Post
            </h1>
            <div className="bg-slate-300 dark:bg-gray-800 shadow-md rounded-lg p-6">
              <textarea
                className="w-full h-40 p-2 mb-4 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
                placeholder="Write a caption..."
                name="captions"
                value={postData.captions}
                onChange={handleInputChange}
              ></textarea>
              <div className="flex items-center justify-center mb-4">
                <label className="text-gray-600 dark:text-gray-300 cursor-pointer hover:underline">
                  <FaUpload className="inline-block mr-2" />
                  Add Images
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleAddImage}
                  />
                </label>
              </div>
              <div className="flex items-center justify-center mb-4">
                <label className="text-gray-600 dark:text-gray-300 cursor-pointer hover:underline">
                  <FaUpload className="inline-block mr-2" />
                  Add Videos
                  <input
                    type="file"
                    className="hidden"
                    accept="video/*"
                    multiple
                    onChange={handleAddVideo}
                  />
                </label>
              </div>
              <div className="flex flex-wrap justify-center items-center">
                {isUploading && (
                  <Oval
                    height={50}
                    width={50}
                    color="#4fa94d"
                    secondaryColor="#4fa94d"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                )}
                 {postData.images.map((image, index) => (
            <div key={index} className="relative m-2">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                className="absolute top-0 right-0 m-1 text-white bg-red-500 rounded-full p-1"
                onClick={() => handleRemoveImage(index)} // Call handleRemoveImage function on click
              >
                <FaTrash />
              </button>
            </div>
          ))}
                   {postData.videos.map((video, index) => (
            <div key={index} className="relative m-2">
              <video
                controls
                className="w-24 h-24 object-cover rounded-lg"
              >
                <source src={video} type="video/mp4" />
              </video>
              <button
                className="absolute top-0 right-0 m-1 text-white bg-red-500 rounded-full p-1"
                onClick={() => handleRemoveVideo(index)} // Call handleRemoveVideo function on click
              >
                <FaTrash />
              </button>
            </div>
          ))}
              </div>
              <div className="mt-4">
                <h2 className="text-lg text-gray-800 dark:text-gray-200 font-bold mb-2">
                  Mentions
                </h2>
                {mentionStatuses.map((mention, index) => (
                  <div key={index} className="relative mb-4">
                    <input
                      type="text"
                      value={mention.username}
                      onChange={(e) => handleMentionChange(e, index)}
                      className={`w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white border-2 ${
                        mention.available === false
                          ? "border-green-500"
                          : mention.available === true
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500`}
                      placeholder={`Mention ${index + 1}`}
                    />
                    {mention.available === false && (
                      <FaCheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500" />
                    )}
                    {mention.available === true && (
                      <FaTimesCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500" />
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setMentionStatuses([
                      ...mentionStatuses,
                      { username: "", available: null },
                    ])
                  }
                  className="text-blue-500 hover:underline"
                >
                  + Add another mention
                </button>
              </div>
              <div className="mt-4">
                <h2 className="text-lg text-gray-800 dark:text-gray-200 font-bold mb-2">
                  Hashtags
                </h2>
                {hashtags.map((hashtag, index) => (
                  <div key={index} className="relative mb-4">
                    <input
                      type="text"
                      value={hashtag}
                      onChange={(e) => handleHashtagChange(e, index)}
                      className="w-full p-2 rounded-lg bg-gray-200 dark:bg-gray-900 text-black dark:text-white border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500"
                      placeholder={`Hashtag ${index + 1}`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setHashtags([...hashtags, ""])}
                  className="text-blue-500 hover:underline"
                >
                  + Add another hashtag
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-2 font-extrabold p-2 mt-2 rounded-lg  cursor-pointer  ">
          <span>Add location:</span>
          <input
            name="location"
            value={postData?.location}
            placeholder="Add your location here.."
            className="bg-slate-200 dark:bg-gray-900 text-black dark:text-white w-full h-20 p-3 no-scrollbar rounded-lg"
            onChange={handleInputChange}
          />
        </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Update Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EditPostMiddlePage;
