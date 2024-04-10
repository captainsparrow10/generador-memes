import { getMemeImages } from "@/services/meme";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const memes = await getMemeImages();
  if (memes === undefined) {
    return;
  }
  return (
    <main className="flex flex-col gap-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Imagenes</h1>
        <PhotoIcon className="h-6 w-6" />
      </header>
      <section className="flex flex-wrap gap-3">
        {memes.map(({ id, url, width, height, name }) => (
          <Link href={`/${id}`} key={id}>
            <div className="h-full w-full max-w-[150px]">
              <Image src={url} width={width} height={height} alt={name} />
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
