"use client";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { memeImageType } from "@Types";
import { getMemeImages } from "@Services/Meme";

export default function Carrusel() {
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
    <section className="columns-2 gap-x-10 sm:columns-3 lg:columns-4 xl:columns-5">
      {memes.map(({ id, url, width, height, name }) => (
        <Link href={`/${id}`} key={id} className="h-fit w-fit">
          <div
            className={clsx(
              "mb-4 h-fit w-full overflow-hidden rounded-lg border border-gray-100",
              loading && id === memes[memes.length - 1].id ? "hidden" : "block",
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
  );
}
