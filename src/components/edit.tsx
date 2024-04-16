"use client";
import Carrusel from "@/components/carrusel";
import EditText from "@/components/editText";
import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/16/solid";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ChangeEventHandler, useEffect, useState } from "react";
import Modal from "./modal/modal";
import { initialStickerState, useEditContext } from "@/context/edit.context";
import { getMemeImageById } from "@/services/meme";
import { useTextContext } from "@/context/text.context";
import clsx from "clsx";
import { v4 } from "uuid";
import Button from "./button";
import { StickerType } from "@/types";
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
    imageRef,
    modeEdit,
    setModeEdit,
    resetEdit,
    saveImage,
    handleOnTouchStart,
    stickerSelected,
    setStickerSelected,
    
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

    const onMouseDown = (e: MouseEvent) => {
      if (e.target === prevTextRef.current) return;
      if (!prevTextRef.current) return;

      prevTextRef.current.style.backgroundColor = "transparent";
      prevTextRef.current.style.padding = "0px";
      prevTextRef.current = null;
      setText("");
      resetState();
      setStickerSelected(initialStickerState);
    };

    const handleOnTouchStart = (e: TouchEvent) => {
      if (e.target === prevTextRef.current) return;
      if (!prevTextRef.current) return;

      prevTextRef.current.style.backgroundColor = "transparent";
      prevTextRef.current.style.padding = "0px";
      prevTextRef.current = null;
      
      setText("");
      resetState();
      setStickerSelected(initialStickerState);
    };

    canvasRef.current!.addEventListener("touchstart", handleOnTouchStart);
    canvasRef.current!.addEventListener("mousedown", onMouseDown);
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
      resetState();
      return;
    }
  };

  const createText = () => {
    const newText = (
      <div
        key={boxes.length}
        className="absolute z-50 h-fit cursor-move text-black"
        onMouseDown={handleOnMouseDown}
        onTouchStart={handleOnTouchStart}
        style={{
          textTransform: transform === "normal-case" ? "none" : "uppercase",
          fontWeight: weight === "normal" ? "400" : "700",
          fontSize: `${fontSize}px`,
          fontStyle: style === "not-italic" ? "normal" : "italic",
          fontFamily: fontFamily,
          color: color,
        }}
        data-tag="text"
      >
        {text}
      </div>
    );

    setBoxes((prevText) => [...prevText, newText]);
    setText("");
    resetState();
  };

  const handlerClear = () => {
    setBoxes([]);
    resetState();
    resetEdit();
  };

  const addSticker = (sticker: StickerType) => {
    const newText = (
      <img
        id={v4()}
        key={boxes.length}
        className={`absolute z-50 cursor-pointer`}
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

  const editSticker = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!prevTextRef.current) return;
    if (prevTextRef.current.nodeName !== "IMG") return;
    setStickerSelected((prevState) => ({
      ...prevState,
      size: parseInt(e.target.value),
    }));
    prevTextRef.current.style.width = `${e.target.value}px`;
    prevTextRef.current.style.height = `${e.target.value}px`;
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
      <Link href="/" className="h-fit w-fit">
        <ArrowLeftIcon className="h-full max-h-8   w-full  max-w-8" />
      </Link>
      <section className="flex justify-center ">
        <div className="flex w-full flex-wrap justify-center gap-6">
          <div className="flex max-h-[600px]  max-w-[600px] w-full  items-center justify-center">
            <div
              className="relative w-fit overflow-hidden border border-black"
              ref={canvasRef}
            >
              {boxes.map((box, index) => (
                <div key={index}>{box}</div>
              ))}
              <div
                className="absolute left-0 top-0 h-full w-full"
                ref={imageRef}
                style={{ backgroundColor: "black", opacity: 0 }}
              ></div>
              {loading ? (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <PhotoIcon className="h-2/5 w-full animate-pulse" />
                </div>
              ) : (
                <img
                  className=" sm:max-h-[500px] sm:max-w-[600px]"
                  src={imageSelected.url}
                  alt={imageSelected.name}
                />
              )}
            </div>
          </div>

          <div className="flex w-full max-w-[600px] flex-col gap-y-6">
            <Carrusel
              changeImage={setImageSelected}
              id={id}
              addSticker={addSticker}
            />
            <div className="flex flex-col gap-y-6">
              <div className="flex gap-x-6">
                <h3
                  className={clsx(
                    "text-2xl",
                    modeEdit === "text" && "font-bold",
                  )}
                  onClick={() =>
                    modeEdit !== "text" ? setModeEdit("text") : null
                  }
                >
                  Texto
                </h3>
                <h3
                  className={clsx(
                    "text-2xl",
                    modeEdit === "sticker" && "font-bold",
                  )}
                  onClick={() =>
                    modeEdit !== "sticker" ? setModeEdit("sticker") : null
                  }
                >
                  Sticker
                </h3>
              </div>
              {modeEdit === "sticker" ? (
                <div className="flex gap-x-6">
                  <div className="relative h-24 w-24 ">
                    {stickerSelected.url ? (
                      <Image src={stickerSelected.url} alt="img" fill />
                    ) : (
                      <PhotoIcon className="h-full w-full text-gray-300" />
                    )}
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <label htmlFor="width">Tamaño</label>
                      <input
                        type="number"
                        placeholder="Escribe el tamaño"
                        className=" boder-gray-3000 rounded border  px-3 py-2"
                        value={stickerSelected.size}
                        onChange={editSticker}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <EditText addText={addText} />
              )}
              <div className="flex gap-x-6">
                <Button onClickHandler={saveImage}>Descargar</Button>
                <Button variant="secondary" onClickHandler={handlerClear}>
                  Limpiar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal />
    </main>
  );
}
