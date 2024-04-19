import React from 'react';
import ModalContent from './ModalContent';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { Divider } from '@Components/UI';
import { useCanvaContext } from '@Contexts/Canva';

const Modal = () => {

  const { setShowModal, showModal } =
    useCanvaContext();

  return (
    <div className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 ${showModal ? "" : "hidden"}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96 rounded-lg bg-white shadow-lg">
        <div className="relative flex items-center justify-center py-2">
          <XMarkIcon
            className="absolute left-0 top-0 ml-4 cursor-pointer py-2"
            width={24}
            onClick={() => setShowModal(false)}
          />
          <p className="font-bold">Select Image</p>
        </div>
        <Divider />
        <ModalContent />
      </div>
    </div>
  );
};

export default Modal;