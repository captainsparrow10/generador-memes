import React, { useState } from 'react';
import UploadImage from './UploadImage'; 
import AddImageUrl from './AddImage'; 
import ModalOption from './ModalOptions'; 

const ModalContent = () => {
  const [active, setActive] = useState<"upload" | "url">("upload"); // Estado para controlar la sección activa

  return (
    <div className="p-4">
      {/* Selector de opciones: subir imagen o agregar URL */}
      <div className="flex justify-center gap-x-3 pb-2">
        <ModalOption label="upload" active={active} setActive={setActive} />
        <ModalOption label="url" active={active} setActive={setActive} />
      </div>
      {/* Renderizar el componente correspondiente según la opción activa */}
      {active === 'upload' ? <UploadImage /> : <AddImageUrl />}
    </div>
  );
};

export default ModalContent;
