import React, { useState } from 'react';
import { useCanvaContext } from '@Contexts/Canva';
import { PhotoIcon } from '@heroicons/react/16/solid';
import useImageHandler from '@Hooks/useImageHandler';

const UploadImage = () => {
  const { fileInputRef } = useCanvaContext();
  const [dragText, setDragText] = useState<string>("Browse or drop image");
  const { loadImage, errorDropImage, setErrorDropImage, loadImageDrop } = useImageHandler()

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setErrorDropImage(false)
    setDragText('Release to upload');
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragText('Browse or drop image');
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    loadImageDrop(e);
    setDragText('Browse or drop image');
  };

  return (
    <div
      className="relative mx-6 my-4 flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 p-12 text-gray-400"
      onClick={() => fileInputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
          type="file"
          accept="image/jpeg, image/png"
          hidden
          ref={fileInputRef}
          onChange={loadImage}
        />
      <div className="absolute inset-0"></div>
      <PhotoIcon width={40} className="mb-2" />
      <p>{dragText}</p>
      <p className={` text-red-500 ${errorDropImage ? 'flex' : 'hidden'}`}>File type not valid</p>
    </div>
  );
};

export default UploadImage;
