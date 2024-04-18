"use client";
import { memeImageType } from "@/Types";
import React, { useEffect, useState } from "react";
import { getMemeImages } from "@/Services/meme";
import { useEditContext } from "@/Contexts/Edit";
import Modal from "@Components/Modal";
import Carrusel from "@Components/Container/Carrusel";
import { AddImageIcon } from "@Public/Icons";

export default function Main() {
  const [memes, setMemes] = useState<memeImageType[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(25);
  const { setShowModal, setImageSelected } = useEditContext();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }

      updateMemesArray();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [memes]);

  useEffect(() => {
    updateMemesArray();
    setImageSelected({ id: "", name: "", url: "" });
  }, []);

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
