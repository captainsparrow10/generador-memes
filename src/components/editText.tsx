"use client";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, {  useState } from "react";
import FontFamilySize from "./fontFamilySize";
import FontStyle from "./fontStyle";
import clsx from "clsx";
import Button from "./button";
type Props = {
  setText: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  addText: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function EditText({ setText, text, addText }: Props) {
  const [editView, setEditView] = useState(false);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex h-12 divide-x divide-black overflow-hidden rounded border  border-black">
        <input
          type="text"
          placeholder="Escribe aqui"
          className="w-full  px-4 text-black"
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
        <Button>Descargar</Button>
        <Button variant="secondary">Limpiar</Button>
      </div>
    </div>
  );
}
