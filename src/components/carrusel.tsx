"use client";
import { memeImageType } from "@/types";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { v4 } from "uuid";

type Props = {
  images: memeImageType[];
  changeImage: Dispatch<SetStateAction<memeImageType>>;
};

export default function Carrusel({ images, changeImage }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const meme: memeImageType = {
      id: v4(),
      name: file.name,
      url: URL.createObjectURL(file),
    };
    changeImage(meme);
  };

  return (
    <div className="h-16 w-full overflow-hidden overflow-x-scroll">
      <div className="flex  h-full w-fit overflow-hidden rounded border border-black">
        <div
          className="flex h-full w-16 shrink-0 items-center justify-center"
          onClick={() => fileInputRef.current?.click()}
        >
          <PhotoIcon className="h-6 w-6" />
          <input
            type="file"
            accept="image/jpeg, image/png"
            hidden
            ref={fileInputRef}
            onChange={loadImage}
          />
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
