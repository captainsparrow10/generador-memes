import { StickerType, memeImageType } from "@Types";

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


export const getMemeImages = async (
  start: number,
  end: number,
): Promise<memeImageType[] | undefined> => {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    const memes: memeImageType[] = data.data.memes;
    const totalMemes = memes.length;
    await new Promise(resolve => setTimeout(resolve, 500));
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
    await new Promise(resolve => setTimeout(resolve, 500));
    return meme;
  } catch (error) {
    console.error('Error al obtener meme:', error);

  }
};

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
