import { styles } from "@/types";
import React, { ChangeEvent, useState } from "react";

type Props = {
  changeStyleFont: (textStyle: styles["textStyle"]) => void;
};
export default function FontStyle({ changeStyleFont }: Props) {
  const [style, setStyle] = useState<styles["textStyle"]>("none");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      value === "italic" ||
      value === "capitalize" ||
      value === "font-bold" ||
      value === "none"
    ) {
      setStyle(value);
      changeStyleFont(value);
    }
  };
  return (
    <div className="flex gap-x-6">
      <div className="flex gap-x-2">
        <input
          type="radio"
          id="none"
          name="formatting"
					value="none"
          checked={style === "none"}
          onChange={handleChange}
          className=" accent-black"
        />
        <label htmlFor="none">None</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="radio"
          id="allCaps"
					value="capitalize"
          checked={style === "capitalize"}
          onChange={handleChange}
          name="formatting"
          className=" accent-black"
        />
        <label htmlFor="allCaps">All Caps</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="radio"
          id="bold"
					value="font-bold"
          checked={style === "font-bold"}
          onChange={handleChange}
          name="formatting"
          className=" accent-black"
        />
        <label htmlFor="bold">Bold</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="radio"
					value="italic"
          checked={style === "italic"}
          onChange={handleChange}
					id="italic"
          name="formatting"
          className=" accent-black"
        />
        <label htmlFor="italic">Italic</label>
      </div>
    </div>
  );
}
