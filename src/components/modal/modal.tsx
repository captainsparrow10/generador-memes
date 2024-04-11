"use client";

import { useEditContext } from "@/context/edit.context";
import { memeImageType } from "@/types";
import { useState } from "react";
import { v4 } from "uuid";
import Divider from "../divider";
import ModalOption from "./modalOptions";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Button from "../button";

const Modal = () => {
  const {
    showModal,
    setShowModal,
    setImageSelected,
    imageSelected,
    fileInputRef,
  } = useEditContext();

  const [inputUrl, setInputUrl] = useState<memeImageType | null>(null);
  const [active, setActive] = useState<"upload" | "url">("upload");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInsertUrl = () => {
    if (!inputUrl) return;
    setImageSelected(inputUrl);
    setShowModal(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const meme: memeImageType = {
      id: "0",
      name: "example",
      url: e.target.value,
    };

    setInputUrl(meme);
  };

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
      <div className="fixed left-1/2 top-1/2 z-50 w-96  -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-lg">
        <div className="relative flex items-center justify-center py-2">
          <XMarkIcon
            className="absolute left-0 top-0 ml-4 py-2"
            width={24}
            onClick={handleCloseModal}
          />
          <p className="font-bold">Select Image</p>
        </div>
        <Divider />
        <div className="flex justify-center gap-x-3  py-2">
          <ModalOption label="upload" active={active} setActive={setActive} />
          <ModalOption label="url" active={active} setActive={setActive} />
        </div>
        {active === "upload" ? (
          <div
            className="mx-6 my-4 flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 p-12 text-gray-400"
            onClick={() => fileInputRef.current?.click()}
          >
            <PhotoIcon width={40} className="mb-2" />
            <p>Browse or drop image</p>
          </div>
        ) : (
          <div className="mx-6 flex flex-col gap-6 pb-4 ">
            <p className="font-semibold">Image URL</p>
            <div className="flex h-12 flex-col gap-10 divide-x divide-black overflow-hidden rounded border border-gray-300">
              <input
                type="text"
                className="h-full w-full px-4 text-black"
                placeholder="link de imagen"
                value={inputUrl?.url}
                onChange={handleOnChange}
              />
            </div>
            <Button children="Add image" />
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg, image/png"
          hidden
          ref={fileInputRef}
          onChange={loadImage}
        />
      </div>
    </div>
  );
};

export default Modal;
