import React, { useState } from 'react';
import UploadImage from './UploadImage';
import { useCanvaContext } from '@Contexts/Canva';
import AddImageUrl from './AddImage';
import ModalOption from './ModalOptions';

const ModalContent = () => {

  const [active, setActive] = useState<"upload" | "url">("upload");

  return (
    <div className="p-4">
      <div className="flex justify-center gap-x-3 pb-2">
        <ModalOption label="upload" active={active} setActive={setActive} />
        <ModalOption label="url" active={active} setActive={setActive} />
      </div>
      {active === 'upload' ? <UploadImage /> : <AddImageUrl />}
    </div>
  );
};

export default ModalContent;