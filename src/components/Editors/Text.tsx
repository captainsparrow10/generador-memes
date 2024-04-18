"use client";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { ChangeEvent, useState } from "react";
import FontFamilySize from "../Fonts/FamilySize";
import FontStyle from "../Fonts/Style";
import clsx from "clsx";
import { useEditContext } from "@Contexts/Edit";
import { useTextContext } from "@Contexts/Text";

type Props = {
  addText: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addTextButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deleteTextButton: () => void;
};

export default function EditText({ addText, addTextButton, deleteTextButton }: Props) {
  const [editView, setEditView] = useState(false);
  const {
    styleText: { color, fontFamily, textStyle },
    setColor,
    inputRefs: {
      current: { textColor },
    },
  } = useTextContext();
  const { transform, style, weight } = textStyle;
  const { text, setText, prevTextRef } = useEditContext();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const editedText = () => {
    if (prevTextRef.current?.nodeName === "DIV") return true;
    return false;
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex h-12 divide-x divide-black overflow-hidden rounded border border-black">
        <input
          type="text"
          placeholder="Escribe aqui"
          className={`w-full  px-4  text-[${color}] text-[16px] font-${fontFamily} font-${weight} ${style} ${transform}`}
          value={text}
          onChange={handleChangeText}
          onKeyDown={addText}
        />

        <div className="flex h-full w-12 shrink-0 items-center justify-center">
          <div className="rounded" />
          <input
            className="h-6 w-6"
            type="color"
            ref={textColor}
            onChange={handleChangeColor}
          />
        </div>
      </div>
      {editedText() && (
        <div className="flex gap-x-6">
          <button onClick={addTextButton} className="bg-black text-white rounded-md px-3 py-3 border border-transparent hover:bg-white hover:text-black hover:border-black duration-150 ease-in-out">Actualizar</button>
          <button onClick={deleteTextButton} className="bg-black text-white rounded-md px-3 py-3 border border-transparent hover:bg-white hover:text-black hover:border-black duration-150 ease-in-out" >Eliminar</button>
        </div>
      )}

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
    </div>
  );
}
