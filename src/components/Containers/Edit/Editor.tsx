'use client'
import StickerEditor from "@Components/Editors/Sticker";
import EditText from "@Components/Editors/Text";
import { Button } from "@Components/UI";
import { useCanvaContext } from "@Contexts/Canva";
import { useTextContext } from "@Contexts/Text";
import clsx from "clsx";
import React from "react";
import useText from "@Hooks/useText";
import useSticker from "@Hooks/useSticker";
import { toPng } from "html-to-image";
import download from "downloadjs";

export default function Editor() {
  const { editText, createText, deleteText, } = useText();
  const { editSticker, deleteSticker } = useSticker();
  const { handleOnMouseDown, boxes, setBoxes, handleOnTouchStart, canvasRef, resetEdit } = useCanvaContext();

  const {
    styleText: { transform, style, weight, fontFamily, fontSize, color, text },
    resetTextState,
    prevTextRef,
    modeEdit,
    setModeEdit,
    resetSticker,
  } = useTextContext();

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

  const addText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (text.trim() === "") return;

    if (prevTextRef.current) {
      editText();
      return;
    }
    createText(newText);
  };

  const addTextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (text.trim() === "") return;

    if (prevTextRef.current) {
      editText();
      return;
    }

    createText(newText);
  };

  const saveImage = () => {
    if (!canvasRef.current) return;
    if (prevTextRef.current) {
      prevTextRef.current.style.backgroundColor = "transparent";
    }
    toPng(canvasRef.current).then((dataUrl) => {
      download(dataUrl, "custom-image.png");
    });
  };
  
  const handlerClear = () => {
    setBoxes([]);
    resetTextState();
    resetEdit();
    resetSticker()
  };
  

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex gap-x-6">
        <h3
          className={clsx("text-2xl", modeEdit === "text" && "font-bold")}
          onClick={() => {
            if (prevTextRef.current?.nodeName == "IMG")
              prevTextRef.current.style.backgroundColor = "transparent";
            resetSticker();
            prevTextRef.current = null;

            modeEdit !== "text" ? setModeEdit("text") : null;
          }}
        >
          Texto
        </h3>
        <h3
          className={clsx("text-2xl", modeEdit === "sticker" && "font-bold")}
          onClick={() => {
            if (prevTextRef.current?.nodeName == "DIV")
              prevTextRef.current.style.backgroundColor = "transparent";
            prevTextRef.current = null;
            resetTextState();
            modeEdit !== "sticker" ? setModeEdit("sticker") : null;
          }}
        >
          Sticker
        </h3>
      </div>
      {modeEdit === "sticker" ? (
        <StickerEditor
          deleteSticker={deleteSticker}
          editSticker={editSticker}
        />
      ) : (
        <EditText
          addText={addText}
          addTextButton={addTextButton}
          deleteTextButton={deleteText}
        />
      )}
      <div className="flex gap-x-6">
        <Button onClickHandler={saveImage}>Descargar</Button>
        <Button variant="secondary" onClickHandler={handlerClear}>
          Limpiar
        </Button>
      </div>
    </div>
  );
}
