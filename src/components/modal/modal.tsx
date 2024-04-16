"use client";

import { useEditContext } from "@/context/edit.context";
import { memeImageType } from "@/types";
import { DragEventHandler, useRef, useState } from "react";
import { v4 } from "uuid";
import Divider from "../divider";
import ModalOption from "./modalOptions";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/16/solid";
import Button from "../button";

const Modal = () => {
  const { showModal, setShowModal, setImageSelected, fileInputRef } =
    useEditContext();

  const [error, setError] = useState<boolean>(false);
  const [errorDropImage, setErrorDropImage] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<memeImageType | null>(null);
  const [active, setActive] = useState<"upload" | "url">("upload");
  const [dragText, setDragText] = useState<string>("Browse or drop image");
  const [isDropped, setIsDropped] = useState<boolean>(false)

  const handleCloseModal = () => {
    setShowModal(false);
    setError(false);
    setErrorDropImage(false);
  };

  const isImage = (url: string, extensions: string[]) => {
    if (extensions.some((ext) => url.endsWith(ext))) return true;
    return false;
  };

  const handleInsertUrl = () => {
    if (!inputUrl) return;
    if (!isImage(inputUrl.url, [".jpg", ".jpeg", ".png"])) {
      setError(true);
      return;
    }

    setError(false);

    setImageSelected(inputUrl);
    setShowModal(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setError(false);
    }

    const meme: memeImageType = {
      id: v4(),
      name: "example",
      url: e.target.value,
    };
    setInputUrl(meme);
  };

  const displayFile = (file: File) => {
    setDragText("Browse or drop image");
    setIsDropped(false)
    if (!isImage(file.type, ["png", "jpeg", "jpg"])) {
      setErrorDropImage(true);
      return;
    }

    setErrorDropImage(false);

    const meme: memeImageType = {
      id: v4(),
      name: file.name,
      url: URL.createObjectURL(file),
    };
    setImageSelected(meme);
    setShowModal(false);
  };

  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    displayFile(file);
  };

  return (
    <div
      className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 ${showModal ? "" : "hidden"}`}
    >
      <div className="fixed left-1/2 top-1/2 z-50 w-96  -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white shadow-lg">
        <div className="relative flex items-center justify-center py-2">
          <XMarkIcon
            className="absolute left-0 top-0 ml-4 py-2 cursor-pointer"
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
            className={`relative mx-6 my-4 flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 p-12 text-gray-400 ${isDropped ? 'border-blue-600' : 'border-gray-300'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <div
              className="absolute h-full w-full"
              onDragOver={(e) => {
                e.preventDefault();
                setErrorDropImage(false)
                setIsDropped(true)
                setDragText("Release to upload");
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDropped(false)
                setDragText("Browse or drop image");
              }}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer?.files[0];
                if (!file) return;
                displayFile(file)
                
              }}
            ></div>
            <PhotoIcon color={`${isDropped ? 'text-blue-600' : ''}`} width={40} className="mb-2" />
            <p className={`${isDropped ? 'text-blue-600' : ''}`}>{dragText}</p>
            <p
              className={`text-sm text-red-500 ${errorDropImage ? "flex" : "hidden"} top-14 z-50`}
            >
              Type not valid
            </p>
          </div>
        ) : (
          <div className="mx-6 flex flex-col gap-12 pb-4 ">
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Image URL</p>
              <div className="relative flex h-12 flex-col gap-10 rounded border border-gray-300">
                <input
                  type="text"
                  className="h-full w-full px-4 text-black"
                  placeholder="link de imagen"
                  value={inputUrl?.url || ""}
                  onChange={handleOnChange}
                />
                <p
                  className={`absolute text-sm text-red-500 ${error ? "flex" : "hidden"} top-14 z-50`}
                >
                  Url not valid
                </p>
              </div>
            </div>
            <Button onClickHandler={handleInsertUrl} children="Add image" />
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
