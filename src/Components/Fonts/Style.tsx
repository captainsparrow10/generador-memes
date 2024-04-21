import { useTextContext } from "@Contexts/Text";
import React, { ChangeEvent } from "react";

/**
 * Componente para seleccionar el estilo del texto (mayúsculas, negrita, cursiva).
 * @returns {JSX.Element} El componente FontStyle.
 */
export default function FontStyle(): JSX.Element {
  const {
    updateStyleText,
    styleText: { weight, transform, style },
  } = useTextContext();

  /**
   * Maneja el cambio en los estilos del texto según la acción del usuario.
   * @param {ChangeEvent<HTMLInputElement>} e - Evento de cambio.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    switch (id) {
      case "allCaps":
        let newTransform: "uppercase" | "normal-case" = checked ? "uppercase" : "normal-case";
        updateStyleText("transform", newTransform);
        break;
      case "bold":
        let newWeight: "bold" | "normal" = checked ? "bold" : "normal";
        updateStyleText("weight", newWeight);
        break;
      case "italic":
        let newStyle: "italic" | "not-italic" = checked ? "italic" : "not-italic";
        updateStyleText("style", newStyle);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex gap-x-6">
      {/* Checkbox para estilos de texto */}
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          id="allCaps"
          checked={transform === "uppercase"}
          onChange={handleChange}
          className="accent-black"
        />
        <label htmlFor="allCaps">All Caps</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          id="bold"
          onChange={handleChange}
          checked={weight === "bold"}
          className="accent-black"
        />
        <label htmlFor="bold">Bold</label>
      </div>
      <div className="flex gap-x-2">
        <input
          type="checkbox"
          checked={style === "italic"}
          onChange={handleChange}
          id="italic"
          className="accent-black"
        />
        <label htmlFor="italic">Italic</label>
      </div>
    </div>
  );
}
