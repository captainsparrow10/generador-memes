import clsx from "clsx";
import Divider from "../UI/Divider";
import { Dispatch, SetStateAction } from "react";

interface ModalOptionProps {
  active: "upload" | "url";
  label: "upload" | "url";
  dividerColor?: string;
  color?: string;
  setActive: Dispatch<SetStateAction<"upload" | "url">>;
}

const ModalOption = ({
  dividerColor,
  label,
  color,
  active,
  setActive,
}: ModalOptionProps) => {
  return (
    <div
      className={clsx(
        "cursor-pointer",
        label === active && " border-b border-black",
      )}
      onClick={() => {
        label !== active && setActive(label);
      }}
    >
      <p
        className={clsx(
          "mb-2  capitalize ",
          label === active ? "font-semibold text-black" : "text-gray-400",
        )}
      >
        {label}
      </p>
    </div>
  );
};

export default ModalOption;
