import { MemeImageType } from "@Types";

/**
 * Obtiene un conjunto de memes desde la API de Imgflip.
 * @param start - Índice de inicio para obtener memes.
 * @param end - Índice final para obtener memes.
 * @returns Una promesa que se resuelve en un array de objetos MemeImageType.
 */
export const getMemeImages = async (
  start: number,
  end: number,
): Promise<MemeImageType[]> => {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    const memes: MemeImageType[] = data.data.memes;
    const totalMemes = memes.length;
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (totalMemes >= end) {
      return memes.slice(start, end);
    }
    return [];
  } catch (error) {
    console.error("Error al obtener memes:", error);
    return [];
  }
};

/**
 * Obtiene un meme específico por su ID desde la API de Imgflip.
 * @param id - ID del meme que se desea obtener.
 * @returns Una promesa que se resuelve en un objeto MemeImageType o undefined si no se encuentra.
 */
export const getMemeImageById = async (
  id: string
): Promise<MemeImageType | undefined> => {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    const meme = data.data.memes.find(
      (item: MemeImageType) => item.id === id
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    return meme;
  } catch (error) {
    console.error("Error al obtener meme:", error);
    return undefined;
  }
};
