"use client";
import { memeImageType } from "@/types";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { getMemeImages } from "@/services/meme";

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
      <section className="flex flex-wrap justify-around gap-3">
        {memes?.map(({ id, url, width, height, name }) => (
          <Link href={`/${id}`} key={id} className="h-fit w-fit">
            <div className="h-fit w-full max-w-[250px] overflow-hidden rounded border border-gray-300">
              <Image src={url} width={width} height={height} alt={name} />
            </div>
          </Link>
        ))}
        {loading && <Loading />}
      </section>
    </main>
  );
}
