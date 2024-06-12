 
// import React, { useState, useCallback } from "react";
// import Cropper from "react-easy-crop";
// import { Button, Slider } from "@mui/material";
// import getCroppedImg from "../utils/cropImage";

// interface ImageCropperProps {
//   imageSrc: string;
//   onCropComplete: (croppedImageUrl: string) => void;
//   onClose: () => void;
// }

// const ImageCropper: React.FC<ImageCropperProps> = ({
//   imageSrc,
//   onCropComplete,
//   onClose,
// }) => {
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

//   const onCropCompleteCallback = useCallback((_, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const handleCrop = async () => {
//     try {
//       const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
//       onCropComplete(croppedImageUrl);
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <div className="crop-container w-96 h-96">
//       <Cropper
//         image={imageSrc}
//         crop={crop}
//         zoom={zoom}
//         aspect={4 / 3}
//         onCropChange={setCrop}
//         onZoomChange={setZoom}
//         onCropComplete={onCropCompleteCallback}
//       />
//       <div className="controls">
//         <Slider
//           value={zoom}
//           min={1}
//           max={3}
//           step={0.1}
//           aria-labelledby="Zoom"
//           onChange={(e, zoom) => setZoom(zoom as number)}
//         />
//         <Button onClick={handleCrop}>Crop</Button>
//         <Button onClick={onClose}>Cancel</Button>
//       </div>
//     </div>
//   );
// };

// export default ImageCropper;

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Button, Slider } from "@mui/material";
import getCroppedImg from "../utils/cropImage";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImageUrl: string) => void;
  onClose: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  imageSrc,
  onCropComplete,
  onClose,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteCallback = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImageUrl);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full max-w-4xl max-h-full">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteCallback}
        />
        <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center p-4 bg-black bg-opacity-50">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom as number)}
            className="w-3/4"
          />
          <div className="mt-4 flex justify-center space-x-4">
            <Button onClick={handleCrop} variant="contained" color="primary">
              Crop
            </Button>
    
            <Button onClick={() => {onClose && window.location.reload() } } variant="contained" color="secondary">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
