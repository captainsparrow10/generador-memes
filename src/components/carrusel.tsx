"use client";
import { useEditContext } from "@/context/edit.context";
import { getMemeImages } from "@/services/meme";
import { memeImageType } from "@/types";
import { ForwardIcon, PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Props = {
  changeImage: Dispatch<SetStateAction<memeImageType>>;
  id: string
};

export default function Carrusel({ changeImage, id }: Props) {
  const { setShowModal } = useEditContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [memes, setMemes] = useState<memeImageType[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(25);

  useEffect(() => {
    updateMemesArray();
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current!;
      if (scrollLeft + offsetWidth >= scrollWidth) {
        updateMemesArray();
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [memes]);

  const updateMemesArray = async () => {
    memes.length < 100 && setLoading(true);
    let newMemes = await getMemeImages(start, end);

    if (newMemes !== undefined && memes !== undefined) {
      setMemes([...memes, ...newMemes]);
      setStart(end);
      setEnd(end + 25);
      setLoading(false);
    }
  };
  const handleRandomImage = () => {
    const memesAvailable  = memes.filter((meme) => meme.id !== null && meme.id !== undefined && meme.id !== id);

    if (memesAvailable.length > 0) {
      const randomIndex = Math.floor(Math.random() * memesAvailable.length);
      const meme = memesAvailable[randomIndex];
      changeImage(meme)
    } else {
      console.log("No hay IDs disponibles en el array.");
    }
  };

  return (
    <>
      <div className="flex justify-end" >
        <ForwardIcon className="h-6 w-6 cursor-pointer" onClick={handleRandomImage}/>
      </div>
      <div
        ref={scrollRef}
        className="h-16 w-full overflow-hidden overflow-x-scroll"
      >
        <div className="flex  h-full w-fit overflow-hidden rounded border border-black">
          <div
            className="flex h-full w-16 shrink-0 items-center justify-center"
            onClick={handleClick}
          >
            <PhotoIcon className="h-6 w-6" />
          </div>
          {memes.map((img) => (
            <div
              className="relative h-full w-16 shrink-0"
              key={img.id}
              onClick={() => changeImage(img)}
            >
              <Image src={img.url} alt={img.name} fill />
            </div>
          ))}
          {loading &&
            Array.from(Array(25).keys()).map((i) => (
              <div
                key={i}
                className="relative flex h-full w-16 shrink-0 items-center justify-center bg-gray-100"
              >
                <PhotoIcon className="h-6 w-6 animate-pulse" />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
