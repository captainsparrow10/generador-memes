import { StickerType, StylesType } from "@Types";
import KaisaAngry from "@Public/Stickers/kaisa-angry.png"
import KaisaSad from "@Public/Stickers/kaisa-sad.png"
import KaisaF from "@Public/Stickers/kaisa-f.png"
import KaisaLove from "@Public/Stickers/kaisa-love.png"
import ParcaHappy from "@Public/Stickers/parca-happy.png"
import ParcaAngry from "@Public/Stickers/parca-angry.png"
import ParcaSad from "@Public/Stickers/parca-angry.png"
import ParcaLove from "@Public/Stickers/parca-love.png"
import ParcaFull from "@Public/Stickers/parca-full.png"
import ParcaPeace from "@Public/Stickers/parca-peace.png"
import ParcaInLove from "@Public/Stickers/parca-in-love.png"

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

export const Stickers: StickerType[] = [
  { id: 1, image: KaisaAngry, size: 24 },
  { id: 2, image: KaisaSad, size: 24 },
  { id: 3, image: KaisaF, size: 24 },
  { id: 4, image: KaisaLove, size: 24 },
  { id: 5, image: ParcaHappy, size: 24 },
  { id: 6, image: ParcaAngry, size: 24 },
  { id: 7, image: ParcaSad, size: 24 },
  { id: 8, image: ParcaLove, size: 24 },
  { id: 9, image: ParcaFull, size: 24 },
  { id: 10, image: ParcaPeace, size: 24 },
  { id: 11, image: ParcaInLove, size: 24 }
];