import { useCanvaContext } from "@Contexts/Canva";
import { useTextContext } from "@Contexts/Text";
import download from "downloadjs";
import { toPng } from "html-to-image";

const {
  setBoxes,
  resetEdit,
  canvasRef,
} = useCanvaContext();

const { prevTextRef, resetSticker, resetTextState } = useTextContext()

const saveImage = () => {
  if (!canvasRef.current) return;
  if (prevTextRef.current) {
    prevTextRef.current.style.backgroundColor = "transparent";
  }
  toPng(canvasRef.current).then((dataUrl) => {
    download(dataUrl, "custom-image.png");
  });
};

const handlerClear = () => {
  setBoxes([]);
  resetTextState();
  resetEdit();
  resetSticker()
};

const hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const redirectTo = (path: string) => {
  window.location.href = path;
};

export { saveImage, handlerClear, hexToRgba, redirectTo }