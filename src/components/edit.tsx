"use client";
import Carrusel from "@/components/carrusel";
import EditText from "@/components/editText";
import { memeImageType } from "@/types";
import {
  ArrowLeftIcon,
  ForwardIcon,
  PhotoIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Modal from "./modal/modal";
import { useEditContext } from "@/context/edit.context";
import { getMemeImageById, getMemeImages } from "@/services/meme";
type Props = {
  id: string;
};

export default function EditComponent({ id }: Props) {
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
    memeImageById(id);
  }, []);

  const [loading, setLoading] = useState(true);

  const memeImageById = async (id: string) => {
    setLoading(true);
    let meme = await getMemeImageById(id);
    if (meme !== undefined) {
      setImageSelected(meme);
      setLoading(false);
    }
  };

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
          className="relative h-[350px] w-full overflow-hidden rounded border border-black"
          ref={canvasRef}
        >
          {boxes.map((box, index) => (
            <div className="p-4" key={index}>
              {box}
            </div>
          ))}
          {loading ? (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <PhotoIcon className="h-2/5 w-full animate-pulse" />
            </div>
          ) : (
            <Image src={imageSelected.url} alt={imageSelected.name} fill />
          )}
        </div>

        <Carrusel changeImage={setImageSelected} id={id} />
        <EditText addText={addText} />
      </section>
      <Modal />
    </main>
  );
}
