"use client";
import Carrusel from "@/components/carrusel";
import EditText from "@/components/editText";
import { memeImageType } from "@/types";
import { ArrowLeftIcon, ForwardIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Props = {
  memes: memeImageType[];
  meme: memeImageType;
};

export default function EditComponent({ memes, meme }: Props) {
  const [imageSelected, setImageSelected] = useState(meme);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<JSX.Element[]>([]);
  const [text, setText] = useState<string>("");
  const prevTextRef = useRef<HTMLElement | null>(null);


  const addText = (e: React.KeyboardEvent<HTMLInputElement>) => {
  
    if ( e.key !== "Enter" ) return
    if ( text.trim() === '' ) return

    if( prevTextRef.current ) {
      prevTextRef.current.textContent = text
      setText("");
      prevTextRef.current.style.backgroundColor = 'transparent'
      prevTextRef.current = null
      return
    }
    const newText = (
      <div
        key={boxes.length}
        className="absolute z-50 cursor-pointer text-black"
        onMouseDown={handleOnMouseDown}
      >
        {text}
      </div>
      );

    setBoxes((prevText) => [...prevText, newText]);
    setText("");
    
  };
  const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    if (prevTextRef.current === null) {
      prevTextRef.current = target;
    }

    if (prevTextRef.current && prevTextRef.current !== target) {
      prevTextRef.current.style.backgroundColor = "transparent";
      prevTextRef.current = target;
    }

    target.style.backgroundColor = "green";
    setText(target.textContent!)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const newX = e.clientX - rect.left - offsetX;
      const newY = e.clientY - rect.top - offsetY;

      const maxX = rect.width - target.clientWidth;
      const maxY = rect.height - target.clientHeight;

      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      target.style.left = `${boundedX}px`;
      target.style.top = `${boundedY}px`;
    };

    const onMouseDown = (e: MouseEvent) => {
      
      if (e.target === prevTextRef.current ) return
      if (!prevTextRef.current) return
      
      prevTextRef.current.style.backgroundColor = 'transparent'
      prevTextRef.current = null
      setText('')
      
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown)
    };

    canvasRef.current!.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  return (
    <main className="flex flex-col gap-y-6 p-6">
      <Link href="/">
        <ArrowLeftIcon className="h-6 w-6" />
      </Link>
      <section className=" flex flex-col gap-y-6">
        <div className="relative h-[350px] w-full border border-black" ref={canvasRef}>
          {boxes.map((box, index) => (
            <div className="p-4" key={index}>{box}</div>
          ))}
          <Image src={imageSelected.url} alt={imageSelected.name} fill />
        </div>
        <div className="flex justify-end">
          <ForwardIcon className="h-6 w-6" />
        </div>
        <Carrusel images={memes} changeImage={setImageSelected} />
        <EditText setText={setText} addText={addText} text={text} />
      </section>
    </main>
  );
}
