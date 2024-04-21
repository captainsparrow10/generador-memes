import { useState } from 'react';
import { v4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { MemeImageType } from '@Types';
import { useCanvaContext } from '@Contexts/Canva';

const useImageHandler = () => {
  const { setImageSelected, setShowModal } = useCanvaContext(); 

  const router = useRouter();
  const [inputUrl, setInputUrl] = useState<MemeImageType | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [errorDropImage, setErrorDropImage] = useState(false);

  // Función para insertar la URL de la imagen
  /**
   * Inserta la URL de la imagen seleccionada y navega a la página de la imagen.
   */
  const handleInsertUrl = () => {
    if (!inputUrl) return;

    if (!isImage(inputUrl.url, ['.jpg', '.jpeg', '.png'])) {
      setError(true);
      return;
    }

    setError(false);

    setImageSelected(inputUrl);
    setShowModal(false);
    router.push('/' + inputUrl.id);
  };

  // Función para manejar el cambio en el input de URL
  /**
   * Maneja el cambio en el input de URL y actualiza el estado de la URL.
   * @param e - Evento de cambio en el input.
   */
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setError(false);
    }

    const meme: MemeImageType = {
      id: v4(),
      name: 'example',
      url: e.target.value,
    };
    setInputUrl(meme);
  };

  // Función para verificar si la URL es una imagen
  /**
   * Verifica si la URL es una imagen basándose en sus extensiones.
   * @param url - URL de la imagen a verificar.
   * @param extensions - Extensiones permitidas para las imágenes.
   * @returns True si la URL es una imagen; de lo contrario, False.
   */
  const isImage = (url: string, extensions: string[]) => {
    return extensions.some((ext) => url.endsWith(ext));
  };

  // Función para mostrar y procesar el archivo de imagen
  /**
   * Muestra y procesa el archivo de imagen para su visualización y navegación.
   * @param file - Archivo de imagen a procesar.
   */
  const displayFile = (file: any) => {
    if (!isImage(file.type, ['png', 'jpeg', 'jpg'])) {
      setErrorDropImage(true);
      return;
    }

    setErrorDropImage(false);

    const meme = {
      id: v4(),
      name: file.name,
      url: URL.createObjectURL(file),
    };
    setImageSelected(meme);
    setShowModal(false);
    router.push('/' + meme.id, { scroll: false });
  };

  // Función para cargar una imagen desde la selección de archivo
  /**
   * Carga una imagen desde la selección de archivo del usuario.
   * @param e - Evento de cambio al seleccionar un archivo.
   */
  const loadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    displayFile(file);
  };

  // Función para cargar una imagen desde la acción de arrastrar y soltar
  /**
   * Carga una imagen desde la acción de arrastrar y soltar un archivo.
   * @param e - Evento de arrastrar y soltar.
   */
  const loadImageDrop = (e: any) => {
    const file = e.dataTransfer.files[0];
    if (!file) return;
    displayFile(file);
  };

  return { inputUrl, error, handleOnChange, handleInsertUrl, errorDropImage, loadImage, setErrorDropImage, loadImageDrop };
};

export default useImageHandler;
