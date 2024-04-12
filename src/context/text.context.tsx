"use client";
import { styles } from "@/types";

import React, { useContext, useState, createContext, useRef } from "react";

interface ITextContext {
  styleText: styles;
  setTextStyle: (textStyle: styles["textStyle"]["style"]) => void;
  setColor: (color: styles["color"]) => void;
  setFontSize: (fontSize: styles["fontSize"]) => void;
  setFontFamily: (fontFamily: styles["fontFamily"]) => void;
  setTextTranform: (transform: styles["textStyle"]["transform"]) => void;
  setTextWeight: (weight: styles["textStyle"]["weight"]) => void;
  setStyleText: React.Dispatch<React.SetStateAction<styles>>;
  inputRefs: React.MutableRefObject<OptionTextRefs>;
  resetState: () => void;
  selectedStylesTextRef: (target: HTMLElement) => void;
}

interface OptionTextRefs {
  textTransformRef: React.MutableRefObject<HTMLInputElement | null>;
  textWeightRef: React.MutableRefObject<HTMLInputElement | null>;
  textStyleRef: React.MutableRefObject<HTMLInputElement | null>;
  textColor: React.MutableRefObject<HTMLInputElement | null>;
}
const initialState: styles = {
  textStyle: {
    transform: "normal-case",
    weight: "normal",
    style: "not-italic",
  },
  color: "#000000",
  fontSize: 16,
  fontFamily: "roboto",
};
export const TextContext = createContext<ITextContext | undefined>(undefined);

export const TextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [styleText, setStyleText] = useState<styles>(initialState);

  const setTextTranform = (transform: styles["textStyle"]["transform"]) => {
    setStyleText((prevState) => ({
      ...prevState,
      textStyle: {
        ...prevState.textStyle,
        transform,
      },
    }));
  };
  const setTextWeight = (weight: styles["textStyle"]["weight"]) => {
    setStyleText((prevState) => ({
      ...prevState,
      textStyle: {
        ...prevState.textStyle,
        weight,
      },
    }));
  };
  const setTextStyle = (style: styles["textStyle"]["style"]) => {
    setStyleText((prevState) => ({
      ...prevState,
      textStyle: {
        ...prevState.textStyle,
        style,
      },
    }));
  };
  const setColor = (color: styles["color"]) => {
    setStyleText((prevStyle) => ({
      ...prevStyle,
      color,
    }));
  };
  const setFontSize = (fontSize: styles["fontSize"]) => {
    setStyleText((prevStyle) => ({
      ...prevStyle,
      fontSize,
    }));
  };
  const setFontFamily = (fontFamily: styles["fontFamily"]) => {
    setStyleText((prevStyle) => ({
      ...prevStyle,
      fontFamily,
    }));
  };

  const inputRefs = useRef<OptionTextRefs>({
    textTransformRef: useRef<HTMLInputElement | null>(null),
    textWeightRef: useRef<HTMLInputElement | null>(null),
    textStyleRef: useRef<HTMLInputElement | null>(null),
    textColor: useRef<HTMLInputElement | null>(null)
  });

  const selectedStylesTextRef = (target: HTMLElement) => {
    target.style.backgroundColor = "white";
    if (!inputRefs.current.textStyleRef.current) return;
    inputRefs.current.textStyleRef.current.checked = !(
      target.style.textTransform === "none"
    );
    if (!inputRefs.current.textTransformRef.current) return;
    inputRefs.current.textTransformRef.current.checked = !(
      target.style.fontWeight === "400"
    );
    if (!inputRefs.current.textWeightRef.current) return;
    inputRefs.current.textWeightRef.current.checked = !(
      target.style.fontStyle === "normal"
    );
    if (!inputRefs.current.textColor.current) return;
    const rgbaColor = target.style.color 
    const rgbaArray = rgbaColor.match(/\d+/g);
    if (!rgbaArray) return
    const hexColor = "#" + ((1 << 24) + (parseInt(rgbaArray[0]) << 16) + (parseInt(rgbaArray[1]) << 8) + parseInt(rgbaArray[2])).toString(16).slice(1, 7);
    inputRefs.current.textColor.current.value = hexColor
    
    
    setStyleText({
      textStyle: {
        transform:
          target.style.textTransform === "none" ? "normal-case" : "uppercase",
        weight: target.style.fontWeight === "400" ? "normal" : "bold",
        style: target.style.fontStyle === "normal" ? "not-italic" : "italic",
      },
      color: target.style.color,
      fontSize: parseInt(target.style.fontSize.split("px")[0]),
      fontFamily: target.style.fontFamily,
    });
  };

  const resetState = () => {
    setStyleText(initialState);
    if (!inputRefs.current.textStyleRef.current) return;
    inputRefs.current.textStyleRef.current.checked = false;
    if (!inputRefs.current.textTransformRef.current) return;
    inputRefs.current.textTransformRef.current.checked = false;
    if (!inputRefs.current.textWeightRef.current) return;
    inputRefs.current.textWeightRef.current.checked = false;
    if (!inputRefs.current.textColor.current) return;
    inputRefs.current.textColor.current.value = '#000000';
  };

  return (
    <TextContext.Provider
      value={{
        styleText,
        setTextStyle,
        setColor,
        setFontSize,
        setFontFamily,
        setTextTranform,
        setTextWeight,
        setStyleText,
        inputRefs,
        selectedStylesTextRef,
        resetState,
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
