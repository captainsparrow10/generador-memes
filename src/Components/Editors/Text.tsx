"use client";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { ChangeEvent, useState } from "react";
import FontFamilySize from "../Fonts/FamilySize";
import FontStyle from "../Fonts/Style";
import clsx from "clsx";
import { useTextContext } from "@Contexts/Text";
import { initialStickerState } from "@Utils/Const";
import FontAlign from "@Components/Fonts/Align";

/**
 * Propiedades del componente EditText.
 */
type Props = {
  addText: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Función para añadir texto al presionar Enter
  addTextButton: (e: React.MouseEvent<HTMLButtonElement>) => void; // Función para añadir texto mediante botón
  deleteTextButton: () => void; // Función para eliminar texto
  cloneText: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Componente para editar texto, incluyendo estilo, color y acciones.
 * @param {Props} props - Propiedades del componente EditText.
 * @returns {JSX.Element} El componente EditText.
 */
export default function EditText({
  addText,
  addTextButton,
  deleteTextButton,
  cloneText,
}: Props): JSX.Element {
  const [editView, setEditView] = useState(false);
  const {
    styleText: { color, fontFamily, transform, style, weight, text },
    updateStyleText,
    inputRefs: {
      current: { textColor },
    },
    prevTextRef,
    resetTextState,
    setStickerSelected,
  } = useTextContext();

  /**
   * Maneja el cambio de texto en el input.
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio.
   */
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStyleText("text", e.target.value);
  };

  /**
   * Maneja el cambio de color del texto.
   * @param {ChangeEvent<HTMLInputElement>} e - Evento de cambio.
   */
  const handleChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    updateStyleText("color", e.target.value);
  };

  const deselectText = () => {
    if (!prevTextRef.current) return;
    prevTextRef.current.style.backgroundColor = "transparent";
    prevTextRef.current.style.padding = "0px";
    prevTextRef.current = null;
    resetTextState();
    setStickerSelected(initialStickerState);
  };

  /**
   * Verifica si hay texto editado previamente.
   * @returns {boolean} True si hay texto editado, false de lo contrario.
   */
  const editedText = (): boolean => {
    if (prevTextRef.current?.nodeName === "DIV") return true;
    return false;
  };

  return (
    <div className="flex flex-col gap-y-3">
      {/* Input para editar texto */}
      <div className="flex h-12 divide-x divide-black overflow-hidden rounded border border-black">
        <input
          type="text"
          placeholder="Escribe aqui"
          className={`w-full  px-4  text-[${color}] text-[16px] font-${fontFamily} font-${weight} ${style} ${transform}`}
          value={text}
          onChange={handleChangeText}
          onKeyDown={addText}
        />

        {/* Selector de color del texto */}
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

      {/* Botones de acciones si hay texto editado */}
      {editedText() && (
        <div className="flex gap-x-6">
          <button
            onClick={addTextButton}
            className="rounded-md border border-transparent bg-black px-3 py-3 text-white duration-150 ease-in-out hover:border-black hover:bg-white hover:text-black"
          >
            Actualizar
          </button>
          <button
            onClick={deleteTextButton}
            className="rounded-md border border-transparent bg-black px-3 py-3 text-white duration-150 ease-in-out hover:border-black hover:bg-white hover:text-black"
          >
            Eliminar
          </button>
          <button
            onClick={deselectText}
            className="rounded-md border border-transparent bg-black px-3 py-3 text-white duration-150 ease-in-out hover:border-black hover:bg-white hover:text-black"
          >
            Desleccionar texto
          </button>
          <button
            onClick={cloneText}
            className="rounded-md border border-transparent bg-black px-3 py-3 text-white duration-150 ease-in-out hover:border-black hover:bg-white hover:text-black"
          >
            Clonar
          </button>
        </div>
      )}

      {/* Vista para expandir opciones de edición */}
      <div className="flex items-center gap-x-3">
        <p>Editar texto</p>
        <ChevronDownIcon
          className={clsx(
            "h-6 w-6 transition-all",
            editView && "rotate-180 transform",
          )}
          onClick={() => setEditView(!editView)}
        />
      </div>

      {/* Contenido expandido para editar estilo del texto */}
      <div
        className={clsx("flex flex-col gap-y-3", editView ? "flex" : "hidden")}
      >
        <FontFamilySize />
        <FontStyle />
        <FontAlign />
      </div>
    </div>
  );
}
