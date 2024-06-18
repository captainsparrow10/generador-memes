import { useTextContext } from "@Contexts/Text";
import React from "react";

/**
 * Componente para seleccionar el estilo del texto (mayúsculas, negrita, cursiva).
 * @returns {JSX.Element} El componente FontStyle.
 */
export default function FontAlign(): JSX.Element {
  const {
    updateStyleText,
    styleText: { align },
  } = useTextContext();

  const handleAlignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    updateStyleText("align", value);
  };

  return (
    <div className="gap-x3 flex">
      <p>Alineamiento del texto: </p>
      <div className="flex gap-x-2">
        <select defaultValue={align} value={align} onChange={(e) => handleAlignChange(e)}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
    </div>
  );
}
