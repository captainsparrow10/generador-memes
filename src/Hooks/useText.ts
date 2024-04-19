import { useCanvaContext } from "@Contexts/Canva";
import { useTextContext } from "@Contexts/Text";

const useText = () => {
  const {
    setBoxes,
  } = useCanvaContext();

  const {
    styleText: {
      transform, style, weight,
      fontFamily,
      fontSize,
      color,
      text
    },
    setStyleText,
    resetTextState,
    prevTextRef,
  } = useTextContext();



  const editText = () => {
    if (prevTextRef.current) {
      setStyleText({
        text: prevTextRef.current.textContent!,
        transform:
          prevTextRef.current.style.textTransform === "none"
            ? "normal-case"
            : "uppercase",
        weight:
          prevTextRef.current.style.fontWeight === "400" ? "normal" : "bold",
        style:
          prevTextRef.current.style.fontStyle === "normal"
            ? "not-italic"
            : "italic",

        color: prevTextRef.current.style.color,
        fontSize: parseInt(prevTextRef.current.style.fontSize.split("px")[0]),
        fontFamily: prevTextRef.current.style.fontFamily,
      });
      prevTextRef.current.textContent = text;
      prevTextRef.current.style.backgroundColor = "transparent";
      prevTextRef.current.style.textTransform =
        transform === "normal-case" ? "none" : "uppercase";
      prevTextRef.current.style.fontWeight =
        weight === "normal" ? "400" : "700";
      prevTextRef.current.style.fontSize = `${fontSize}px`;
      prevTextRef.current.style.fontStyle =
        style === "not-italic" ? "normal" : "italic";
      prevTextRef.current.style.fontFamily = fontFamily;
      prevTextRef.current.style.color = color;
      prevTextRef.current = null;
      resetTextState();
      return;
    }
  };
  const createText = (newText: JSX.Element) => {
    setBoxes((prevText) => [...prevText, newText]);
    resetTextState();
  }

  const deleteText = () => {
    if (!prevTextRef.current) return;
    if (prevTextRef.current.nodeName !== "DIV") return;
    const elementToRemove = prevTextRef.current;
    prevTextRef.current.parentNode?.removeChild(elementToRemove);
    prevTextRef.current = null;
    resetTextState();
  };





  return {
    editText,
    createText,
    deleteText,
  };
}


export default useText;