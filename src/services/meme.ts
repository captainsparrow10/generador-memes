import { memeImageType } from "@/types";

export const getMemeImages = async (
  start: number,
  end: number,
): Promise<memeImageType[] | undefined> => {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    const memes: memeImageType[] = data.data.memes;
    const totalMemes = memes.length;
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (totalMemes >= end) {
      return memes.slice(start, end);
    }
  } catch (error) {
    console.error("Error al obtener memes:", error);
    return undefined;
  }
};

export const getMemeImageById = async (id: string): Promise<memeImageType | undefined> => {
  try {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    const meme = data.data.memes.find((item: memeImageType) => item.id === id);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return meme;
  } catch (error) {
    console.error('Error al obtener meme:', error);

  }
};