import clsx from "clsx";

interface DividerProps {
  color?: string;
  height?: string;
}

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
