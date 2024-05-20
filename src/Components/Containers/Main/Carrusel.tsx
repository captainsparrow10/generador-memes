"use client";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { MemeImageType } from "@Types";
import { getMemeImages } from "@Services/Meme";
import Loading from "@Components/Containers/Main/Loading";
import Masonry from "@mui/lab/Masonry";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";

/**
 * Componente que muestra un carrusel de memes con carga infinita.
 * @returns {JSX.Element} El componente del carrusel de memes.
 */
export default function Carrusel(): JSX.Element {
  const [memes, setMemes] = useState<MemeImageType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchValue, setSearchValue] = useState("")
  let start = useRef(0);
  let end = useRef(25);

  useEffect(() => {
    getMemes();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(searchValue.toLowerCase())
  );


  /**
   * Obtiene los memes iniciales.
   */
  const getMemes = async () => {
    const memes = await getMemeImages(start.current, end.current);
    setMemes(memes);
  };

  /**
   * Carga más memes al desplazarse.
   */
  const moreData = async () => {
    start.current += 25;
    end.current += 25;

    if (start.current > 75) {
      setHasMore(false);
    }
    try {
      const response = await getMemeImages(start.current, end.current);
      setMemes(memes.concat(response));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full">
      <input type="text" className="border p-4 w-full mb-2 rounded" placeholder="search..."
      onChange={onChange}
      value={searchValue}/>
      <InfiniteScroll
        next={moreData}
        dataLength={memes.length}
        hasMore={hasMore}
        loader={<Loading length={memes.length} />}
        endMessage={<h4>No more memes to load</h4>}
        style={{ overflow: "none" }}
      >
        <Masonry
          columns={{ xs: 2, sm: 3, md: 5 }}
          spacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {filteredMemes.map(({ id, url, width, height, name }) => (
            <div key={id}>
              <Link href={`/${id}`} className="h-fit w-fit">
                <div className={"border border-gray-100"}>
                  <Image src={url} width={width} height={height} alt={name} />
                </div>
              </Link>
            </div>
          ))}
        </Masonry>
      </InfiniteScroll>
    </section>
  );
}
