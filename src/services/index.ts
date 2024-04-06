import { memeImageType } from "@/types";

export const getMemeImages = async (): Promise<memeImageType[] | undefined> => {
  try {
    const response = await fetch('https://api.imgflip.com/get_memes');
    const data = await response.json();
    const meme = data.data.memes
    return meme;
  } catch (error) {
    console.error('Error al obtener meme:', error);

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