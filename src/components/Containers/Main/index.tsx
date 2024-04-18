"use client";
import React, { useEffect } from "react";
import { useEditContext } from "@Contexts/Edit";
import Modal from "@Components/Modal";
import Carrusel from "@Components/Containers/Main/Carrusel";
import { AddImageIcon } from "@Public/Icons";

export default function Main() {
  const { setShowModal, setImageSelected } = useEditContext();
  useEffect(() => {
    setImageSelected({ id: "", name: "", url: "" });
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <main className="flex flex-col gap-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Imagenes</h1>
        <AddImageIcon
          className="h-full max-h-8   w-full  max-w-8 cursor-pointer"
          onClick={handleClick}
        />
      </header>
      <Carrusel />
      <Modal />
    </main>
  );
}
