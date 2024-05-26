import axios from "axios";

const upload = async (imgData: string, setErr: (error: string) => void) => {
  try {
    const image = await fetch(imgData);
    const blob = await image.blob();
    const file = new File([blob], "filename.png", { type: blob.type });
    
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const uploadFolder = import.meta.env.VITE_CLOUDINARY_UPLOAD_FOLDER;

    console.log("Cloud Name:", cloudName);
    console.log("Upload Preset:", uploadPreset);
    console.log("Upload Folder:", uploadFolder);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", uploadFolder);

    console.log("Form Data:", formData);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    if (response) {
      // setErr("upload_success");
      return response.data;
    }
  } catch (error: any) {
    setErr(error?.message || "Unknown error occurred");
    console.log("Error:", error.response?.data || error.message || error);
  }
};

export default upload;
