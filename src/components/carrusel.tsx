"use client";
import { useEditContext } from "@/context/edit.context";
import { getMemeImages, stickers } from "@/services/meme";
import { memeImageType } from "@/types";
import {
  FaceSmileIcon,
  ForwardIcon,
  PhotoIcon,
} from "@heroicons/react/16/solid";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Props = {
  changeImage: Dispatch<SetStateAction<memeImageType>>;
  id: string;
  addSticker: (sticker: { id: number; image: StaticImageData }) => void;
};

export default function Carrusel({ changeImage, id, addSticker }: Props) {
  const { setShowModal } = useEditContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [memes, setMemes] = useState<memeImageType[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(25);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [colorValue, setColorValue] = useState<string>("#000000");
  const [emojiActive, setEmojiActive] = useState(true);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(Number(e.target.value));
    setRangeValue(Number(e.target.value));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setColorValue(e.target.value);
  };
  const emojiContainerRef = useRef<HTMLDivElement>(null);

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
    const memesAvailable = memes.filter(
      (meme) => meme.id !== null && meme.id !== undefined && meme.id !== id,
    );

    if (memesAvailable.length > 0) {
      const randomIndex = Math.floor(Math.random() * memesAvailable.length);
      const meme = memesAvailable[randomIndex];
      changeImage(meme);
    } else {
      console.log("No hay IDs disponibles en el array.");
    }
  };
  const handleDocumentClick = (e: MouseEvent) => {
    if (emojiContainerRef.current && !emojiContainerRef.current.contains(e.target as Node)) {
      setEmojiActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex w-4/5 gap-x-6">
          <input
            type="range"
            className="w-full appearance-none  bg-transparent"
            value={rangeValue}
            onChange={handleRangeChange}
          />
          <input type="color" value={colorValue} onChange={handleColorChange} />
        </div>
        <div className="flex w-1/5 justify-end gap-6">
          <div className="relative"  ref={emojiContainerRef}>
            <FaceSmileIcon
              className="h-full max-h-8   w-full  max-w-8 cursor-pointer"
              onClick={() => setEmojiActive(!emojiActive)}
            />
            <div
              className={clsx(
                "absolute right-6 z-50 flex w-[200px] flex-wrap justify-evenly gap-6 overflow-hidden  rounded bg-white transition-all",
                emojiActive ? "h-fit border border-gray-300 p-6" : "h-0",
              )}
            >
              {stickers.map((sticker) => (
                <div
                  className="relative h-6 w-6 cursor-pointer"
                  key={sticker.id}
                  onClick={() =>addSticker(sticker)}
                >
                  <Image src={sticker.image} alt="sticker" fill />
                </div>
              ))}
            </div>
          </div>
          <ForwardIcon
            className="h-full max-h-8   w-full  max-w-8 cursor-pointer"
            onClick={handleRandomImage}
          />
        </div>
      </div>
      <div ref={scrollRef} className="h-full w-full overflow-x-scroll">
        <div className="flex h-full max-h-16 w-fit overflow-hidden rounded border border-black">
          <div
            className="flex h-full w-16 shrink-0 items-center justify-center p-2"
            onClick={handleClick}
          >
            <PhotoIcon className="h-full w-full" />
          </div>
          {memes.map((img) => (
            <div
              className={clsx(
                "relative h-full w-16 shrink-0",
                loading ? "hidden" : "block",
              )}
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
                className="relative flex h-full max-h-16 w-16 shrink-0 items-center justify-center bg-gray-100 p-2"
              >
                <PhotoIcon className="h-full w-full animate-pulse" />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
