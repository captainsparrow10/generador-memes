import { PhotoIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function Loading() {
  return (
    <main className="flex flex-col gap-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Imagenes</h1>
        <PhotoIcon className="h-6 w-6" />
      </header>
      <section className="flex flex-wrap  gap-x-3 gap-y-6  justify-around">
        {Array.from(Array(10).keys()).map((i) => (
          <div
            className="h-[400px] w-full max-w-[250px] animate-pulse overflow-hidden rounded-xl border border-gray-300 bg-gray-200 p-2"
            key={i}
          >
    
          </div>
        ))}
      </section>
    </main>
  );
}
