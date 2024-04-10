"use client";
import Carrusel from "@/components/carrusel";
import EditText from "@/components/editText";
import { memeImageType } from "@/types";
import { ArrowLeftIcon, ForwardIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Modal from "./modal/modal";
import { useEditContext } from "@/context/edit.context";

type Props = {
  memes: memeImageType[];
  meme: memeImageType;
};

export default function EditComponent({ memes, meme }: Props) {
  const {
    showModal,
    setShowModal,
    setText,
    text,
    prevTextRef,
    imageSelected,
    setImageSelected,
    handleOnMouseDown,
    canvasRef,
    boxes,
    setBoxes,
  } = useEditContext();

  useEffect(() => {
    setImageSelected(meme);
  }, []);

  const addText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (text.trim() === "") return;

    if (prevTextRef.current) {
      prevTextRef.current.textContent = text;
      setText("");
      prevTextRef.current.style.backgroundColor = "transparent";
      prevTextRef.current = null;
      return;
    }
    const newText = (
      <div
        key={boxes.length}
        className="absolute z-50 cursor-pointer text-black"
        onMouseDown={(e) => handleOnMouseDown(e)}
      >
        {text}
      </div>
    );

    setBoxes((prevText) => [...prevText, newText]);
    setText("");
  };

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <Link href="/">
        <ArrowLeftIcon className="h-6 w-6" />
      </Link>
      <section className=" flex flex-col gap-y-6">
        <div
          className="relative h-[350px] w-full border border-black"
          ref={canvasRef}
        >
          {boxes.map((box, index) => (
            <div className="p-4" key={index}>
              {box}
            </div>
          ))}
          <Image src={imageSelected.url} alt={imageSelected.name} fill />
        </div>
        <div className="flex justify-end">
          <ForwardIcon className="h-6 w-6" />
        </div>
        <Carrusel images={memes} changeImage={setImageSelected} />
        <EditText addText={addText} />
      </section>
      <Modal />
    </main>
  );
}
