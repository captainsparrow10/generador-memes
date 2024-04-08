'use client'
import { memeImageType } from "@/types";
import React, { useContext, useState, createContext, useRef, Ref, MutableRefObject } from "react";

interface IEditContext {
  exampleState: string;
  setExampleState: React.Dispatch<React.SetStateAction<string>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  text: string
  setText:  React.Dispatch<React.SetStateAction<string>>;
  prevTextRef: MutableRefObject<HTMLElement | null>
  imageSelected: memeImageType;
  setImageSelected: React.Dispatch<React.SetStateAction<memeImageType >>;
  fileInputRef:  React.RefObject<HTMLInputElement>
}

export const EditContext = createContext<IEditContext | undefined>(undefined);

export const EditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [exampleState, setExampleState] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false)
  const [text, setText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const prevTextRef = useRef<HTMLElement | null>(null);
  const [imageSelected, setImageSelected] = useState({id: '',
    name: '',
    url: ''});

  return (
    <EditContext.Provider value={{ exampleState, setExampleState, showModal, setShowModal, text, setText, prevTextRef, imageSelected, setImageSelected, fileInputRef}}>
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