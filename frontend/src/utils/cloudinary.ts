// import axios from "axios";

// const upload = async (imgData: string, setErr: (error: string) => void, folder: string) => {
//   try {
//     const image = await fetch(imgData);
//     const blob = await image.blob();
//     const file = new File([blob], "filename.png", { type: blob.type });
    
//     const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
//     const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", uploadPreset);
//     formData.append("folder", folder);

//     const response = await axios.post(
//       `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//       formData
//     );

//     if (response) {
//       return response.data;
//     }
//   } catch (error: any) {
//     setErr(error?.message || "Unknown error occurred");
//     console.log("Error:", error.response?.data || error.message || error);
//   }
// };

// export default upload;

import axios from "axios";

const upload = async (fileData: string, setErr: (error: string) => void, folder: string, type: "image" | "video") => {
  try {
    const file = await fetch(fileData).then(res => res.blob()).then(blob => new File([blob], "filename", { type: blob.type }));

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    const uploadUrl = type === "video" 
      ? `https://api.cloudinary.com/v1_1/${cloudName}/video/upload` 
      : `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await axios.post(uploadUrl, formData);

    if (response) {
      return response.data;
    }
  } catch (error: any) {
    setErr(error?.message || "Unknown error occurred");
    console.log("Error:", error.response?.data || error.message || error);
  }
};

export default upload;
