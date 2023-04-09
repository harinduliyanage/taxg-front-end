import { Box, Typography, Slider } from "@mui/material";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./utils/CropImage";

const CropEasy = (
  { photoURL, cropShape, onCropSuccess, file }: any,
  setOpenCrop: any
) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  let aspectRatio: any;

  if (cropShape === "round") {
    aspectRatio = 1;
  } else {
    aspectRatio = 1920 / 680;
  }

  const zoomPercent = (value: any) => {
    return `${Math.round(value * 100)}%`;
  };

  const onCropComplete = useCallback(
    async (croppedArea: any, croppedAreaPixels: any, file: any) => {
      const newFile: any = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        file
      );
      console.log("cropped", newFile);
      onCropSuccess(newFile);
    },
    [onCropSuccess, photoURL]
  );

  return (
    <div>
      <Cropper
        image={photoURL}
        crop={crop}
        zoom={zoom}
        cropShape={cropShape}
        aspect={aspectRatio}
        onCropChange={setCrop}
        onCropComplete={(croppedArea: any, croppedAreaPixels: any) =>
          onCropComplete(croppedArea, croppedAreaPixels, file)
        }
        onZoomChange={setZoom}
        restrictPosition={false}
      />
      <Box>
        <Typography>Zoom :{zoomPercent(zoom)}</Typography>
        <Slider
          valueLabelDisplay="auto"
          valueLabelFormat={zoomPercent}
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e, zoom: any) => setZoom(zoom)}
        ></Slider>
      </Box>
    </div>
  );
};

export default CropEasy;
