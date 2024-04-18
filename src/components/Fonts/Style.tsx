import { useTextContext } from "@Contexts/Text";
import React, { ChangeEvent } from "react";

export default function FontStyle() {
  const {
    setTextTranform,
    setTextWeight,
    setTextStyle,
    inputRefs,
    styleText: {
      textStyle: { weight, transform, style },
    },
  } = useTextContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    switch (id) {
      case "allCaps":
        let newTranform: "uppercase" | "normal-case" = checked
          ? "uppercase"
          : "normal-case";

        setTextTranform(newTranform);
        break;
      case "bold":
        let newWeight: "bold" | "normal" = checked ? "bold" : "normal";
        setTextWeight(newWeight);
        break;
      case "italic":
        let newStyle: "italic" | "not-italic" = checked
          ? "italic"
          : "not-italic";
        setTextStyle(newStyle);
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
          ref={inputRefs.current.textTransformRef}
          onChange={handleChange}
          className=" accent-black"
        />
        <label htmlFor="allCaps">All Caps</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          id="bold"
          ref={inputRefs.current.textWeightRef}
          onChange={handleChange}
          checked={weight === "bold"}
          className=" accent-black"
        />
        <label htmlFor="bold">Bold</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          ref={inputRefs.current.textStyleRef}
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
