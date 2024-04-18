"use client";
import { useEditContext } from "@Contexts/Edit";
import { getMemeImages, Stickers } from "@Services/Meme";
import { StickerType, memeImageType } from "@Types";
import { hexToRgba } from "@Utils";
import { PhotoIcon } from "@heroicons/react/16/solid";
import AddStickerIcon from "@Public/Icons/Sticker";
import RandomIcon from "@Public/Icons/Random";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type Props = {
  changeImage: Dispatch<SetStateAction<memeImageType>>;
  id: string;
  addSticker: (sticker: StickerType) => void;
};

export default function Carrusel({ changeImage, id, addSticker }: Props) {
  const {
    setShowModal,
    imageRef,
    prevTextRef,
    opacity,
    setOpacity,
    colorValue,
    setColorValue,
  } = useEditContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [memes, setMemes] = useState<memeImageType[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(25);
  const [emojiActive, setEmojiActive] = useState(false);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity(Number(e.target.value));
    const opacityValue = parseFloat(e.target.value) / 100;
    const img = imageRef.current;
    if (!img) return;
    img.style.opacity = opacityValue.toString();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexColor = e.target.value;
    setColorValue(hexColor);
    const hexValue = hexColor.substring(1);
    const color = hexToRgba(hexValue, 1);

    const img = imageRef.current;
    if (!img) return;

    img.style.backgroundColor = color;
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

  const handleStickerState = () => {
    setEmojiActive(!emojiActive);
    if (!prevTextRef.current) return;
    prevTextRef.current.style.backgroundColor = "transparent";
    prevTextRef.current = null;
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
    if (
      emojiContainerRef.current &&
      !emojiContainerRef.current.contains(e.target as Node)
    ) {
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
      <div className="flex h-8 w-full gap-6">
        <div className="flex flex-1 gap-3">
          <input
            type="range"
            value={opacity}
            className="flex-1 bg-transparent"
            onChange={handleRangeChange}
          />
          <input
            type="color"
            value={colorValue}
            onChange={handleColorChange}
            className="h-full w-8  flex-shrink"
          />
        </div>
        <div className="flex w-fit shrink justify-end gap-6">
          <div className="relative" ref={emojiContainerRef}>
            <AddStickerIcon
              active={emojiActive}
              className="h-full max-h-8 w-full max-w-8 cursor-pointer"
              onClick={handleStickerState}
            />

            <div
              className={clsx(
                "absolute right-6 z-50 flex w-[200px] flex-wrap justify-evenly gap-6 overflow-hidden  rounded bg-white transition-all",
                emojiActive ? "h-fit border border-gray-300 p-6" : "h-0",
              )}
            >
              {Stickers.map((sticker) => (
                <div
                  className="relative h-6 w-6  cursor-pointer"
                  key={sticker.id}
                  onClick={() => {
                    addSticker(sticker);
                    setEmojiActive(false);
                  }}
                >
                  <Image src={sticker.image} alt="sticker" fill />
                </div>
              ))}
            </div>
          </div>
          <RandomIcon
            className="h-full max-h-8   w-full  max-w-8 cursor-pointer text-gray-300"
            onClick={handleRandomImage}
          />
        </div>
      </div>
      <div ref={scrollRef} className="h-fit w-full overflow-x-scroll">
        <div className="flex h-full max-h-12 w-fit divide-x divide-black overflow-hidden rounded border border-black">
          <div
            className="flex h-full w-16 shrink-0 items-center justify-center p-2 "
            onClick={handleClick}
          >
            <PhotoIcon className="h-full w-full" />
          </div>
          {memes.map((img) => (
            <div
              className={clsx(
                "relative h-full w-16 shrink-0  cursor-pointer",
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
