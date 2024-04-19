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
  handleOnMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
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
  updateFilterImage: (
    property: keyof FilterImageType,
    value: FilterImageType[typeof property],
  ) => void;
}

export const CanvaContext = createContext<ICanvaContext | undefined>(undefined);

export const CanvaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<JSX.Element[]>([]);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [imageSelected, setImageSelected] =
    useState<MemeImageType>(initialImageState);
  const [filterImage, setFilterImage] = useState(initialFilterImageState);
  const {
    selectedStylesTextRef,
    setModeEdit,
    prevTextRef,
    setStickerSelected,
  } = useTextContext();

  const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
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

      selectedStylesTextRef(target);

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

    selectedStylesTextRef(target);

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

  const updateFilterImage = (
    property: keyof FilterImageType,
    value: FilterImageType[typeof property],
  ) => {
    setFilterImage((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const resetEdit = () => {
    prevTextRef.current = null;
    if (!imageRef.current) return;
    setFilterImage(initialFilterImageState);
    imageRef.current.style.opacity = filterImage.opacity.toString();
    imageRef.current.style.backgroundColor = filterImage.color;
  };

  return (
    <CanvaContext.Provider
      value={{
        updateFilterImage,
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
      }}
    >
      {children}
    </CanvaContext.Provider>
  );
};

export const useCanvaContext = (): ICanvaContext => {
  const context = useContext(CanvaContext);

  if (context === undefined) {
    throw new Error("EditProvider must be used within a EditProvider");
  }

  return context;
};
