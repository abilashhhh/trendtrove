import React, { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { UserInfo } from "../../Types/userProfile";
import { Post } from "../../Types/Post";
import { FaTextHeight, FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import upload from "../../utils/cloudinary";
import { Oval } from "react-loader-spinner";
import { updatePost } from "../../API/Post/post";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "../../utils/debouncer";
import { usernameAvailability } from "../../API/Auth/auth";

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

const EditPostMiddlePage: React.FC<AddPostProps> = ({ userDetails }) => {
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
  >(
    Array(5).fill({ username: "", available: null })
  );


  
  const [hashtags, setHashtags] = useState<string[]>(["", "", "", "", ""]);
  const handleHashtagChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newHashtags = [...hashtags];
    newHashtags[index] = e.target.value;
    setHashtags(newHashtags);
  };
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
            idx === index ? { ...mention, available: response.available } : mention
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

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (postData.images!.length + postData.videos!.length + files.length > 5) {
        toast.error("You can only upload up to a total of 5 images and videos.");
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
      if (postData.images!.length + postData.videos!.length + files.length > 5) {
        toast.error("You can only upload up to a total of 5 images and videos.");
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
      postId: postId
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
            <h1 className="text-2xl font-bold mb-1">{userDetails.username}</h1>
            <h1 className="text-l text-gray-400 font-bold">
              {formatDate(new Date().toISOString())}
            </h1>
          </div>
        </div>

        <div className="flex mt-2 gap-2 rounded-lg">
          <div className="flex-1 flex flex-row items-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
            <div>
              <label
                htmlFor="addText"
                className="flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-900 text-gray-600 mr-5 dark:text-gray-300 p-6 rounded-lg cursor-pointer"
              >
                <FaTextHeight className="text-4xl" />
                <span className="font-extrabold mt-2">Add</span>
                <span className="font-extrabold">text</span>
              </label>
            </div>
            <div className="flex-1">
              <textarea
                name="captions"
                id="captions"
                placeholder="Add texts here..."
                className="bg-slate-300 dark:bg-gray-700 text-black dark:text-white w-full h-40 p-3 no-scrollbar rounded-lg"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex mt-2 gap-2 rounded-lg">
          <div className="flex-1 flex flex-row items-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
            <div>
              <label
                htmlFor="addImage"
                className="flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-900 mr-5 text-gray-600 dark:text-gray-300 p-4 rounded-lg cursor-pointer"
              >
                <FaUpload className="text-4xl" />
                <span className="font-extrabold mt-2">Upload</span>
                <span className="font-extrabold">Image</span>
              </label>
              <input
                type="file"
                name="addImage"
                onChange={handleAddImage}
                id="addImage"
                className="hidden"
                accept="image/*"
                multiple
              />
            </div>
            <div className="flex-1">
              {postData.images && postData.images.length > 0 && (
                <div className="flex flex-wrap mt-2 gap-2">
                  {postData.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
              {isUploading && (
                <div className="flex justify-center mt-2">
                  <Oval color="#00BFFF" height={40} width={40} />
                  <span className="ml-2">Uploading...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex mt-2 gap-2 rounded-lg">
          <div className="flex-1 flex flex-row items-center gap-2 bg-slate-200 dark:bg-slate-800 p-6 rounded-lg text-center">
            <div>
              <label
                htmlFor="addVideo"
                className="flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-900 mr-5 text-gray-600 dark:text-gray-300 p-4 rounded-lg cursor-pointer"
              >
                <FaUpload className="text-4xl" />
                <span className="font-extrabold mt-2">Upload</span>
                <span className="font-extrabold">Video</span>
              </label>
              <input
                type="file"
                name="addVideo"
                id="addVideo"
                className="hidden"
                accept="video/*"
                onChange={handleAddVideo}
                multiple
              />
            </div>
            <div className="flex-1">
              {postData.videos && postData.videos.length > 0 && (
                <div className="flex flex-wrap mt-2 gap-2">
                  {postData.videos.map((url, index) => (
                    <video
                      key={index}
                      src={url}
                      controls
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
              {isUploading && (
                <div className="flex justify-center mt-2">
                  <Oval color="#00BFFF" height={40} width={40} />
                  <span className="ml-2">Uploading...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:flex mt-2 justify-evenly items-center gap-2 rounded-lg">
          <div className="flex-1 flex  flex-col  items-center justify-center gap-2 font-extrabold p-2 rounded-lg text-center cursor-pointer bg-slate-200 dark:bg-slate-800">
            <span>Add mentions (Up to 5):</span>

            {mentionStatuses.map((mention, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  name={`mention${index + 1}`}
                  value={mention.username}
                  onChange={(e) => handleMentionChange(e, index)}
                  className="bg-slate-300 p-2 rounded-lg dark:bg-slate-700"
                />
                {mention.available !== null && (
                  <span className="ml-2">
                    {!mention.available ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-2 font-extrabold p-2 rounded-lg text-center cursor-pointer bg-slate-200 dark:bg-slate-800">
            <span>Add hashtags (Up to 5):</span>
            {hashtags.map((hashtag, index) => (
              <div key={index} className="flex gap-2 items-center">
               #   <input
                  type="text"
                  name={`hashtag${index + 1}`}
                  value ={hashtag}
                  onChange={(e) => handleHashtagChange(e, index)}
                  className="bg-slate-300 p-2 rounded-lg dark:bg-slate-700"
                />
              </div>
            ))}
        </div>
        
          
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-2 font-extrabold p-2 mt-2 rounded-lg text-center cursor-pointer bg-slate-200 dark:bg-slate-800">
            <span>Add location:</span>
            <textarea
              name="location"
              placeholder="Add your location here.."
              className="bg-slate-200 dark:bg-slate-800 text-black dark:text-white w-full h-20 p-3 no-scrollbar rounded-lg"
              onChange={handleInputChange}
            />
          </div>
        <button
          onClick={handleSubmit}
          className="bg-red-600 font-extrabold rounded-lg mt-2 p-4 w-1/5"
        >
          UPDATE POST
        </button>
      </div>
    </main>
  );
};

export default EditPostMiddlePage;
