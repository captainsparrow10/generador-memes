import React, { Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

interface ModalOptionProps {
  active: "upload" | "url";
  label: "upload" | "url";
  setActive: Dispatch<SetStateAction<"upload" | "url">>;
}

const ModalOption = ({ label, active, setActive }: ModalOptionProps) => {
  const handleClick = () => {
    if (label !== active) {
      setActive(label);
    }
  };

  return (
    <div
      className={clsx(
        'cursor-pointer',
        label === active && 'border-b-2 border-black',
        'mb-2 capitalize',
        label === active ? 'font-semibold text-black' : 'text-gray-400',
      )}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

export default ModalOption;
