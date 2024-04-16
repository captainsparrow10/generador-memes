"use client";
import { memeImageType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getMemeImages } from "@/services/meme";
import clsx from "clsx";
import AddImageIcon from "@public/icons/addImage";
import { useEditContext } from "@/context/edit.context";
import Modal from "@/components/modal/modal";

export default function page() {
  const [memes, setMemes] = useState<memeImageType[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(25);
  const { setShowModal } = useEditContext();

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
      <section className="columns-2 gap-x-10 sm:columns-3 lg:columns-4 xl:columns-5">
        {memes?.map(({ id, url, width, height, name }) => (
          <Link href={`/${id}`} key={id} className="h-fit w-fit">
            <div
              className={clsx(
                "mb-4 h-fit w-full overflow-hidden rounded-lg border border-gray-100",
                loading ? "hidden" : "block",
              )}
            >
              <Image src={url} width={width} height={height} alt={name} />
            </div>
          </Link>
        ))}
        {loading &&
          Array.from(Array(25).keys()).map((i) => (
            <div
              className="mb-4 h-[275px] w-full animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-gray-300 p-2 sm:h-[350px] lg:h-[400px]"
              key={i}
            ></div>
          ))}
      </section>
      <Modal />
    </main>
  );
}
