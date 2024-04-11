import { useTextContext } from "@/context/text.context";
import React, { ChangeEvent } from "react";

export default function FontStyle() {
  const { setTextTranform, setTextWeight, setTextStyle, inputRefs } =
    useTextContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    switch (id) {
      case "allCaps":
        const newTranform = checked ? "uppercase" : "normal-case";
        setTextTranform(newTranform);
        break;
      case "bold":
        const newWeight = checked ? "bold" : "normal";
        setTextWeight(newWeight);
        break;
      case "italic":
        const newStyle = checked ? "italic" : "not-italic";
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
          className=" accent-black"
        />
        <label htmlFor="bold">Bold</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          ref={inputRefs.current.textStyleRef}
          onChange={handleChange}
          id="italic"
          className=" accent-black"
        />
        <label htmlFor="italic">Italic</label>
      </div>
    </div>
  );
}
