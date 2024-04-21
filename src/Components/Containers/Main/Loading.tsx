import { CircularProgress } from "@mui/material";
import React from "react";

/**
 * Componente de carga que muestra una animación de carga mientras se espera la carga de datos.
 * @param {number} length - La longitud de los elementos cargados.
 * @returns {JSX.Element} El componente de carga.
 */
type Props = {
  length: number; // La longitud de los elementos cargados
};

export default function Loading({ length }: Props): JSX.Element {
  return (
    <>
      {/* Grid para mostrar la animación de carga cuando no hay elementos cargados */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {length <= 0 &&
          Array.from(Array(25).keys()).map((i) => (
            <div
              className="mb-4 h-[275px] w-full animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-gray-300 p-2 sm:h-[350px] lg:h-[400px]"
              key={i}
            ></div>
          ))}
      </div>
      {/* Mostrar el CircularProgress cuando hay elementos cargados */}
      {length > 0 && (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
}
