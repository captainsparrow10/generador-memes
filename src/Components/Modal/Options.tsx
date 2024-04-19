import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

interface ModalOptionProps {
  active: "upload" | "url";
  label: "upload" | "url";
  setActive: Dispatch<SetStateAction<"upload" | "url">>;
}

const ModalOption = ({ label, active, setActive }: ModalOptionProps) => {
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
