"use client";
import Carrusel from "@/components/carrusel";
import EditText from "@/components/editText";
import { memeImageType } from "@/types";
import { ArrowLeftIcon, ForwardIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  memes: memeImageType[];
  meme: memeImageType
};

export default function EditComponent({ memes, meme }: Props) {
  const [imageSelected, setImageSelected] = useState(meme);
  return (
    <main className="flex flex-col gap-y-6 p-6">
      <Link href="/">
        <ArrowLeftIcon className="h-6 w-6" />
      </Link>
      <section className=" flex flex-col gap-y-6">
        <div className="relative h-[350px] w-full">
          <Image src={imageSelected.url} alt={imageSelected.name} fill />
        </div>
        <div className="flex justify-end">
          <ForwardIcon className="h-6 w-6" />
        </div>
        <Carrusel images={memes} changeImage={setImageSelected} />
        <EditText />
      </section>
    </main>
  );
}
