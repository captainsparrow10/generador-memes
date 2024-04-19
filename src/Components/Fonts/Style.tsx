import { useTextContext } from "@Contexts/Text";
import React, { ChangeEvent } from "react";

export default function FontStyle() {
  const {
    updateStyleText,
    styleText: { weight, transform, style },
  } = useTextContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    switch (id) {
      case "allCaps":
        let newTranform: "uppercase" | "normal-case" = checked
          ? "uppercase"
          : "normal-case";
        updateStyleText("transform", newTranform);
        break;
      case "bold":
        let newWeight: "bold" | "normal" = checked ? "bold" : "normal";
        updateStyleText("weight", newWeight);
        break;
      case "italic":
        let newStyle: "italic" | "not-italic" = checked
          ? "italic"
          : "not-italic";
        updateStyleText("style", newStyle);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex gap-x-6">
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          id="allCaps"
          checked={transform === "uppercase"}
          onChange={handleChange}
          className=" accent-black"
        />
        <label htmlFor="allCaps">All Caps</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          id="bold"
          onChange={handleChange}
          checked={weight === "bold"}
          className=" accent-black"
        />
        <label htmlFor="bold">Bold</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          checked={style === "italic"}
          onChange={handleChange}
          id="italic"
          className=" accent-black"
        />
        <label htmlFor="italic">Italic</label>
      </div>
    </div>
  );
}
