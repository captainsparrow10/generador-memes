"use client";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import FontFamilySize from "./fontFamilySize";
import FontStyle from "./fontStyle";
import clsx from "clsx";
import Button from "./button";
import { useEditContext } from "@/context/edit.context";
import { styles } from "@/types";
type Props = {
  addText: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};



export default function EditText({ addText }: Props) {
  const [editView, setEditView] = useState(false);
  const [styleText, setStyleText] = useState<styles>({
    textStyle: "none",
    color: "#000000",
    fontSize: 16,
    fontFamily: "Roboto",
  });
  const handleChangeStyle = (textStyle: styles["textStyle"]) => {
    setStyleText((prevStyle) => ({
      ...prevStyle,
      textStyle,
    }));
  };
  const handleChangeColor = (color: styles["color"]) => {
    setStyleText((prevStyle) => ({
      ...prevStyle,
      color,
    }));
  };
  const handleChangeFontSize = (fontSize: styles["fontSize"]) => {
    setStyleText((prevStyle) => ({
      ...prevStyle,
      fontSize,
    }));
  };
  const handleChangeFontFamily = (fontFamily: styles["fontFamily"]) => {
    setStyleText((prevStyle) => ({
      ...prevStyle,
      fontFamily,
    }));
  };
  const { text, setText, saveImage, setBoxes } = useEditContext();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex h-12 divide-x divide-black overflow-hidden rounded border  border-black">
        <input
          type="text"
          placeholder="Escribe aqui"
          className={`w-full  px-4 text-[${styleText.color}] text-[${styleText.fontSize}] font-[${styleText.fontFamily}] ${styleText.textStyle}`}
          value={text}
          onChange={handleChangeText}
          onKeyDown={addText}
        />
        <div className="flex h-full w-12 shrink-0 items-center justify-center">
          <div className="h-6 w-6 rounded bg-black" />
        </div>
      </div>
      <div className="flex items-center gap-x-3">
        <p>Editar texto</p>
        <ChevronDownIcon
          className={clsx(
            "h-6 w-6 transition-all",
            editView && " rotate-180 transform",
          )}
          onClick={() => setEditView(!editView)}
        />
      </div>

      <div
        className={clsx("m flex-col gap-y-3", editView ? "flex " : "hidden")}
      >
        <FontFamilySize />
        <FontStyle />
      </div>
      <div className="flex gap-x-6">
        <Button onClickHandler={saveImage}>Descargar</Button>
        <Button variant="secondary" onClickHandler={() => setBoxes([])}>
          Limpiar
        </Button>
      </div>
    </div>
  );
}
