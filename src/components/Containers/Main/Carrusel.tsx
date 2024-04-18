import { getMemeImages } from "@Services/Meme";
import { memeImageType } from "@Types";
import Image from "next/image";
import Link from "next/link";
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 25;

export default function Carrusel() {
  const [memes, setMemes] = useState<memeImageType[]>([]);
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [end, setEnd] = useState(PAGE_SIZE);

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
    if (memes.length >= 100 || loading) return;

    setLoading(true);
    const newMemes = await getMemeImages(start, end);
    if (newMemes !== undefined) {
      setMemes((prevMemes) => [...prevMemes, ...newMemes]);
      setStart((prevStart) => prevStart + PAGE_SIZE);
      setEnd((prevEnd) => prevEnd + PAGE_SIZE);
      setLoading(false);
    }
  };

  const memoizedUpdateMemesArray = useMemo(
    () => updateMemesArray,
    [updateMemesArray],
  );
  console.log(memoizedUpdateMemesArray);

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
        Array.from(Array(PAGE_SIZE).keys()).map((i) => (
          <div
            className="mb-4 h-[275px] w-full animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-gray-300 p-2 sm:h-[350px] lg:h-[400px]"
            key={i}
          ></div>
        ))}
    </section>
  );
}
