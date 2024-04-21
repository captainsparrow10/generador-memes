import { useTextContext } from '@Contexts/Text';
import { initialStickerState } from '@Utils/Const';
import React from 'react';

const useSticker = () => {
  const {
    prevTextRef,
    setStickerSelected,
  } = useTextContext();

  // Función para eliminar el sticker seleccionado
  /**
   * Elimina el sticker seleccionado si existe y reinicia su estado.
   */
  const deleteSticker = () => {
    if (!prevTextRef.current) return;
    if (prevTextRef.current.nodeName !== "IMG") return;

    const elementToRemove = prevTextRef.current;
    prevTextRef.current.parentNode?.removeChild(elementToRemove);
    prevTextRef.current = null;
    setStickerSelected(initialStickerState);
  };

  // Función para editar el tamaño del sticker
  /**
   * Edita el tamaño del sticker seleccionado si es una imagen.
   * @param e - Evento de cambio en el input para editar el tamaño.
   */
  const editSticker = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!prevTextRef.current) return;
    if (prevTextRef.current.nodeName !== "IMG") return;
    setStickerSelected((prevState) => ({
      ...prevState,
      size: parseInt(e.target.value),
    }));
    prevTextRef.current.style.width = `${e.target.value}px`;
    prevTextRef.current.style.height = `${e.target.value}px`;
  };

  return {
    deleteSticker,
    editSticker
  };
};

export default useSticker;
