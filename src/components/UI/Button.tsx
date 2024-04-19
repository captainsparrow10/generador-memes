import clsx from "clsx";
import React, { ReactNode } from "react";
type Props = {
  children?: ReactNode;
  variant?: "primary" | "secondary";
  props?: string;
  onClickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function ButtonUI({
  children,
  variant = "primary",
  onClickHandler,
  props,
}: Props) {
  return (
    <button
      className={clsx(
        "flex w-full justify-center rounded border px-4 py-3",
        props,
        variant === "primary" &&
          "border-black bg-black text-white hover:bg-white hover:text-black",
        variant === "secondary" &&
          "border-gray-300 text-black hover:border-black ",
      )}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}
