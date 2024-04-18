"use client";
import { useTextContext } from "@/Contexts/Text";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import React, { useState } from "react";

export default function FontFamilySize() {
  const fontFamilies = [
    { id: 1, name: "serif" },
    { id: 2, name: "sans-serif" },
    { id: 3, name: "monospace" },
    { id: 4, name: "cursive" },
    { id: 5, name: "fantasy" },
    { id: 6, name: "system-ui" },
    { id: 7, name: "ui-serif" },
    { id: 8, name: "ui-sans-serif" },
    { id: 9, name: "ui-monospace" },
    { id: 10, name: "ui-rounded" },
    { id: 11, name: "emoji" },
    { id: 12, name: "math" },
    { id: 13, name: "fangsong" },
    { id: 14, name: "roboto" },
  ];

  const [active, setActive] = useState(false);
  const {
    setFontFamily,
    styleText: { fontFamily },
  } = useTextContext();
  const [filteredFamilies, setFilteredFamilies] = useState(fontFamilies);
  const {
    styleText: { fontSize },
    setFontSize,
  } = useTextContext();
  const handleFilderBar = (text: string) => {
    let value = fontFamilies.filter((family) => {
      return family.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredFamilies(value);
    if (text === "") {
      setFilteredFamilies(fontFamilies);
      setActive(false);
      return;
    }
    setActive(text !== "" && value.length > 0);
  };

  return (
    <div className="flex  gap-x-6">
      <div className="flex flex-col">
        <div className="flex gap-x-6 rounded border border-black px-4 py-3 ">
          <input
            type="text"
            placeholder="Roboto"
            className="w-full  text-black"
            value={fontFamily}
            onBlur={() => setActive(false)}
            onChange={(e) => handleFilderBar(e.target.value)}
          />
          <div className="flex h-full w-fit shrink-0  items-center justify-center">
            <ChevronDownIcon
              className={clsx(
                "h-6 w-6 transition-all",
                active && "rotate-180 transform",
              )}
              onClick={() => setActive(!active)}
            />
          </div>
        </div>
        <div
          className={clsx(
            "flex max-h-36 w-full  flex-col overflow-hidden overflow-y-scroll rounded bg-white transition-all duration-500",
            active ? "my-3 h-full border border-black" : "h-0",
          )}
        >
          {filteredFamilies.map((family) => (
            <p
              key={family.id}
              className={clsx(
                "cursor-pointer px-3 py-3 capitalize hover:bg-gray-100",
                family.name === fontFamily && "font-bold",
              )}
              onClick={() => {
                setFontFamily(family.name);
                setActive(false);
              }}
            >
              {family.name}
            </p>
          ))}
        </div>
      </div>
      <div className="h-fit w-fit rounded border border-black px-4 py-3">
        <input
          type="number"
          placeholder="24"
          className="w-12"
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
}
