import React, { useState } from 'react';
import { useCanvaContext } from '@Contexts/Canva';
import { PhotoIcon } from '@heroicons/react/16/solid';
import useImageHandler from '@Hooks/useImageHandler';

const UploadImage = () => {
  const { fileInputRef } = useCanvaContext(); 
  const [dragText, setDragText] = useState<string>("Browse or drop image"); 
  const { loadImage, errorDropImage, setErrorDropImage, loadImageDrop } = useImageHandler(); 

  // Manejar el evento de entrar al área de arrastre
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setErrorDropImage(false); // Limpiar error
    setDragText('Release to upload'); // Cambiar texto durante el arrastre
  };

  // Manejar el evento de salir del área de arrastre
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragText('Browse or drop image'); // Restaurar texto por defecto
  };

  // Manejar el evento de soltar imagen
  const handleDrop = (e: any) => {
    e.preventDefault();
    loadImageDrop(e); // Cargar imagen al soltar
    setDragText('Browse or drop image'); // Restaurar texto por defecto
  };

  return (
    <div
      className="relative mx-6 my-4 flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 p-12 text-gray-400"
      onClick={() => fileInputRef.current?.click()} // Mostrar el input file al hacer clic en la zona de arrastre
      onDragEnter={handleDragEnter} // Manejar el arrastre
      onDragOver={(e) => e.preventDefault()} // Evitar comportamiento por defecto del arrastre
      onDragLeave={handleDragLeave} // Manejar la salida del arrastre
      onDrop={handleDrop} // Manejar el soltar la imagen
    >
      <input
          type="file"
          accept="image/jpeg, image/png"
          hidden
          ref={fileInputRef} 
          onChange={loadImage} 
        />
      <div className="absolute inset-0"></div>
      <PhotoIcon width={40} className="mb-2" /> {/* Icono de carga */}
      <p>{dragText}</p> {/* Texto dinámico durante el arrastre */}
      <p className={`text-red-500 ${errorDropImage ? 'flex' : 'hidden'}`}>File type not valid</p> {/* Mostrar error de tipo de archivo */}
    </div>
  );
};

export default UploadImage;
