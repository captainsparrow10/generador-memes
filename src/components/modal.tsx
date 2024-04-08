"use client";

import { useEditContext } from "@/context/edit.context";
import { memeImageType } from "@/types";
import { useState } from "react";
import { v4 } from "uuid";

const Modal = () => {
  const {
    showModal,
    setShowModal,
    setImageSelected,
    imageSelected,
    fileInputRef,
  } = useEditContext();

  const [inputUrl, setInputUrl] = useState<memeImageType | null>(null);

  const handleClick = () => {
    setShowModal(false);
  };

  const handleInsertUrl = () => {
    if( !inputUrl) return
    setImageSelected(inputUrl);
    setShowModal(false)
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const meme: memeImageType = {
      id: '0',
      name: 'example',
      url: e.target.value
    } 

    setInputUrl(meme)
  }

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const meme: memeImageType = {
      id: v4(),
      name: file.name,
      url: URL.createObjectURL(file),
    };
    setImageSelected(meme);
    setShowModal(false);
  };

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 ${showModal ? "" : "hidden"}`}
    >
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-8 shadow-lg">
        <input
          type="file"
          accept="image/jpeg, image/png"
          hidden
          ref={fileInputRef}
          onChange={loadImage}
        />
        <button
          className="m-2 rounded bg-black p-4 text-white"
          onClick={() => fileInputRef.current?.click()}
        >
          Cargar imagen
        </button>
        <div className="flex">
          <button
            className="m-2 text-nowrap rounded bg-black p-4 text-white"
            onClick={handleInsertUrl}
          >
            <p>Insertar Url</p>
          </button>
          <input
            className="w-[100px]"
            type="text"
            placeholder="link de imagen"
            value={inputUrl?.url}
            onChange={handleOnChange}
          />
        </div>
        <button
          className="m-2 rounded bg-black p-4 text-white"
          onClick={handleClick}
        >
          Cerrar Modal
        </button>
      </div>
    </div>
  );
};

export default Modal;
