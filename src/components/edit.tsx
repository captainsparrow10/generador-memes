"use client";
import Carrusel from "@/components/carrusel";
import EditText from "@/components/editText";
import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "./modal/modal";
import { useEditContext } from "@/context/edit.context";
import { getMemeImageById } from "@/services/meme";
import { useTextContext } from "@/context/text.context";
type Props = {
  id: string;
};

export default function EditComponent({ id }: Props) {
  const {
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

  const {
    styleText: {
      textStyle: { transform, style, weight },
      fontFamily,
      fontSize,
      color,
    },
    setStyleText,
    resetState,
  } = useTextContext();

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

  const editText = () => {
    if (prevTextRef.current) {
      setStyleText({
        textStyle: {
          transform:
            prevTextRef.current.style.textTransform === "none"
              ? "normal-case"
              : "uppercase",
          weight:
            prevTextRef.current.style.fontWeight === "400" ? "normal" : "bold",
          style:
            prevTextRef.current.style.fontStyle === "normal"
              ? "not-italic"
              : "italic",
        },
        color: prevTextRef.current.style.color,
        fontSize: parseInt(prevTextRef.current.style.fontSize.split("px")[0]),
        fontFamily: prevTextRef.current.style.fontFamily,
      });
      prevTextRef.current.textContent = text;
      prevTextRef.current.style.backgroundColor = "transparent";
      prevTextRef.current.style.textTransform =
        transform === "normal-case" ? "none" : "uppercase";
      prevTextRef.current.style.fontWeight =
        weight === "normal" ? "400" : "700";
      prevTextRef.current.style.fontSize = `${fontSize}px`;
      prevTextRef.current.style.fontStyle =
        style === "not-italic" ? "normal" : "italic";
      prevTextRef.current.style.fontFamily = fontFamily;
      prevTextRef.current.style.color = color;
      prevTextRef.current = null;
      setText("");
      return;
    }
  };

  const createText = () => {
    const newText = (
      <div
        key={boxes.length}
        className="absolute z-50 h-fit cursor-pointer text-black"
        onMouseDown={(e) => handleOnMouseDown(e)}
        style={{
          textTransform: transform === "normal-case" ? "none" : "uppercase",
          fontWeight: weight === "normal" ? "400" : "700",
          fontSize: `${fontSize}px`,
          fontStyle: style === "not-italic" ? "normal" : "italic",
          fontFamily: fontFamily,
          color: color,
        }}
      >
        {text}
      </div>
    );

    setBoxes((prevText) => [...prevText, newText]);
    setText("");
    resetState();
  };

  const addText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (text.trim() === "") return;

    if (prevTextRef.current) {
      editText();
      return;
    }
    createText();
  };

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <Link href="/">
        <ArrowLeftIcon className="h-6 w-6" />
      </Link>
      <section className="flex justify-center ">
        <div className="flex w-full flex-wrap justify-center gap-6">
          <div
            className="relative h-full w-full max-w-[600px] h-max-[800px] overflow-hidden rounded border border-black"
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
          <div className="flex w-full max-w-[600px] flex-col gap-y-6">

            <Carrusel changeImage={setImageSelected} id={id} />
            <EditText addText={addText} />
          </div>
        </div>
      </section>
      <Modal />
    </main>
  );
}
