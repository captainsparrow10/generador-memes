"use client";
import Carrusel from "@Components/Containers/Edit/Carrusel";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "@Components/Modal";
import { useCanvaContext } from "@Contexts/Canva";
import { getMemeImageById } from "@Services/Meme";
import { useTextContext } from "@Contexts/Text";
import { validate } from "uuid";
import ImageContainer from "@Components/Containers/Edit/Image";
import { redirectTo } from "@Utils/Functions";
import { initialStickerState } from "@Utils/Const";
import Editor from "@Components/Containers/Edit/Editor";

type Props = {
  id: string;
};

/**
 * Componente principal para la edición de imágenes.
 * @param {Props} props - Propiedades del componente.
 * @returns {JSX.Element} El elemento principal de la interfaz de edición.
 */
export default function EditContainer({ id }: Props): JSX.Element {
  const { imageSelected, setImageSelected, canvasRef } = useCanvaContext();
  const [loading, setLoading] = useState(true);
  const { resetTextState, prevTextRef, setStickerSelected } = useTextContext();

  /**
   * Maneja la selección de un elemento en el canvas.
   * @param {EventTarget} target - Elemento HTML objetivo del evento.
   */
  const handleSelectElement = (target: EventTarget) => {
    if (target === prevTextRef.current) return;
    if (!prevTextRef.current) return;
    prevTextRef.current.style.backgroundColor = "transparent";
    prevTextRef.current.style.padding = "0px";
    prevTextRef.current = null;
    resetTextState();
    setStickerSelected(initialStickerState);
  };

  
  useEffect(() => {
     // Carga la imagen del meme al iniciar
    memeImageById(id);

    const onMouseDown = (e: MouseEvent) => {
      handleSelectElement(e.target!);
    };

    const handleOnTouchStart = (e: TouchEvent) => {
      handleSelectElement(e.target!);
    };

    canvasRef.current!.addEventListener("touchstart", handleOnTouchStart);
    canvasRef.current!.addEventListener("mousedown", onMouseDown);

     // Limpia los event listeners al desmontar el componente
    return () => {
      canvasRef.current!.removeEventListener("touchstart", handleOnTouchStart);
      canvasRef.current!.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  /**
   * Obtiene la imagen del meme por su ID.
   * @param {string} id - ID único del meme.
   */
  const memeImageById = async (id: string) => {

    //Valida si la imagen viene de la API o de un archivo/url
    if (validate(imageSelected.id)) {
      setLoading(false);
      return;
    }
    if (validate(id) && imageSelected.url === "") {
      redirectTo("/");
    }

    setLoading(true);
    let meme = await getMemeImageById(id);
    if (meme !== undefined) {
      setImageSelected(meme);
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <Link href="/" className="h-fit w-fit">
        <ArrowLeftIcon className="h-full max-h-8 w-full max-w-8" />
      </Link>
      <section className="flex justify-center ">
        <div className="flex w-full flex-wrap justify-center gap-6">
          <ImageContainer loading={loading} />
          <div className="flex w-full max-w-[600px] flex-col gap-y-6">
            <Carrusel id={id} />
            <Editor />
          </div>
        </div>
      </section>
      <Modal />
    </main>
  );
}