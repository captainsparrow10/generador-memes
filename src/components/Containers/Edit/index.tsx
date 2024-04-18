"use client";
import Carrusel from "@Components/Containers/Edit/Carrusel";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "@Components/Modal";
import { initialStickerState, useEditContext } from "@Contexts/Edit";
import { getMemeImageById } from "@Services/Meme";
import { useTextContext } from "@Contexts/Text";
import { v4, validate } from "uuid";
import { StickerType } from "@Types";
import ImageContainer from "@Components/Containers/Edit/Image";
import { redirectTo } from "@Utils";
import Selection from "./Selection";
type Props = {
  id: string;
};

export default function EditContainer({ id }: Props) {
  const {
    setText,
    prevTextRef,
    imageSelected,
    setImageSelected,
    handleOnMouseDown,
    canvasRef,
    boxes,
    setBoxes,
    handleOnTouchStart,
    setStickerSelected,
  } = useEditContext();
  const [loading, setLoading] = useState(true);
  const { resetState } = useTextContext();

  const handleSelectElement = (target: EventTarget) => {
    if (target === prevTextRef.current) return;
    if (!prevTextRef.current) return;

    prevTextRef.current.style.backgroundColor = "transparent";
    prevTextRef.current.style.padding = "0px";
    prevTextRef.current = null;
    setText("");
    resetState();
    setStickerSelected(initialStickerState);
  };

  useEffect(() => {
    memeImageById(id);

    const onMouseDown = (e: MouseEvent) => {
      handleSelectElement(e.target!);
    };

    const handleOnTouchStart = (e: TouchEvent) => {
      handleSelectElement(e.target!);
    };

    canvasRef.current!.addEventListener("touchstart", handleOnTouchStart);
    canvasRef.current!.addEventListener("mousedown", onMouseDown);

    return () => {
      canvasRef.current!.removeEventListener("touchstart", handleOnTouchStart);
      canvasRef.current!.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  const memeImageById = async (id: string) => {
    if (validate(imageSelected.id)) {
      setLoading(false);
      return;
    }

    if (validate(id) && imageSelected.url === "") {
      redirectTo("/");
    }

    setLoading(true);
    let meme = await getMemeImageById(id);
    if (meme !== undefined) {
      setImageSelected(meme);
      setLoading(false);
    }
  };

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

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <Link href="/" className="h-fit w-fit">
        <ArrowLeftIcon className="h-full max-h-8   w-full  max-w-8" />
      </Link>
      <section className="flex justify-center ">
        <div className="flex w-full flex-wrap justify-center gap-6">
          <ImageContainer loading={loading} />
          <div className="flex w-full max-w-[600px] flex-col gap-y-6">
            <Carrusel
              changeImage={setImageSelected}
              id={id}
              addSticker={addSticker}
            />
            <Selection />
          </div>
        </div>
      </section>
      <Modal />
    </main>
  );
}
