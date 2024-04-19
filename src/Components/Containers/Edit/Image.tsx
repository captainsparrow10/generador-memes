'use client'
import { useCanvaContext } from "@Contexts/Canva";
import { PhotoIcon } from "@heroicons/react/16/solid";
interface ImageContainerProps {
  loading: boolean;
}

const ImageContainer = ({ loading }: ImageContainerProps) => {
  const { canvasRef, imageSelected, imageRef, boxes, filterImage } = useCanvaContext();


  return (
    <div className="flex max-h-[600px]  w-full max-w-[600px]  items-center justify-center">
      <div
        className="relative w-fit overflow-hidden border border-black"
        ref={canvasRef}
      >
        {boxes.map((box, index) => (
          <div key={index}>{box}</div>
        ))}
        <div
          className="absolute left-0 top-0 h-full w-full"
          style={{
            "backgroundColor": filterImage.color,
            "opacity": filterImage.opacity
          }}
        >
          
        </div>
        {loading ? (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <PhotoIcon className="h-2/5 w-full animate-pulse" />
          </div>
        ) : (
          <img
            className=" sm:max-h-[500px] sm:max-w-[600px]"
            src={imageSelected.url}
            alt={imageSelected.name}
          />
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
