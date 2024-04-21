"use client";
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

/**
 * Componente principal del editor de imágenes.
 * @returns {JSX.Element} El componente del editor.
 */
export default function Editor(): JSX.Element {
  const { editText, createText, deleteText } = useText();
  const { editSticker, deleteSticker } = useSticker();
  const {
    handleOnMouseDown,
    boxes,
    setBoxes,
    handleOnTouchStart,
    canvasRef,
    resetEdit,
    resetFilter,
  } = useCanvaContext();

  const {
    styleText: { transform, style, weight, fontFamily, fontSize, color, text },
    resetTextState,
    prevTextRef,
    modeEdit,
    setModeEdit,
    resetSticker,
  } = useTextContext();

  /**
   * Crea un nuevo elemento de texto para ser agregado al lienzo de edición.
   * @returns {JSX.Element} El elemento de texto creado.
   */
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

  /**
   * Agrega un texto al canvas al presionar Enter en el input.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - Evento del teclado.
   */
  const addText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (text.trim() === "") return;

    if (prevTextRef.current) {
      editText();
      return;
    }
    createText(newText);
  };

  /**
   * Agrega un texto al canvas al hacer clic en el botón.
   * @param {React.MouseEvent<HTMLButtonElement>} e - Evento del clic.
   */
  const addTextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (text.trim() === "") return;

    if (prevTextRef.current) {
      editText();
      return;
    }

    createText(newText);
  };

  /**
   * Guarda la imagen actual como PNG y la descarga.
   */
  const saveImage = () => {
    if (!canvasRef.current) return;
    if (prevTextRef.current) {
      prevTextRef.current.style.backgroundColor = "transparent";
    }
    toPng(canvasRef.current).then((dataUrl) => {
      download(dataUrl, "custom-image.png");
    });
  };

  /**
   * Limpia el canvas y restablece los estados de texto y sticker.
   */
  const handlerClear = () => {
    setBoxes([]);
    resetTextState();
    resetEdit();
    resetSticker();
    resetFilter();
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
