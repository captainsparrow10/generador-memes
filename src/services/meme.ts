import { memeImageType } from "@/types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  prevPage?: number
  newPreview?: Dispatch<SetStateAction<number>>
}

export const getMemeImages = async ({ prevPage = 0, newPreview }: Props): Promise<memeImageType[] | undefined> => {
  try {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    const memes = data.data.memes;
    const totalMemes = memes.length;
    let currentMemes: memeImageType[] = [];
    let nextPage = prevPage + 10
    console.log(nextPage)
    console.log(prevPage <= totalMemes)
    if (prevPage <= totalMemes) {
      if (newPreview) {
        newPreview(nextPage)
      }
      const loadNextMemes = async () => {
        const endIndex = Math.min(prevPage + nextPage, totalMemes);
        console.log(endIndex)
        const nextMemes = memes.slice(prevPage, endIndex);
        currentMemes = [...currentMemes, ...nextMemes];
        return currentMemes;
      };
      return await loadNextMemes();
    }
    return currentMemes
  } catch (error) {
    console.error('Error al obtener memes:', error);
    return undefined;
  }
};

export const getMemeImageById = async (id: string): Promise<memeImageType | undefined> => {
  try {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    const meme = data.data.memes.find((item: memeImageType) => item.id === id);
    return meme;
  } catch (error) {
    console.error('Error al obtener meme:', error);

  }
};