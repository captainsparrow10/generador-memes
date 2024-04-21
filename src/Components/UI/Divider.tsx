import clsx from "clsx";

// Definir las propiedades que puede recibir el componente DividerUI
interface DividerProps {
  color?: string; // Color del divisor
  height?: string; // Altura del divisor
}

// Definir el componente DividerUI con las propiedades especificadas
const DividerUI = ({ color, height }: DividerProps) => {
  return (
    <div
      className={clsx(
        color ? `bg-${color}` : "bg-gray-300",
        height ? `h-[${height}px]` : "h-[0.1px]",
      )}
    ></div>
  );
};

export default DividerUI;
