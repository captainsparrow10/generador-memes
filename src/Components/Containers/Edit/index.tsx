"use client";
import Carrusel from "@Components/Containers/Edit/Carrusel";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "@Components/Modal";
import { useCanvaContext } from "@Contexts/Canva";
import { getMemeImageById } from "@Services/Meme";
import { useTextContext } from "@Contexts/Text";
import { validate } from "uuid";
import ImageContainer from "@Components/Containers/Edit/Image";
import { redirectTo } from "@Utils/Functions";
import { initialStickerState } from "@Utils/Const";
import Editor from "@Components/Containers/Edit/Editor";
type Props = {
  id: string;
};

export default function EditContainer({ id }: Props) {
  const { imageSelected, setImageSelected, canvasRef } = useCanvaContext();
  const [loading, setLoading] = useState(true);
  const { resetTextState, prevTextRef, setStickerSelected } = useTextContext();

  const handleSelectElement = (target: EventTarget) => {
    if (target === prevTextRef.current) return;
    if (!prevTextRef.current) return;
    prevTextRef.current.style.backgroundColor = "transparent";
    prevTextRef.current.style.padding = "0px";
    prevTextRef.current = null;
    resetTextState();
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

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <Link href="/" className="h-fit w-fit">
        <ArrowLeftIcon className="h-full max-h-8   w-full  max-w-8" />
      </Link>
      <section className="flex justify-center ">
        <div className="flex w-full flex-wrap justify-center gap-6">
          <ImageContainer loading={loading} />
          <div className="flex w-full max-w-[600px] flex-col gap-y-6">
            <Carrusel id={id} />
            <Editor />
          </div>
        </div>
      </section>
      <Modal />
    </main>
  );
}
