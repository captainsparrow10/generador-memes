"use client";
import { useTextContext } from "@/context/text.context";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import React, { useState } from "react";

export default function FontFamilySize() {
  const fontFamilies = [
    { id: 1, name: "Arial, sans-serif" },
    { id: 2, name: "Helvetica, sans-serif" },
    { id: 3, name: "Times New Roman, serif" },
    { id: 4, name: "Courier New, monospace" },
    { id: 5, name: "Georgia, serif" },
    { id: 6, name: "Palatino, serif" },
    { id: 7, name: "Garamond, serif" },
    { id: 8, name: "Bookman, serif" },
    { id: 9, name: "Comic Sans MS, cursive" },
    { id: 10, name: "Trebuchet MS, sans-serif" },
    { id: 11, name: "Arial Black, sans-serif" },
    { id: 12, name: "Impact, sans-serif" },
    { id: 13, name: "Lucida Sans Unicode, sans-serif" },
    { id: 14, name: "Tahoma, sans-serif" },
    { id: 15, name: "Verdana, sans-serif" },
  ];

  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [filteredFamilies, setFilteredFamilies] = useState(fontFamilies);
  const {
    styleText: { fontSize },
    setFontSize,
  } = useTextContext();
  const handleFilderBar = (text: string) => {
    let value = fontFamilies.filter((family) => {
      return family.name.toLowerCase().includes(text.toLowerCase());
    });
    setQuery(text);
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
        <div className="flex gap-x-6 rounded border border-black px-4 py-3">
          <input
            type="text"
            placeholder="Roboto"
            className="w-full  text-black"
            value={query}
            onBlur={() => setActive(false)}
            onChange={(e) => handleFilderBar(e.target.value)}
          />
          <div className="flex h-full w-fit shrink-0  items-center justify-center">
            <ChevronDownIcon
              className={clsx(
                "h-6 w-6 transition-all",
                active && " rotate-180 transform",
              )}
              onClick={() => setActive(!active)}
            />
          </div>
        </div>
        <div
          className={clsx(
            "flex max-h-36 w-full  flex-col overflow-hidden overflow-y-scroll rounded bg-white px-3 transition-all duration-500",
            active ? "my-3 h-full border border-black" : "h-0",
          )}
        >
          {filteredFamilies.map((family) => (
            <p
              key={family.id}
              className="py-3"
              onClick={() => {
                setQuery(family.name);
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
