import { StylesType } from "@Types";


export const fontFamilies = [
  { id: 1, name: "serif" },
  { id: 2, name: "sans-serif" },
  { id: 3, name: "monospace" },
  { id: 4, name: "cursive" },
  { id: 5, name: "fantasy" },
  { id: 6, name: "system-ui" },
  { id: 7, name: "ui-serif" },
  { id: 8, name: "ui-sans-serif" },
  { id: 9, name: "ui-monospace" },
  { id: 10, name: "ui-rounded" },
  { id: 11, name: "emoji" },
  { id: 12, name: "math" },
  { id: 13, name: "fangsong" },
  { id: 14, name: "roboto" },
];
export const initialTextState: StylesType = {
  text: "",
  transform: "normal-case",
  weight: "normal",
  style: "not-italic",
  color: "#000000",
  fontSize: 16,
  fontFamily: "roboto",
};

export const initialStickerState = {
  url: "",
  size: 0,
};

export const initialFilterImageState = {
  color: "#000000",
  opacity: 0
}

export const initialImageState = {
  id: "",
  name: "",
  url: "",
}