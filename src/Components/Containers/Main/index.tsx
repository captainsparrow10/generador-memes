"use client";
import React, { useEffect } from "react";
import { useCanvaContext } from "@Contexts/Canva";
import Modal from "@Components/Modal";
import Carrusel from "@Components/Containers/Main/Carrusel";
import { AddImageIcon } from "@Public/Icons";

/**
 * Componente principal que muestra la página principal con un carrusel de imágenes y un modal para agregar imágenes.
 * @returns {JSX.Element} El componente principal de la página.
 */
export default function Main(): JSX.Element {
  const { setShowModal, setImageSelected } = useCanvaContext();

  // Establece la imagen seleccionada como vacía al cargar la página
  useEffect(() => {
    setImageSelected({ id: "", name: "", url: "" });
  }, []);

  /**
   * Maneja la apertura del modal para agregar imágenes.
   */
  const handleModal = () => {
    setShowModal(true);
  };

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Imagenes</h1>
        {/* Icono para agregar imágenes */}
        <AddImageIcon
          className="h-full max-h-8 w-full max-w-8 cursor-pointer"
          onClick={handleModal}
        />
      </header>
      {/* Componente Carrusel para mostrar imágenes */}
      <Carrusel />
      {/* Modal para agregar imágenes */}
      <Modal />
    </main>
  );
}

