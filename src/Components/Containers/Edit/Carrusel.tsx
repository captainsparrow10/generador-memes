'use client';
import { useCanvaContext } from "@Contexts/Canva";
import { getMemeImages } from "@Services/Meme";
import { MemeImageType } from "@Types";
import { PhotoIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";

type Props = {
  id: string;
};

/**
 * Componente de carrusel para mostrar imágenes de memes.
 * @param {Props} props - Propiedades del componente.
 * @returns {JSX.Element} El componente del carrusel de memes.
 */
export default function Carrusel({ id }: Props): JSX.Element {
  const { setShowModal, setImageSelected } = useCanvaContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [memes, setMemes] = useState<MemeImageType[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(25);

  useEffect(() => {
    // Actualiza la lista de memes al montar el componente
    updateMemesArray();
  }, []);

  /**
   * Maneja el evento de clic en el icono de foto.
   */
  const handleClick = () => {
    setShowModal(true);
  };

  // Acutaliza las imagenes al ahcer el scroll.
  useEffect(() => {
    const handleScroll = () => {
      const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current!;
      if (scrollLeft + offsetWidth >= scrollWidth) {
        updateMemesArray();
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [memes]);

  /**
   * Actualiza la lista de memes cargando más imágenes.
   */
  const updateMemesArray = async () => {
    memes.length < 100 && setLoading(true);
    let newMemes = await getMemeImages(start, end);

    if (newMemes !== undefined && memes !== undefined) {
      setMemes([...memes, ...newMemes]);
      setStart(end);
      setEnd(end + 25);
      setLoading(false);
    }
  };

  return (
    <>
      <Header id={id} memes={memes} />
      <div ref={scrollRef} className="h-fit w-full overflow-x-scroll">
        <div className="flex h-full max-h-12 w-fit divide-x divide-black overflow-hidden rounded border border-black">
          <div
            className="flex h-full w-16 shrink-0 items-center justify-center p-2 "
            onClick={handleClick}
          >
            <PhotoIcon className="h-full w-full" />
          </div>
          {memes.map((img) => (
            <div
              className={clsx(
                "relative h-full w-16 shrink-0  cursor-pointer",
                loading ? "hidden" : "block",
              )}
              key={img.id}
              onClick={() => setImageSelected(img)}
            >
              <Image src={img.url} alt={img.name} fill />
            </div>
          ))}
          {loading &&
            Array.from(Array(25).keys()).map((i) => (
              <div
                key={i}
                className="relative flex h-full max-h-16 w-16 shrink-0 items-center justify-center bg-gray-100 p-2"
              >
                <PhotoIcon className="h-full w-full animate-pulse" />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
