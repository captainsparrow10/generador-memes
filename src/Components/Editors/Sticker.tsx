"use client";
import { useTextContext } from "@Contexts/Text";
import { initialStickerState } from "@Utils/Const";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import React from "react";

/**
 * Propiedades del componente StickerEditor.
 */
type StickerEditorProps = {
  editSticker: (e: React.ChangeEvent<HTMLInputElement>) => void; // Función para editar el tamaño del sticker
  deleteSticker: () => void; // Función para eliminar el sticker
};

/**
 * Componente para editar stickers, incluyendo tamaño y eliminación.
 * @param {StickerEditorProps} props - Propiedades del componente StickerEditor.
 * @returns {JSX.Element} El componente StickerEditor.
 */
const StickerEditor = ({
  deleteSticker,
  editSticker,
}: StickerEditorProps): JSX.Element => {
  const { stickerSelected, prevTextRef, resetTextState, setStickerSelected } =
    useTextContext();

  const deselectSticker = () => {
    if (!prevTextRef.current) return;
    prevTextRef.current.style.backgroundColor = "transparent";
    prevTextRef.current.style.padding = "0px";
    prevTextRef.current = null;
    resetTextState();
    setStickerSelected(initialStickerState);
  };

  const editedSticker = (): boolean => {
    if (prevTextRef.current?.nodeName === "IMG") return true;
    return false;
  };

  return (
    <div className="flex items-center gap-x-6">
      {/* Vista previa del sticker */}
      <div className="relative h-24 w-24 shrink-0">
        {stickerSelected.url ? (
          <Image src={stickerSelected.url} alt="img" fill />
        ) : (
          <PhotoIcon className="h-full w-full text-gray-300" />
        )}
      </div>
      {/* Panel de edición */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <label htmlFor="width">Tamaño</label>
          {/* Input para editar el tamaño del sticker */}
          <input
            type="number"
            placeholder="Escribe el tamaño"
            className="rounded border border-gray-300 px-3 py-2"
            value={stickerSelected.size}
            onChange={editSticker}
            min={1}
          />
          {/* Botón para eliminar el sticker */}
          {editedSticker() && (
            <div className="flex gap-3">
              <button
                onClick={deleteSticker}
                className="h-fit rounded-sm border border-transparent bg-black px-2 py-2 text-white duration-150 ease-in-out hover:border-black hover:bg-white hover:text-black"
              >
                Eliminar
              </button>
              <button
                onClick={deselectSticker}
                className="h-fit rounded-sm border border-transparent bg-black px-2 py-2 text-white duration-150 ease-in-out hover:border-black hover:bg-white hover:text-black"
              >
                Deseleccionar sticker
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-full items-end py-2"></div>
    </div>
  );
};

export default StickerEditor;
