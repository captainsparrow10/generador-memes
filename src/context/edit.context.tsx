"use client";
import { StickerType, memeImageType } from "@/types";
import { StaticImageData } from "next/image";
import download from "downloadjs";
import { toPng } from "html-to-image";
import React, {
  useContext,
  useState,
  createContext,
  useRef,
  Ref,
  MutableRefObject,
} from "react";
import { useTextContext } from "./text.context";

interface IEditContext {
  exampleState: string;
  setExampleState: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  prevTextRef: MutableRefObject<HTMLElement | null>;
  imageSelected: memeImageType;
  setImageSelected: React.Dispatch<React.SetStateAction<memeImageType>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleOnMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleOnTouchStart: (event: React.TouchEvent<HTMLDivElement>) => void;
  saveImage: () => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  boxes: JSX.Element[];
  setBoxes: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
  imageRef: React.RefObject<HTMLImageElement>;
  resetEdit: () => void;
  modeEdit: "text" | "sticker";
  setModeEdit: React.Dispatch<React.SetStateAction<"text" | "sticker">>;
  stickerSelected: {
    url: string;
    size: number;
  };
  setStickerSelected: React.Dispatch<
    React.SetStateAction<{
      url: string;
      size: number;
    }>
  >;
  colorValue: string
  setColorValue: React.Dispatch<React.SetStateAction<string>>
  opacity: number
  setOpacity: React.Dispatch<React.SetStateAction<number>>
}

export const EditContext = createContext<IEditContext | undefined>(undefined);

export const initialStickerState = {
  url: "",
  size: 0,
};

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exampleState, setExampleState] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [boxes, setBoxes] = useState<JSX.Element[]>([]);
  const [modeEdit, setModeEdit] = useState<"text" | "sticker">("text");
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const prevTextRef = useRef<HTMLElement | null>(null);
  const [imageSelected, setImageSelected] = useState({
    id: "",
    name: "",
    url: "",
  });
  const [colorValue, setColorValue] = useState<string>("#000000");
  const [opacity, setOpacity] = useState<number>(0);

  const [stickerSelected, setStickerSelected] = useState(initialStickerState);
  const { selectedStylesTextRef, resetState } = useTextContext();

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
      setText(target.textContent!);

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
    document.documentElement.style.overflow ="hidden"

    const touch = event.touches[0];
    const target = event.target as HTMLElement;
    const tag = target.getAttribute("data-tag");
    

    const mode = tag === "sticker" ? "sticker" : "text";
    setModeEdit(mode);

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
    setText(target.textContent!);

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
      document.documentElement.style.overflow =""
    };

    
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

  };

  const saveImage = () => {
    if (!canvasRef.current) return;
    if (prevTextRef.current) {
      prevTextRef.current.style.backgroundColor = "transparent";
    }
    toPng(canvasRef.current).then((dataUrl) => {
      download(dataUrl, "custom-image.png");
    });
  };

  const resetEdit = () => {
    setText("");
    prevTextRef.current = null;
    if (!imageRef.current) return;
    imageRef.current.style.opacity = "0";
    imageRef.current.style.backgroundColor = "#000000";
    setOpacity(0)
    setColorValue('#000000')
  };

  return (
    <EditContext.Provider
      value={{
        exampleState,
        setExampleState,
        showModal,
        setShowModal,
        text,
        setText,
        prevTextRef,
        imageSelected,
        setImageSelected,
        fileInputRef,
        handleOnMouseDown,
        handleOnTouchStart,
        saveImage,
        canvasRef,
        boxes,
        setBoxes,
        imageRef,
        resetEdit,
        modeEdit,
        setModeEdit,
        setStickerSelected,
        stickerSelected,
        colorValue,
        opacity,
        setColorValue,
        setOpacity
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = (): IEditContext => {
  const context = useContext(EditContext);

  if (context === undefined) {
    throw new Error("EditProvider must be used within a EditProvider");
  }

  return context;
};
