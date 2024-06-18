"use client";
import { FilterImageType, MemeImageType } from "@Types";
import React, { useContext, useState, createContext, useRef } from "react";
import { useTextContext } from "@Contexts/Text";
import { initialFilterImageState, initialImageState } from "@Utils/Const";

interface ICanvaContext {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  imageSelected: MemeImageType;
  setImageSelected: React.Dispatch<React.SetStateAction<MemeImageType>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleOnMouseDown: (event: MouseEvent) => void;
  handleStickerOnMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleOnTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  boxes: JSX.Element[];
  setBoxes: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  imageRef: React.RefObject<HTMLImageElement>;
  resetEdit: () => void;
  filterImage: {
    color: string;
    opacity: number;
  };
  setFilterImage: React.Dispatch<
    React.SetStateAction<{
      color: string;
      opacity: number;
    }>
  >;
  opacity: number;
  setOpacity: React.Dispatch<React.SetStateAction<number>>;
  updateFilterImage: (
    property: keyof FilterImageType,
    value: FilterImageType[typeof property],
  ) => void;
  resetFilter : () => void
}

// Crear el contexto de Canva
export const CanvaContext = createContext<ICanvaContext | undefined>(undefined);

// Proveedor del contexto de Canva
export const CanvaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false); // Estado del modal
  const [boxes, setBoxes] = useState<JSX.Element[]>([]); // Elementos en el canvas
  const imageRef = useRef<HTMLImageElement>(null); // Referencia a la imagen
  const fileInputRef = useRef<HTMLInputElement>(null); // Referencia al input de archivos
  const canvasRef = useRef<HTMLDivElement>(null);  // Referencia al canvas

  // Estado y funciones de edición y filtros de imagen
  const [imageSelected, setImageSelected] =
    useState<MemeImageType>(initialImageState); 
  const [filterImage, setFilterImage] = useState(initialFilterImageState); // Filtros de imagen
  const [opacity, setOpacity] = useState(0); // Opacidad de la imagen
  const {
    selectedStylesTextRef,
    setModeEdit,
    prevTextRef,
    setStickerSelected,
  } = useTextContext(); // Hooks del contexto de texto


 /**
   * Maneja el evento de clic del mouse en el canvas.
   * @param {React.MouseEvent<HTMLDivElement>} event - Evento del clic.
   */
  const handleStickerOnMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const tag = target.getAttribute("data-tag");
    const mode = tag === "sticker" ? "sticker" : "text";
    setModeEdit(mode);
    if (target && target.tagName === "IMG") {
      const imgElement = target as HTMLImageElement;
      setStickerSelected({
        url: imgElement.src,
        size: imgElement.width,
      });
    }

    if (event.nativeEvent instanceof MouseEvent) {
      const offsetX = event.nativeEvent.offsetX;
      const offsetY = event.nativeEvent.offsetY;

      if (prevTextRef.current === null) {
        prevTextRef.current = target;
      }

      if (prevTextRef.current && prevTextRef.current !== target) {
        prevTextRef.current.style.backgroundColor = "transparent";
        prevTextRef.current = target;
      }

      selectedStylesTextRef(target, target.tagName);

      const onMouseMove = (e: MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const newX = e.clientX - rect.left - offsetX;
        const newY = e.clientY - rect.top - offsetY;

        const maxX = rect.width - target.clientWidth;
        const maxY = rect.height - target.clientHeight;

        const boundedX = Math.max(0, Math.min(newX, maxX));
        const boundedY = Math.max(0, Math.min(newY, maxY));

        target.style.left = `${boundedX}px`;
        target.style.top = `${boundedY}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      return;
    }
  };

  const handleOnMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    let target = event.target as HTMLElement;
    const tag = target.getAttribute("data-tag");
    const mode = tag === "sticker" ? "sticker" : "text";
    setModeEdit(mode);
    if (target && target.tagName === "IMG") {
      const imgElement = target as HTMLImageElement;
      setStickerSelected({
        url: imgElement.src,
        size: imgElement.width,
      });
    }

    if(target.tagName === "P" && target.parentElement) {
      target = target.parentElement
    }
      if (prevTextRef.current === null) {
        prevTextRef.current = target;
      }

      if (prevTextRef.current && prevTextRef.current !== target) {
        prevTextRef.current.style.backgroundColor = "green";
        prevTextRef.current = target;
      }

      
      selectedStylesTextRef(target, target.tagName);

      const onMouseUp = () => {
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mouseup", onMouseUp);
      return;

  };

  /**
   * Maneja el evento de inicio de toque en el canvas.
   * @param {React.TouchEvent<HTMLDivElement>} event - Evento de toque.
   */
  const handleOnTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    document.documentElement.style.overflow = "hidden";

    const touch = event.touches[0];
    const target = event.target as HTMLElement;
    const tag = target.getAttribute("data-tag");

    const mode = tag === "sticker" ? "sticker" : "text";
    setModeEdit(mode);
    if (target && target.tagName === "IMG") {
      const imgElement = target as HTMLImageElement;
      setStickerSelected({
        url: imgElement.src,
        size: imgElement.width,
      });
    }

    const offsetX = touch.clientX - target.getBoundingClientRect().left;
    const offsetY = touch.clientY - target.getBoundingClientRect().top;

    if (prevTextRef.current === null) {
      prevTextRef.current = target;
    }

    if (prevTextRef.current && prevTextRef.current !== target) {
      prevTextRef.current.style.backgroundColor = "transparent";
      prevTextRef.current = target;
    }

    selectedStylesTextRef(target, target.tagName);

    const onTouchMove = (e: TouchEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const newX = e.touches[0].clientX - rect.left - offsetX;
      const newY = e.touches[0].clientY - rect.top - offsetY;

      const maxX = rect.width - target.clientWidth;
      const maxY = rect.height - target.clientHeight;

      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));

      target.style.left = `${boundedX}px`;
      target.style.top = `${boundedY}px`;
    };

    const onTouchEnd = () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.documentElement.style.overflow = "";
    };

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  };

   /**
   * Actualiza una propiedad del filtro de imagen.
   * @param {keyof FilterImageType} property - Propiedad a actualizar.
   * @param {FilterImageType[typeof property]} value - Nuevo valor de la propiedad.
   */
  const updateFilterImage = (
    property: keyof FilterImageType,
    value: FilterImageType[typeof property],
  ) => {
    setFilterImage((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

    /**
   * Restablece la configuración de edición en el canvas.
   */
  const resetEdit = () => {
    prevTextRef.current = null;
    if (!imageRef.current) return;
    setFilterImage(initialFilterImageState);
    imageRef.current.style.opacity = filterImage.opacity.toString();
    imageRef.current.style.backgroundColor = filterImage.color;
  };

   /**
   * Restablece la configuración del filtro de imagen.
   */
  const resetFilter = () => {
    setFilterImage(initialFilterImageState)
    setOpacity(0)
  }

  return (
    <CanvaContext.Provider
      value={{
        updateFilterImage,
        handleStickerOnMouseDown,
        showModal,
        setShowModal,
        imageSelected,
        setImageSelected,
        fileInputRef,
        handleOnMouseDown,
        handleOnTouchStart,
        canvasRef,
        boxes,
        setBoxes,
        imageRef,
        resetEdit,
        filterImage,
        setFilterImage,
        opacity,
        setOpacity,
        resetFilter
      }}
    >
      {children}
    </CanvaContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de Canva
export const useCanvaContext = (): ICanvaContext => {
  const context = useContext(CanvaContext);

  if (context === undefined) {
    throw new Error("EditProvider must be used within a EditProvider");
  }

  return context;
};
