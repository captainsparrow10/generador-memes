"use client";
import { memeImageType, styles } from "@/types";
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

interface ITextContext {
  styleText: styles;
  setTextStyle: (textStyle: styles["textStyle"]) => void;
  setColor: (color: styles["color"]) => void;
  setFontSize: (fontSize: styles["fontSize"]) => void;
  setFontFamily: (fontFamily: styles["fontFamily"]) => void;
}

export const TextContext = createContext<ITextContext | undefined>(undefined);

export const TextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [styleText, setStyleText] = useState<styles>({
    textStyle: "none",
    color: "#000000",
    fontSize: 16,
    fontFamily: "Roboto",
  });
  const setTextStyle = (textStyle: styles["textStyle"]) => {
    setStyleText((prevStyle) => ({
      ...prevStyle,
      textStyle,
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

  return (
    <TextContext.Provider
      value={{
        styleText,
        setTextStyle,
        setColor,
        setFontSize,
        setFontFamily,
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
