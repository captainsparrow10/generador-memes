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
import { get } from "http";
import { CircularProgress } from "@mui/material";
export default function Carrusel() {
  const [memes, setMemes] = useState<MemeImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  let start = useRef(0);
  let end = useRef(25);

  useEffect(() => {
    getMemes();
  }, []);

  const getMemes = async () => {
    const memes = await getMemeImages(start.current, end.current);
    setMemes(memes);
    setLoading(false);
  };

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
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
          {memes.map(({ id, url, width, height, name }) => (
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
