"use client";
import { StylesType } from "@Types";
import { initialStickerState, initialTextState } from "@Utils/Const";

import React, {
  useContext,
  useState,
  createContext,
  useRef,
  MutableRefObject,
} from "react";

interface ITextContext {
  styleText: StylesType;
  setStyleText: React.Dispatch<React.SetStateAction<StylesType>>;
  inputRefs: React.MutableRefObject<OptionTextRefs>;
  resetTextState: () => void;
  selectedStylesTextRef: (target: HTMLElement) => void;
  updateStyleText: (
    property: keyof StylesType,
    value: StylesType[typeof property],
  ) => void;
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
  prevTextRef: MutableRefObject<HTMLElement | null>;
  resetSticker: () => void;
}

interface OptionTextRefs {
  textColor: React.MutableRefObject<HTMLInputElement | null>;
}

export const TextContext = createContext<ITextContext | undefined>(undefined);

export const TextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [styleText, setStyleText] = useState<StylesType>(initialTextState);
  const prevTextRef = useRef<HTMLElement | null>(null);
  const [modeEdit, setModeEdit] = useState<"text" | "sticker">("text");
  const [stickerSelected, setStickerSelected] = useState(initialStickerState);
  const inputRefs = useRef<OptionTextRefs>({
    textColor: useRef<HTMLInputElement | null>(null),
  });

  const updateStyleText = (
    property: keyof StylesType,
    value: StylesType[typeof property],
  ) => {
    setStyleText((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const selectedStylesTextRef = (target: HTMLElement) => {
    target.style.backgroundColor = "white";
    if (!inputRefs.current.textColor.current) return;
    const rgbaColor = target.style.color;
    const rgbaArray = rgbaColor.match(/\d+/g);
    if (!rgbaArray) return;
    const hexColor =
      "#" +
      (
        (1 << 24) +
        (parseInt(rgbaArray[0]) << 16) +
        (parseInt(rgbaArray[1]) << 8) +
        parseInt(rgbaArray[2])
      )
        .toString(16)
        .slice(1, 7);
    inputRefs.current.textColor.current.value = hexColor;

    setStyleText({
      text: target.textContent!,
      transform:
        target.style.textTransform === "none" ? "normal-case" : "uppercase",
      weight: target.style.fontWeight === "400" ? "normal" : "bold",
      style: target.style.fontStyle === "normal" ? "not-italic" : "italic",
      color: target.style.color,
      fontSize: parseInt(target.style.fontSize.split("px")[0]),
      fontFamily: target.style.fontFamily,
    });
  };

  const resetTextState = () => {
    setStyleText(initialTextState);
  };

  const resetSticker = () => {
    setStickerSelected(initialStickerState);
  };

  return (
    <TextContext.Provider
      value={{
        styleText,
        setStyleText,
        updateStyleText,
        inputRefs,
        selectedStylesTextRef,
        stickerSelected,
        setStickerSelected,
        modeEdit,
        setModeEdit,
        prevTextRef,
        resetTextState,
        resetSticker,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

export const useTextContext = (): ITextContext => {
  const context = useContext(TextContext);

  if (context === undefined) {
    throw new Error("EditProvider must be used within a EditProvider");
  }

  return context;
};
