import React, { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

// Propiedades esperadas por el componente
interface ModalOptionProps {
  active: "upload" | "url"; // Estado activo actual
  label: "upload" | "url"; // Etiqueta para mostrar en el componente
  setActive: Dispatch<SetStateAction<"upload" | "url">>; // Función para cambiar el estado activo
}

const ModalOption = ({ label, active, setActive }: ModalOptionProps) => {
  // Manejar el clic en la opción
  const handleClick = () => {
    if (label !== active) {
      setActive(label); // Cambiar el estado activo al hacer clic en una opción diferente
    }
  };

  return (
    <div
      className={clsx(
        'cursor-pointer',
        label === active && 'border-b-2 border-black', // Aplicar borde inferior si está activo
        'mb-2 capitalize', // Convertir el texto a mayúsculas para mostrar
        label === active ? 'font-semibold text-black' : 'text-gray-400', // Cambiar estilo según la activación
      )}
      onClick={handleClick} // Manejar clic en la opción
    >
      {label} {/* Mostrar la etiqueta de la opción */}
    </div>
  );
};

export default ModalOption;
