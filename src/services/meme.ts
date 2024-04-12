import { memeImageType } from "@/types";

import KaisaAngry from "@public/sticker/kaisa-angry.png"
import KaisaSad from "@public/sticker/kaisa-sad.png"
import KaisaF from "@public/sticker/kaisa-f.png"
import KaisaLove from "@public/sticker/kaisa-love.png"
import ParcaHappy from "@public/sticker/parca-happy.png"
import ParcaAngry from "@public/sticker/parca-angry.png"
import ParcaSad from "@public/sticker/parca-angry.png"
import ParcaLove from "@public/sticker/parca-love.png"
import ParcaFull from "@public/sticker/parca-full.png"
import ParcaPeace from "@public/sticker/parca-peace.png"
import ParcaInLove from "@public/sticker/parca-in-love.png"


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

export const stickers = [
  { id: 1, image: KaisaAngry },
  { id: 2, image: KaisaSad },
  { id: 3, image: KaisaF },
  { id: 4, image: KaisaLove },
  { id: 5, image: ParcaHappy },
  { id: 6, image: ParcaAngry },
  { id: 7, image: ParcaSad },
  { id: 8, image: ParcaLove },
  { id: 9, image: ParcaFull },
  { id: 10, image: ParcaPeace },
  { id: 11, image: ParcaInLove }
];
