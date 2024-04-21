import clsx from "clsx";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode; // Contenido dentro del botón
  variant?: "primary" | "secondary"; // Variante del botón
  props?: string; // Propiedades adicionales para el botón
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void; // Manejador del evento onClick
};

export default function ButtonUI({
  children,
  variant = "primary",
  onClickHandler,
}: Props) {
  return (
    <button
      className={clsx(
        "flex w-full justify-center rounded border px-4 py-3",
        variant === "primary" &&
          "border-black bg-black text-white hover:bg-white hover:text-black",
        variant === "secondary" &&
          "border-gray-300 text-black hover:border-black",
      )}
      onClick={onClickHandler} // Manejador de evento onClick
    >
      {children} {/* Contenido del botón */}
    </button>
  );
}
