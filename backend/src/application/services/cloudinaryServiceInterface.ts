import { CloudinaryServiceReturn } from "../../frameworks/services/cloudinaryService";

export const cloudinaryServiceInterface = (
  service: CloudinaryServiceReturn
) => {
  const handleUpload = async (filePath: string) => service.handleUpload(filePath);

  return { handleUpload };
};

export type CloudinaryServiceInterface = typeof cloudinaryServiceInterface;
