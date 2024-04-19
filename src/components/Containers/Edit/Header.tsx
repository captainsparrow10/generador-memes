import React from "react";
import { useCanvaContext } from "@Contexts/Canva";
import { Stickers } from "@Services/Meme";
import { StickerType, MemeImageType } from "@Types";
import { hexToRgba } from "@Utils/Functions";
import AddStickerIcon from "@Public/Icons/Sticker";
import RandomIcon from "@Public/Icons/Random";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTextContext } from "@Contexts/Text";
import { v4 } from "uuid";

type Props = {
  id: string;
  memes: MemeImageType[];
};

export default function Header({ id, memes }: Props) {
  const {
    imageRef,
    filterImage,
    updateFilterImage,
    setImageSelected,
    boxes,
    setBoxes,
    handleOnMouseDown,
    handleOnTouchStart,
  } = useCanvaContext();
  const { prevTextRef } = useTextContext();
  const [emojiActive, setEmojiActive] = useState(false);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterImage("opacity", Number(e.target.value));
    const opacityValue = parseFloat(e.target.value) / 100;
    const img = imageRef.current;
    if (!img) return;
    img.style.opacity = opacityValue.toString();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterImage("color", e.target.value);
    const hexValue = filterImage.color.substring(1);
    const color = hexToRgba(hexValue, 1);
    const img = imageRef.current;
    if (!img) return;
    img.style.backgroundColor = color;
  };
  const emojiContainerRef = useRef<HTMLDivElement>(null);

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
      setImageSelected(meme);
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

  const addSticker = (sticker: StickerType) => {
    const newText = (
      <img
        id={v4()}
        key={boxes.length}
        className={`absolute z-50 cursor-move`}
        src={sticker.image.src}
        width={sticker.size}
        height={sticker.size}
        onMouseDown={handleOnMouseDown}
        onTouchStart={handleOnTouchStart}
        data-tag="sticker"
      />
    );
    setBoxes((prevText) => [...prevText, newText]);
  };

  console.log(memes.length);

  return (
    <div className="flex h-8 w-full gap-6">
      <div className="flex flex-1 gap-3">
        <input
          type="range"
          value={filterImage.opacity}
          className="flex-1 bg-transparent"
          onChange={handleRangeChange}
        />
        <input
          type="color"
          value={filterImage.color}
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
  );
}
