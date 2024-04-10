"use client";
import { getMemeImages } from "@/services/meme";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { memeImageType } from "@/types";
import Loading from "@/app/loading";

type Props = {
  meme?: memeImageType[];
};
export default function Home({ meme }: Props) {
  if (meme === undefined) {
    return <h1>Loading</h1>;
  }
  const [memes, setMemes] = useState<memeImageType[]>(meme);
  const [index, setIndex] = useState(10);
  useEffect(() => {}, []);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }

      loadMoreMemes();
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadMoreMemes = async () => {
    console.log(index)
    const loadedMemes = await getMemeImages({
      prevPage: index,
      newPreview: setIndex,
    });
    if (loadedMemes) {
      setMemes([...memes, ...loadedMemes]);
    }
  };

  return (
    <main className="flex flex-col gap-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Imagenes</h1>
        <PhotoIcon className="h-6 w-6" />
      </header>
      <section className="flex flex-wrap justify-around gap-3">
        <Suspense fallback={<Loading />}>
          {memes.map(({ id, url, width, height, name }) => (
            <Link href={`/${id}`} key={id} className="h-fit w-fit">
              <div className="h-fit w-full max-w-[250px] overflow-hidden rounded border border-gray-300">
                <Image src={url} width={width} height={height} alt={name} />
              </div>
            </Link>
          ))}
        </Suspense>
      </section>
    </main>
  );
}
