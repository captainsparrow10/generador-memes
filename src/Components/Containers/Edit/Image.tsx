'use client';
import { useCanvaContext } from "@Contexts/Canva";
import { PhotoIcon } from "@heroicons/react/16/solid";
import React from "react";

interface ImageContainerProps {
  loading: boolean; // Indica si la imagen está cargando o no
}

/**
 * Componente para mostrar la imagen seleccionada en el lienzo de edición.
 * @param {ImageContainerProps} props - Propiedades del componente.
 * @returns {JSX.Element} El componente de contenedor de imagen.
 */
const ImageContainer = ({ loading }: ImageContainerProps): JSX.Element => {
  const { canvasRef, imageSelected, boxes, filterImage } = useCanvaContext();

  return (
    <div className="flex max-h-[600px] w-full max-w-[600px] items-center justify-center">
      <div
        className="relative w-fit overflow-hidden border border-black"
        ref={canvasRef}
      >
        {/* Renderiza los elementos en el canvas */}
        {boxes.map((box, index) => (
          <div key={index}>{box}</div>
        ))}
        {/* Aplica el filtro de color y opacidad */}
        <div
          className="absolute left-0 top-0 h-full w-full"
          style={{
            backgroundColor: filterImage.color,
            opacity: filterImage.opacity,
          }}
        ></div>
        {/* Renderiza la imagen o el icono de carga */}
        {loading ? (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <PhotoIcon className="h-2/5 w-full animate-pulse" />
          </div>
        ) : (
          <img
            className="sm:max-h-[500px] sm:max-w-[600px]"
            src={imageSelected.url}
            alt={imageSelected.name}
          />
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
