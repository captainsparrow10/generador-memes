"use client";
import { memeImageType } from "@/types";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type Props = {
  images: memeImageType[];
  changeImage: Dispatch<SetStateAction<memeImageType>>;
};

export default function Carrusel({ images, changeImage }: Props) {
  return (
    <div className="h-16 w-full overflow-hidden overflow-x-scroll">
      <div className="flex  h-full w-fit overflow-hidden rounded border border-black">
        <div className="flex h-full w-16 shrink-0 items-center justify-center">
          <PhotoIcon className="h-6 w-6" />
        </div>
        {images.map((img) => (
          <div
            className="relative h-full w-16 shrink-0"
            key={img.id}
            onClick={() => changeImage(img)}
          >
            <Image src={img.url} alt={img.name} fill />
          </div>
        ))}
      </div>
    </div>
  );
}
