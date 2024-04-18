import { initialStickerState, useEditContext } from '@Contexts/Edit';
import React from 'react'

const useSticker = () => {
  const {
    prevTextRef,
    setStickerSelected,
  } = useEditContext();



  const deleteSticker = () => {
    if (!prevTextRef.current) return;
    if (prevTextRef.current.nodeName !== "IMG") return;

    const elementToRemove = prevTextRef.current;
    prevTextRef.current.parentNode?.removeChild(elementToRemove);
    prevTextRef.current = null;
    setStickerSelected(initialStickerState);
  };


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
    deleteSticker, editSticker
  }
}

export default useSticker