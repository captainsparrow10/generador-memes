"use client";
import { memeImageType } from "@/types";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getMemeImages } from "@/services/meme";
import clsx from "clsx";

export default function page() {
  const [memes, setMemes] = useState<memeImageType[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(25);

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

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Imagenes</h1>
        <PhotoIcon className="h-6 w-6" />
      </header>
      <section className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-x-10">
        {memes?.map(({ id, url, width, height, name }) => (
          <Link href={`/${id}`} key={id} className="h-fit w-fit">
            <div
              className={clsx(
                "h-fit w-full overflow-hidden rounded-lg border border-gray-100 mb-4",
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
              className="h-[275px] sm:h-[350px] lg:h-[400px] w-full animate-pulse overflow-hidden rounded-lg border mb-4 border-gray-300 bg-gray-300 p-2"
              key={i}
            ></div>
          ))}
      </section>
    </main>
  );
}
