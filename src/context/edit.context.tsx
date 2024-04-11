"use client";
import { memeImageType } from "@/types";
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
  saveImage: () => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  boxes: JSX.Element[];
  setBoxes: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

export const EditContext = createContext<IEditContext | undefined>(undefined);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exampleState, setExampleState] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<JSX.Element[]>([]);
  const prevTextRef = useRef<HTMLElement | null>(null);
  const [imageSelected, setImageSelected] = useState({
    id: "",
    name: "",
    url: "",
  });
  const { selectedStylesTextRef, resetState } = useTextContext();
  const handleOnMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const target = event.target as HTMLElement;

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

    const onMouseDown = (e: MouseEvent) => {
      if (e.target === prevTextRef.current) return;
      if (!prevTextRef.current) return;

      prevTextRef.current.style.backgroundColor = "transparent";
      prevTextRef.current.style.padding = "0px";
      prevTextRef.current = null;
      setText("");
      resetState()
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
    };

    canvasRef.current!.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
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
        saveImage,
        canvasRef,
        boxes,
        setBoxes,
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
